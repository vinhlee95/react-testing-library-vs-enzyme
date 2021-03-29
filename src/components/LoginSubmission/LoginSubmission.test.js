import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'

import Login from './LoginSubmission'

const buildLoginForm = build({
	fields: {
		username: fake(f => f.internet.userName()),
		password: fake(f => f.internet.password()),
	},
})

test("logging in displays the user's username", async () => {
	render(<Login />)
	const {username, password} = buildLoginForm()

	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))

	await waitForElementToBeRemoved(screen.getByLabelText(/loading/i))
	expect(screen.getByText(username)).toBeInTheDocument()
})

/**
 * Following tests using .toMatchInlineSnapshot()
 * for the benefits of having snapshot values right in the test
 * https://jestjs.io/docs/snapshot-testing#inline-snapshots
 *
 */
describe('logging in without username or password should fail', () => {
	const formData = buildLoginForm()

	it('should fail without username', async () => {
		render(<Login />)
		userEvent.type(screen.getByLabelText(/password/i), formData.password)
		userEvent.click(screen.getByRole('button', {name: /submit/i}))
		await waitForElementToBeRemoved(screen.getByLabelText(/loading/i))
		expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
		<div
		  role="alert"
		  style="color: red;"
		>
		  username is required
		</div>
	`)
	})

	it('should fail without password', async () => {
		render(<Login />)
		userEvent.type(screen.getByLabelText(/username/i), formData.username)
		userEvent.click(screen.getByRole('button', {name: /submit/i}))
		await waitForElementToBeRemoved(screen.getByLabelText(/loading/i))
		expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
		<div
		  role="alert"
		  style="color: red;"
		>
		  password is required
		</div>
	`)
	})
})
