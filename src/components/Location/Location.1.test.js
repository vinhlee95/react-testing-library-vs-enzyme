/**
 * This test is the same as the one in Location.test.js
 * But will trust and mock the whole 'react-use-geolocation' module
 */
import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'

import Location from './Location'

jest.mock('react-use-geolocation')

describe('Location component', () => {
  it('should display loading spinner', () => {
    const useMockCurrentPosition = () => {
      const [state] = React.useState([])
      return state
    }
    useCurrentPosition.mockImplementation(useMockCurrentPosition)

    render(<Location />)
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  })

  it('should display the users current location', () => {
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

    act(() => {
      setCurrentPosition([fakePosition, error])
    })

    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
    expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
    expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
  })

  it('should display an error', () => {
    let setCurrentPosition
    const useMockCurrentPosition = () => {
      const [initialState, setState] = React.useState([null, error])
      setCurrentPosition = setState
      return initialState
    }
    useCurrentPosition.mockImplementation(useMockCurrentPosition)

    render(<Location />)

    const error = {message: 'No permission'}
    act(() => {
      setCurrentPosition([null, error])
    })

    expect(screen.getByRole('alert')).toHaveTextContent(error.message)

    // We don't want react testing lib to throw an error if the element is not found
    // https://testing-library.com/docs/queries/about/#types-of-queries
    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/latitude/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/longitude/i)).not.toBeInTheDocument()
  })
})
