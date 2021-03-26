import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

test('submitting the form calls onSubmit with username and password', () => {
    const handleSubmitFn = jest.fn()
    render(<Login onSubmit={handleSubmitFn} />)

    const usernameField = screen.getByLabelText(/username/i)
    const passwordField = screen.getByLabelText(/password/i)
    const button = screen.getByRole('button', {name: /submit/i})

    userEvent.type(usernameField, 'foo')
    userEvent.type(passwordField, 'bar')
    userEvent.click(button)

    expect(handleSubmitFn).toHaveBeenCalledWith({username: 'foo', password: 'bar'})
    expect(handleSubmitFn).toHaveBeenCalledTimes(1)
})