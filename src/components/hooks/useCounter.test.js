import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from './useCounter'

//
// 1️⃣ solution: test the hook by testing the component consuming it
//

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

// Test the component that consume useCounter hook
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

//
// -----------------------------
//

//
// 2️⃣ solution: test the inner hook logic
//

/**
 * Setup function that bind useCounter to a fake component
 * This way, when we test the logic inside the hook, the state inside the hook also get updated
 *
 * @param options
 * @returns "reference" to the hook logic
 */
function setup({...options} = {}) {
  const result = {}
  const TestComponent = () => {
    // Update the result variable in-place so that its reference (hookData variable in this case)
    // could access updated state when it changed
    // since the reference still point to the same object
    result.current = useCounter({initialCount: 0, step: 1, ...options})
    return null
  }
  render(<TestComponent />)
  return result
}

test('useCounter hook allow to update the counter', () => {
  const hookData = setup()
  // Assert initial state
  expect(hookData.current.count).toEqual(0)

  act(() => {
    hookData.current.increment()
  })
  expect(hookData.current.count).toEqual(1)
})

test('useCounter hook allow customization of the initial count and step', () => {
  const hookData = setup({initialCount: 2, step: 2})
  // Assert initial state
  expect(hookData.current.count).toEqual(2)
  act(() => {
    hookData.current.increment()
  })
  expect(hookData.current.count).toEqual(4)
})