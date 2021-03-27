import * as React from 'react'
import {build, fake} from '@jackfranklin/test-data-bot'
import {shallow, mount} from 'enzyme'

import Login from './Login'

const buildLoginForm = build({
    fields: {
        username: fake(f => f.internet.userName()),
        password: fake(f => f.internet.password())
    }
})

/**
 * 1️⃣ Using Shallow rendering
 * Can't make this test pass in anyway 🤨🤨🤨
 * Shallow rendering seems to have problem with click simulation on submit-typed buttons
 * https://github.com/enzymejs/enzyme/issues/308
 *
 */
describe('Login Form', () => {
    it('submitting the form calls onSubmit with username and password', () => {
        const handleSubmitFn = jest.fn()
        const container = shallow(<Login onSubmit={handleSubmitFn} />)

        const form = container.find('form')
        const loginField = container.find('#username-field')
        const passwordField = container.find('#password-field')
        const button = container.find('.submit-button')

        const {username, password} = buildLoginForm()
        loginField.simulate('change', {target: {name: 'username', value: username}})
        passwordField.simulate('change', {target: {name: 'password', value: password}})

        const event = {
            preventDefault: () => {},
            target: {
               elements: {
                   username, password
               }
            }
        }
        form.simulate('submit', event)

        expect(handleSubmitFn).toHaveBeenCalledTimes(1)
    })
})

/**
 * 2️⃣ Using "mount" for full DOM rendering
 * ⛔️ Can't make it pass either
 *
 */
describe('Login Form', () => {
    it('submitting the form calls onSubmit with username and password', () => {
        const handleSubmitFn = jest.fn()
        const container = mount(<Login onSubmit={handleSubmitFn} />)

        const button = container.find('button');
        button.simulate('click')

        expect(handleSubmitFn).toHaveBeenCalledTimes(1)
    })
})

