import * as React from 'react'
import {shallow} from 'enzyme'
import Counter from '../components/Counter'

describe('App', () => {
    it('counter increments and decrements when the buttons are clicked', () => {
        const container = shallow(<Counter />)

        // ⚠️️️⚠️️️⚠️️️ This will break if we change the order of the buttons in the component
        const increment = container.find('button').at(1)
        const decrement = container.find('button').at(2)

        // ⚠️️️⚠️️️⚠️️️ This will break if we add an additional div in prior to
        // the div that we want to find in the block
        // Otherwise, we need to assign to it a identifier, for example a class
        const message = container.find('div').at(2)

        expect(message.text().includes('Current count: 0')).toBe(true)
        increment.simulate('click')

        // 🥴🥴🥴 Is this need to be that hard?
        container.update()
        expect(container.find('div').at(2).text().includes('Current count: 1')).toBe(true)

        // 🤨🤨🤨 I am tired of manually updating
        decrement.simulate('click')
        container.update()
        expect(container.find('div').at(2).text().includes('Current count: 0')).toBe(true)
    })
})