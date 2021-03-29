import {rest} from 'msw'

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
			const requiredFields = ['username', 'password']

			const missingDataField = requiredFields.find(field => !req.body[field])
			if (missingDataField) {
				return res(
					ctx.status(400),

					ctx.json({message: `${missingDataField} is required`}),
				)
			}

			return res(ctx.json({username: req.body.username}))
		},
	),
]
