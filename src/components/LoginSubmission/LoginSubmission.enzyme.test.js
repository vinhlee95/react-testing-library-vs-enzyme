import * as React from 'react'
import {mount} from 'enzyme'
import {build, fake} from '@jackfranklin/test-data-bot'

import LoginSubmission from './LoginSubmission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const runAllPromises = () => new Promise(setImmediate)

describe('LoginSubmission', () => {
  it('display the username after logging in', async () => {
    const container = mount(<LoginSubmission />)

    const loginField = container.find('#username-field')
    const passwordField = container.find('#password-field')
    const button = container.find('.submit-button')

    const {username, password} = buildLoginForm()
    loginField.simulate('change', {target: {name: 'username', value: username}})
    passwordField.simulate('change', {
      target: {name: 'password', value: password},
    })

    const event = {
      preventDefault: () => {},
      target: {
        elements: {
          username: {
            value: username,
          },
          password: {
            value: password,
          },
        },
      },
    }

    button.simulate('submit', event)
    expect(container.find('.spinner')).toHaveLength(1)

    // This does not work 🤦🏻‍🤦🏻‍🤦🏻‍
    // https://www.benmvp.com/blog/asynchronous-testing-with-enzyme-react-jest/
    // setImmediate(() => {
    //   container.update()
    //   expect(container.find('.spinner')).toHaveLength(0)
    //   done()
    // })

    // This does not work either 🤷🏻🤷🏻🤷🏻‍
    await runAllPromises()
    container.update()
    expect(container.find('.spinner')).toHaveLength(0)
  })
})