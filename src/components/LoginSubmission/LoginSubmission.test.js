import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {server} from '../../setupTests'

import Login from './LoginSubmission'

const buildLoginForm = build({
	fields: {
		username: fake(f => f.internet.userName()),
		password: fake(f => f.internet.password()),
	},
})

test("Logging in displays the user's username", async () => {
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
describe('Logging in without username or password should fail', () => {
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

test('Login form should render proper error message if the server fails', async () => {
	// One-off server handler to test a specific scenario
	// In this case, it is when the server fails with internal server error
	// This bring 2 benefits for our tests:
	// 💰 Preserve test isolation
	// 💰 server.resetHandlers() will be called between tests (afterEach hook)
	server.use(
		rest.post(
			'https://auth-provider.example.com/api/login',
			async (req, res, ctx) => {
				return res(
					ctx.status(500),
					ctx.json({message: 'I just want to fail in this test'}),
				)
			},
		),
	)

	render(<Login />)
	const {username, password} = buildLoginForm()
	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))
	await waitForElementToBeRemoved(screen.getByLabelText(/loading/i))

	expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
		<div
		  role="alert"
		  style="color: red;"
		>
		  I just want to fail in this test
		</div>
	`)
})
