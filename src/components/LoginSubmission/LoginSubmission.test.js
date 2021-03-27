import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from "msw/node"

import Login from './LoginSubmission'

const buildLoginForm = build({
    fields: {
        username: fake(f => f.internet.userName()),
        password: fake(f => f.internet.password()),
    },
})

// Mock server setup
const server = setupServer(
    rest.post(
        'https://auth-provider.example.com/api/login',
        async (req, res, ctx) => {
            return res(
                ctx.json({username: req.body.username})
            )
        },
    )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('logging in displays the user\'s username', async () => {
    render(<Login />)
    const {username, password} = buildLoginForm()

    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/password/i), password)
    userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitForElementToBeRemoved(screen.getByLabelText(/loading/i))
    expect(screen.getByText(username)).toBeInTheDocument()
})
