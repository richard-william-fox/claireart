import express from 'express'
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk"

const router = express.Router()

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: {
          logBody: true,
        },
        logResponse: {
          logHeaders: true,
        },
    },
})

const ordersController = new OrdersController(client)

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (tote) => {
    let purchaseUnits = []
    tote.forEach((product) => {
        let item = {}
        item["referenceId"] = product.id
        item["amount"] = {
            'currencyCode': 'USD',
            'value': product.price.toString(),
        }
        purchaseUnits.push(item)
    })
    const collect = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: purchaseUnits
        },
        prefer: "return=minimal",
    }

    try {
        const response = await ordersController.createOrder(
            collect
        )
        // Get more response info...
        // const {statusCode, ehaders } = httpResponse;
        return {
            jsonResponse: JSON.parse(response.body),
            httpStatusCode: response.statusCode,
        }
    } catch (error) {
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error
            throw new Error(error.message)
        }
    }
}

router.post('/api/orders', async (req, res) => {
    try {
        // use the cart information passed from the front-end to calculate the order amound details
        const tote = req.body.cart
        const response = await createOrder(tote)
        res.status(response.httpStatusCode).json(response.jsonResponse)
    } catch (error) {
        console.error('Failed to create order:', error)
        res.status(500).json({ error: 'Failed to create order.' })
    }
})

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
    const collect = {
        id: orderID,
        prefer: 'return=minimal',
    }

    try {
        const { body, ...httpResponse } = await ordersController.captureOrder(
            collect
        )
        // Get more response info...
        // const { statusCode, headers } = httpResponse
        return {
            jsonResponse: JSON.parse(body),
            httpStatusCode: httpResponse.statusCode,
        }
    } catch (error) {
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error
            throw new Error(error.message)
        }
    }
}

router.post('/api/orders/:orderID/capture', async (req, res) => {
    try {
        const { orderID } = req.params
        const {jsonResponse, httpStatusCode } = await captureOrder(orderID)
        res.status(httpStatusCode).json(jsonResponse)
    } catch (error) {
        console.error('Failed to create order:', error)
        res.status(500).json({ error: 'Failed to capture order,' })
    }
})

export default router
