import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { updateDevice } from '../../../controllers/devices'
import { getDeviceBodyFromEvent } from '../../../shared/parser'
import { errorResponse, response } from '../../../shared/responses'

const main: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    if (!event?.pathParameters?.id) {
      return errorResponse('Invalid payload', 400)
    }
    const deviceId = event.pathParameters.id

    const body = getDeviceBodyFromEvent(event)

    if (!body) {
      return errorResponse('Invalid payload', 400)
    }

    await updateDevice({
      DeviceId: deviceId,
      DeviceLocation: body.DeviceLocation,
      DeviceName: body.DeviceName,
    })

    return response({ message: 'Device Updated Successfully!' }, 201)
  } catch (error) {
    return errorResponse((error as Error).message)
  }
}

export const handler = main
