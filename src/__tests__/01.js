import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../components/Counter'

test('counter increments and decrements when the buttons are clicked', () => {
    const div = document.createElement('div')
    document.body.append(div)
    ReactDOM.render(<Counter />, div)
    const [increment, decrement] = div.querySelectorAll('button')
    const messageEl = div.firstChild.querySelector('div')

    expect(messageEl.textContent).toBe('Current count: 0')

    increment.click()
    expect(messageEl.textContent).toContain('1')

    decrement.click()
    expect(messageEl.textContent).toContain('0')

    div.remove()
})

test('counter increments and decrements when the buttons are clicked using dispatchEvent', () => {
    const div = document.createElement('div')
    document.body.append(div)
    ReactDOM.render(<Counter />, div)
    const [increment, decrement] = div.querySelectorAll('button')
    const messageEl = div.firstChild.querySelector('div')
    const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        button: 0
    })

    expect(messageEl.textContent).toBe('Current count: 0')

    increment.dispatchEvent(clickEvent)
    expect(messageEl.textContent).toContain('1')

    decrement.dispatchEvent(clickEvent)
    expect(messageEl.textContent).toContain('0')

    div.remove()
})

/* eslint no-unused-vars:0 */
