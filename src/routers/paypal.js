import express from 'express'
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from '@paypal/paypal-server-sdk'
import { Shippo } from 'shippo'

const router = express.Router()
const shippo = new Shippo({
    apiKeyHeader: process.env.SHIPPO_API_KEY,
    debugLogger: console
})

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET,
    },
    timeout: 0,
    environment: Environment.Production,
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
const createOrder = async (tote, shippingInfo) => {
    let purchaseUnits = []
    let value
    tote.forEach((product) => {
        value = (Number(product.price) + Number(shippingInfo.shipping))
        let item = {}
        item['referenceId'] = product.id
        item['amount'] = {
            currencyCode: 'USD',
            value: value.toString(),
        }
        item['shipping'] = {
            name: {
                fullName: shippingInfo.name
            },
            address: {
                addressLine1: shippingInfo.street1,
                addressLine2: shippingInfo.street2,
                adminArea1: shippingInfo.state,
                adminArea2: shippingInfo.city,
                postalCode: shippingInfo.zip,
                countryCode: shippingInfo.country,
            }
        }
        purchaseUnits.push(item)
    })
    const collect = {
        body: {
            application_context: {
                'brand_name': 'Claire Fox Creations',
                'locale': 'us-US',
                'shipping_preference': 'SET_PROVIDED_ADDRESS',
            },
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
        console.error('Order error: ')
        console.error(error)
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
        const shippingInfo = req.body.shippingInfo
        const response = await createOrder(tote, shippingInfo)
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

router.post('/shippo', async (req, res) => {
    const addressTo = req.body.addressTo
    let parcels = req.body.parcels

    const shipment = await shippo.shipments.create({
        addressFrom: {
            name: process.env.FROM_NAME,
            street1: process.env.FROM_STREET,
            city: process.env.FROM_CITY,
            state: process.env.FROM_STATE,
            zip: process.env.FROM_ZIP,
            country: process.env.FROM_COUNTRY
        },
        addressTo: addressTo,
        parcels: parcels,
        async: false
    })

    let shipping
    shipment.rates.forEach((rate) => {
        if (rate.servicelevel.token == 'usps_ground_advantage') {
            shipping = rate.amount
        }
    })

    return res.status(200).send({'shipping': shipping})
})

export default router
