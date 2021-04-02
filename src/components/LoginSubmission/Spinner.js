import * as React from 'react'

function Spinner() {
	return (
		<div className="lds-ripple spinner" aria-label="loading...">
			<div />
			<div />
		</div>
	)
}

export default Spinner
