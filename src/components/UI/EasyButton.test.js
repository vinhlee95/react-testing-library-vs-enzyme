import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../theme'
import EasyButton from './EasyButton'

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
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

