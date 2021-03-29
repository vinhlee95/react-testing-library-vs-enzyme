import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'

import Login from './Login'

const buildLoginForm = build({
	fields: {
		username: fake(f => f.internet.userName()),
		password: fake(f => f.internet.password()),
	},
})

test('submitting the form calls onSubmit with username and password', () => {
	const handleSubmitFn = jest.fn()
	render(<Login onSubmit={handleSubmitFn} />)

	const usernameField = screen.getByLabelText(/username/i)
	const passwordField = screen.getByLabelText(/password/i)
	const button = screen.getByRole('button', {name: /submit/i})

	const {username, password} = buildLoginForm()
	userEvent.type(usernameField, username)
	userEvent.type(passwordField, password)
	userEvent.click(button)

	expect(handleSubmitFn).toHaveBeenCalledWith({username, password})
	expect(handleSubmitFn).toHaveBeenCalledTimes(1)
})
