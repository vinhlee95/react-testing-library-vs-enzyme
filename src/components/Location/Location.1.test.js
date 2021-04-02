/**
 * This test is the same as the one in Location.test.js
 * But will trust and mock the whole 'react-use-geolocation' module
 */
import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'

import Location from './Location'

jest.mock('react-use-geolocation')

test('displays the users current location', () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 0.1,
      longitude: 0.2
    }
  }

  // State setter
  let setCurrentPosition
  const error = null
  const useMockCurrentPosition = () => {
    const [initialState, setState] = React.useState([null, error])
    setCurrentPosition = setState
    return initialState
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setCurrentPosition([fakePosition, error])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})
