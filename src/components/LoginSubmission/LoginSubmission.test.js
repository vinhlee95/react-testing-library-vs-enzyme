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

test('logging in displays the user\'s username', async () => {
    render(<Login />)
    const {username, password} = buildLoginForm()

    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/password/i), password)
    userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitForElementToBeRemoved(screen.getByLabelText(/loading/i))
    expect(screen.getByText(username)).toBeInTheDocument()
})