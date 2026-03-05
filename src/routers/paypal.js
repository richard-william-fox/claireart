//const path = require('path')
//import path from path
//const express = require('express')
import express from 'express'
//const hbs = require('hbs')
//import hbs from hbs
//const http = require('http')
//import http from http
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk"
//const paypal = require('@paypal/paypal-server-sdk')

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
    const collect = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: "USD",
                        value: "100.00",
                    },
                },
            ],
        },
        prefer: "return=minimal",
    }

    try {
        const { body, ...httpResponse } = await ordersController.createOrder(
            collect
        )
        // Get more response info...
        // const {statusCode, ehaders } = httpResponse;
        return {
            jsonResponse: JSON.parse(body),
            httpStatusCode: httpResponse.statusCode,
        }
    } catch (error) {
        console.log('rferror:')
        console.log(error)
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error
            throw new Error(error.message)
        }
    }
}

router.post('/api/orders', async (req, res) => {
    try {
        // use the cart information passed from the front-end to calculate the order amound details
        const { tote } = req.body
        const { jsonResponse, httpStatusCode } = await createOrder(tote)
        res.status(httpStatusCode).json(jsonResponse)
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

/**
 * Authorize payment for the created order to coplete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_authorize
 */
/*const authorizeOrder = async (orderID) => {
    const collect = {
        id: orderID,
        prefer: 'return=minimal',
    }

    try {
        const { body, ...httpResponse } = await ordersController.authorizeOrder(collect)
        // Get more response info...
        // const { statusCode, headers } = httpResponse
        return {
            jsonResponse: JSON.parse(body),
            httpStatusCode: httpResponse.statusCode,
        }
    } catch (error) {
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error;
            throw new Error(error.message)
        }
    }
}

// authorizeOrder route
router.post('/api/orders/:orderID/authorize', async (req, res) => {
    try {
        const { orderID } = req.params
        const { jsonResponse, httpStatusCode } = await authorizeOrder(orderID)
        res.status(httpStatusCode).json(jsonResponse)
    } catch (error) {
        console.error('Failed to create order:', error)
        res.status(500).json({ error: 'Failed to authorize order.' })
    }
})*/

/*
 *Captures an authorized payment, by ID.
 * @see https://developer.paypal.com/docs/api/payments/v2/#authorizations_capture
 * */
/*const captureAuthorize = async (authorizationId) => {
    const collect = {
        authorizationId: authorizationId,
        prefer: 'return=minimal',
        body: {
            finalCapture: false,
        }
    }

    try {
        const { body, ...httpResponse } = 
            await paymentsController.captureAuthorize(collect)
        // Get more response info...
        // const {statusCode, headers } = httpResponse
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

//captureAuthorize route
router.post('/orders/:authorizationId/captureAuthorize', async (req, res) => {
    try {
        const { authorizationId } = req.params
        const { jsonResponse, httpStatusCode } = await captureAuthorize(authorizationId)
        res.status(httpStatusCode).json(jsonResponse)
    } catch (error) {
        console.error('Failed to create order:', error)
        res.status(500).json({ error: 'Failed to capture authorize.' })
    }
})*/

export default router
