import './PageCheckout.css'
import axios from 'axios'
import { useLocation } from 'react-router'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { removeToteItem, decrementCount, emptyTote } from '../../Tote/ToteSlice'

const PageCheckout = () => {
    const location = useLocation()
    const localDispatch = useDispatch()
    const shippingInfo = location.state
    const [items, setItems] = useState(useSelector((state) => state.tote.items))
    const [resultMessage, setResultMessage] = useState('')
    let total = 0
    let shipping
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    const removeLocalItem = (item) => {
        return items.filter((itm) => {
            return itm._id != item._id
        })
    }

    const onCreateOrder = (data, actions) => {
        let purchaseUnits = []
        let items = []
        let value
        items.forEach((product) => {
            value = Number(product.price)
            let item = {}
            item['reference_id'] = product._id
            item['amount'] = {
                currencyCode: 'USD',
                value: value.toString(),
            }
            item['shipping'] = {
                name: {
                    fullName: shippingInfo.name,
                },
            }
            items.push(item)
        })

        purchaseUnits.push({
            amount: {
                currency_code: 'USD',
                value: (
                    total +
                    (Number(shippingInfo.shipping) + Number(total) * 0.05 + 0.3)
                ).toString(),
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: total,
                    },
                    shipping: {
                        currency_code: 'USD',
                        value:
                            Number(shippingInfo.shipping) +
                            Number(total) * 0.05 +
                            0.3,
                    },
                },
            },
            items: items,
            shipping: {
                address: {
                    address_line_1: shippingInfo.street1,
                    address_line_2: shippingInfo.street2,
                    admin_area_1: shippingInfo.state,
                    admin_area_2: shippingInfo.city,
                    postal_code: shippingInfo.zip,
                    country_code: shippingInfo.country,
                },
            },
        })

        const order = actions.order.create({
            purchase_units: purchaseUnits,
            application_context: {
                brand_name: 'Claire Fox Creations',
                locale: 'us-US',
                shipping_preference: 'SET_PROVIDED_ADDRESS',
            },
            purchaseUnits: purchaseUnits,
        })

        if (order.error) {
            setResultMessage(order.error)

            throw new Error(order.error)
        }

        return order
    }

    const onApproveOrder = async (data, actions) => {
        const capture = await actions.order.capture()
        const newOrder = await axios.post(
            '/newOrder',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: data,
                purchase_units: items,
            },
        )

        if (newOrder.status == 201) {
            //Order success, empty tote.
            const res = await axios.post(
                'sendOrderEmail/true',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    capture,
                },
            )
        } else {
            //Some sort of error
            internalError =
                'Despite the error, payment has been processed. Do not attempt to purchase again. We will be in contact to alleviate the issue.'
            const picError = await axios.post(
                '/images/error',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: capture,
                },
            )
            const res = await axios.post(
                '/sendOrderEmail/false',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                },
            )

            //return capture
        }

        setItems([])
        localDispatch(emptyTote())
        setResultMessage(
            'Purchase complete. Please check your email for shipping information.',
        )
    }

    const updateTotal = (price) => {
        total += price
        shipping = Number(shippingInfo.shipping) + Number(total) * 0.05 + 0.3
    }

    return (
        <section>
            <div id="previewContent" className="bg-gray-950">
                <div id="toteContents">
                    {items.map((item) => {
                        updateTotal(item.price)
                        return (
                            <div id={'item_' + item._id} key={item.thumbnail}>
                                <div id={'img_' + item._id} key={item._id}>
                                    <img
                                        id={'pic_' + item._id}
                                        src={item.thumbnail}
                                    />
                                </div>
                                <div
                                    className={'imgP_' + item._id}
                                    key={item.name}
                                >
                                    <p className="cfText">
                                        {'Name: ' + item.name}
                                    </p>
                                    <p className="cfText">
                                        {'Width: ' + item.width + "''"}
                                    </p>
                                    <p className="cfText">
                                        {'Height: ' + item.height + "''"}
                                    </p>
                                    <p className="cfText">
                                        {'Price: $' + item.price + ' USD'}
                                    </p>
                                </div>
                                <p className="removeLink" key={item.path}>
                                    <a
                                        id={'remove_' + item._id}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            localDispatch(decrementCount())
                                            localDispatch(
                                                removeToteItem(item._id),
                                            )
                                            updateTotal(item.price * -1)
                                            const newTote =
                                                removeLocalItem(item)
                                            setItems(newTote)
                                        }}
                                        href=""
                                    >
                                        Remove Item
                                    </a>
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div id="toteTotal">
                    <p id="itemsTotal" className="cfText">
                        {'Tote Total: ' + total}
                    </p>
                    <p id="shippingTotal" className="cfText">
                        {'Shipping Total: ' + Number(shipping)}
                    </p>
                    <p id="grandTotal" className="cfText">
                        {'Grand Total: ' + (Number(total) + Number(shipping))}
                    </p>
                </div>
            </div>

            <div id="paypalContainer">
                <PayPalButtons
                    style={{ layout: 'vertical' }}
                    createOrder={(data, actions) =>
                        onCreateOrder(data, actions)
                    }
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                />
            </div>

            <p id="result-message" className="ppText">
                {resultMessage}
            </p>
            <p id="errorStatus" className="errorText"></p>
        </section>
    )
}

export default PageCheckout
