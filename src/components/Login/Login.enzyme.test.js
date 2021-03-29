import * as React from 'react'
import {build, fake} from '@jackfranklin/test-data-bot'
import {shallow} from 'enzyme'

import Login from './Login'

const buildLoginForm = build({
	fields: {
		username: fake(f => f.internet.userName()),
		password: fake(f => f.internet.password()),
	},
})

/**
 * 🥴🥴🥴 Gotchas
 * In order to make this test to pass, we need to:
 * 1️⃣ Explicitly assign onClick prop for the submit button. Because enzyme target the component's prop
 * based on the event name ('click' in this case)
 * https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html#common-gotchas
 * 2️⃣ Mock the full onClick event to match with what the component is currently doing
 *
 * ⛔️ This mean if we change the implementation details of the component. For example storing input values
 * in the component's state, this test will fail miserably
 *
 */
describe('Login Form', () => {
	it('submitting the form calls onSubmit with username and password', () => {
		const handleSubmitFn = jest.fn()
		const container = shallow(<Login onSubmit={handleSubmitFn} />)

		const loginField = container.find('#username-field')
		const passwordField = container.find('#password-field')
		const button = container.find('.submit-button')

		const {username, password} = buildLoginForm()
		loginField.simulate('change', {target: {name: 'username', value: username}})
		passwordField.simulate('change', {
			target: {name: 'password', value: password},
		})

		// Enzyme target the component's prop based on the event inside simulate()
		// So we need to actually have a explicit onClick event handler for the button
		// e.g. <button onClick={handleSubmit} />

		// Simulate the event here to match with current implementation details of the component
		// But the fact is that users do not care about that implementation details 🤦🏻‍
		const event = {
			preventDefault: () => {},
			target: {
				elements: {
					username: {
						value: username,
					},
					password: {
						value: password,
					},
				},
			},
		}
		button.simulate('click', event)

		expect(handleSubmitFn).toHaveBeenCalledTimes(1)
		expect(handleSubmitFn).toHaveBeenCalledWith({username, password})
	})
})
