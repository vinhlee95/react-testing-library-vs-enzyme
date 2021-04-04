/**
 * This module is our own version of React Testing Library
 * where we essentially export everything it has and override stuffs that we want to customize
 * e.g a custom render method
 */
import * as React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {ThemeProvider} from '../theme'

/**
 * Custom renderer which will override default render method of react testing library
 * and available globally in all test files
 * This custom renderer include things like global context providers, data, stores, etc.
 *
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 *
 * @param ui the UI component
 * @param theme the value of initial theme
 * @param options custom render options (https://testing-library.com/docs/react-testing-library/api/#render-options)
 * @returns {RenderResult<typeof queries, HTMLElement>}
 */
function customRender(ui, {theme = 'light', ...options} = {}) {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )

  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react'
export {customRender as render}