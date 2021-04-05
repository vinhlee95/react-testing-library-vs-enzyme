import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from './useCounter'

// Simple Counter component using the useCounter hook
const Counter = () => {
  const {count, increment, decrement} = useCounter()
  return (
    <>
      <div>Current count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
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
