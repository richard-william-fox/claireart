import { useSelector, useDispatch } from 'react-redux'
import { removeToteItem, decrementCount } from '../../Tote/ToteSlice'
import { states, countries } from './locationData'
import './PageTote.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const PageTote = () => {
    const [items, setItems] = useState(useSelector((state) => state.tote.items))
    const [shippingData, setShippingData] = useState({})
    const [shippoData, setShippoData] = useState(0)
    const [checkShipping, setCheckShipping] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removeLocalItem = (item) => {
        return items.filter((itm) => {
            return itm._id != item._id
        })
    }

    const fetchShippoData = async () => {
        let parcels = []
        items.forEach((item) => {
            const parcel = {
                length: item.width.toString(),
                width: item.height.toString(),
                height: '1',
                distanceUnit: 'in',
                weight: item.weight.toString(),
                massUnit: item.weight_unit,
            }
            parcels.push(parcel)
        })

        let shippoUrl = '/shippo'
        let resp = await axios.post(shippoUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            addressTo: shippingData,
            parcels: parcels,
        })

        shippingData.shipping = resp.data.shipping

        navigate('/checkout', { state: shippingData })
    }

    if (!shippingData) return false

    return (
        <div id="totePage" className="pageFlex">
            <div id="previewContent" className="bg-gray-950">
                <div id="toteContents">
                    {items.map((item) => {
                        return (
                            <div id="itemContainer" key={item.thumbnail}>
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
                                            dispatch(decrementCount())
                                            dispatch(removeToteItem(item._id))
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
                    <p id="itemsTotal" className="cfText"></p>
                </div>
                <div id="shippingAddress">
                    <p className="cfText">Shipping Address</p>
                    <label htmlFor="name" className="cfText">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(event) => {
                            shippingData.name = event.target.value
                            setShippingData(shippingData)
                        }}
                    />
                    <label htmlFor="street" className="cfText">
                        Street:
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        onChange={(event) => {
                            shippingData.street = event.target.value
                            setShippingData(shippingData)
                        }}
                    />
                    <label htmlFor="street2" className="cfText">
                        Street2:
                    </label>
                    <input
                        type="text"
                        id="street2"
                        name="street2"
                        onChange={(event) => {
                            shippingData.street2 = event.target.value
                            setShippingData(shippingData)
                        }}
                    />
                    <label htmlFor="city" className="cfText">
                        City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        onChange={(event) => {
                            shippingData.city = event.target.value
                            setShippingData(shippingData)
                        }}
                    />
                    <label htmlFor="state" className="cfText">
                        State:
                    </label>
                    <select
                        id="state"
                        onChange={(event) => {
                            shippingData.state = event.target.value
                            setShippingData(shippingData)
                        }}
                    >
                        <option>select state</option>
                        {states.map((state) => {
                            return (
                                <option
                                    value={state.abbreviation}
                                    key={state.abbreviation}
                                >
                                    {state.name}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="zip" className="cfText">
                        Postal Code:
                    </label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        onChange={(event) => {
                            shippingData.zip = event.target.value
                            setShippingData(shippingData)
                        }}
                    />
                    <label htmlFor="country" className="cfText">
                        Country:
                    </label>
                    <select
                        id="country"
                        onChange={(event) => {
                            shippingData.country = event.target.value
                            setShippingData(shippingData)
                        }}
                    >
                        <option>select country</option>
                        {countries.map((country) => {
                            return (
                                <option
                                    value={country.abbreviation}
                                    key={country.abbreviation}
                                >
                                    {country.name}
                                </option>
                            )
                        })}
                    </select>
                    <button
                        id="checkAddress"
                        className="cfText bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={fetchShippoData}
                        // onClick={(event) => {
                        //     // event.preventDefault()
                        //     // setCheckShipping(true)
                        // }}
                    >
                        Validate Address and Check Out
                    </button>
                </div>
            </div>
        </div>
    )
}
export default PageTote
