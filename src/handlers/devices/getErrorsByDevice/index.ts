import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { errorResponse, response } from '../../../shared/responses'
import { getErrorsByDevice } from '../../../controllers/devices'

const main: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    if (!event?.pathParameters?.id) {
      return errorResponse('Invalid payload', 400)
    }
    const deviceId = event.pathParameters.id

    const items = await getErrorsByDevice({ deviceId })

    return response({ device: items }, 200)
  } catch (error) {
    return errorResponse((error as Error).message)
  }
}

export const handler = main
