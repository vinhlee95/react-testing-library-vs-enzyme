import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../theme'
import EasyButton from './EasyButton'

test('renders with the light styles for the light theme', () => {
  render(
    <ThemeProvider>
      <EasyButton>Easy</EasyButton>
    </ThemeProvider>
  )
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  render(
    <ThemeProvider initialTheme='dark'>
      <EasyButton>Easy</EasyButton>
    </ThemeProvider>
  )
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

