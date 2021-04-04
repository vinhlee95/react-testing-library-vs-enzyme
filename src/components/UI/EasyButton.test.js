import * as React from 'react'
import { screen } from '@testing-library/react'
// We have custom moduleDirectories configuration for jest so that we could just import
// test-utils as if it is a typical node module
import {render} from 'test/test-utils'

import EasyButton from './EasyButton'

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})