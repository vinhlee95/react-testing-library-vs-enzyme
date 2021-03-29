import * as React from 'react'

function Counter() {
	const [count, setCount] = React.useState(0)
	const increment = () => setCount(c => c + 1)
	const decrement = () => setCount(c => c - 1)
	const reset = () => setCount(0)

	return (
		<div>
			<div>
				<h1>My beautiful counter</h1>
			</div>
			<div>Current count: {count}</div>
			<button onClick={reset}>Reset</button>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	)
}

export default Counter
