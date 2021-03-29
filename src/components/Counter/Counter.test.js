import * as React from 'react'
import {screen} from '@testing-library/dom'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Counter from './Counter'

test('counter increments and decrements when the buttons are clicked', () => {
	render(<Counter />)
	const increment = screen.getByRole('button', {name: /increment/i})
	const decrement = screen.getByRole('button', {name: /decrement/i})
	const message = screen.getByText(/current count/i)

	expect(message).toHaveTextContent(/current count: 0/i)
	userEvent.click(increment)
	expect(message).toHaveTextContent(/current count: 1/i)
	userEvent.click(decrement)
	expect(message).toHaveTextContent(/current count: 0/i)
})
