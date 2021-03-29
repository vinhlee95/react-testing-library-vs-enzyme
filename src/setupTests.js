import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'

// Test server setup
import {setupServer} from 'msw/node'
import {handlers} from './test/server-handlers'

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
export { server }
