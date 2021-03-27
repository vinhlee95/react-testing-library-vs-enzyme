import {rest} from 'msw'
import {setupServer} from "msw/node"

/**
 * Mock server handlers
 * Following handlers will be used to create a mock server for testing
 * We could use tools such as msw for that
 *
 */
export const handlers = [
    rest.post(
        'https://auth-provider.example.com/api/login',
        async (req, res, ctx) => {
            return res(
                ctx.json({username: req.body.username})
            )
        },
    )
]