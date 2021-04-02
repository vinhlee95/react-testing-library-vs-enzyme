import * as React from 'react'
import {render, screen, act} from '@testing-library/react'

import Location from './Location'

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn()
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 0.1,
      longitude: 0.2
    }
  }

  const {promise, resolve} = deferred()

  // Mock the implementation of window.navigator.geolocation.getCurrentPosition API
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  window.navigator.geolocation.getCurrentPosition.mockImplementation(callback => {
    promise.then(() => {
      callback(fakePosition)
    })
  })

  render(<Location />)

  // 🐨 verify the loading spinner is showing up
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  resolve()
  await act(() => promise)

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})
