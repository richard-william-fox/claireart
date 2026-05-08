import { useState } from 'react'

import './SizeSelect.css'

const SizeSelect = (props) => {
    const [value, setValue] = useState('All')

    const updateSize = (event) => {
        props.sizeChange(event.target.value)
    }

    return (
        <div>
            <p className="fancyText cfText">Filter by size:</p>
            <select
                id="picsSizeSelect"
                className="inline-block"
                onChange={updateSize}
            >
                <option
                    value="All"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    All
                </option>
                <option
                    value="10x12"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    10x12''
                </option>
                <option
                    value="10x20"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    10x20''
                </option>
                <option
                    value="11x14"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    11x14''
                </option>
                <option
                    value="12x12"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    12x12''
                </option>
                <option
                    value="12x16"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    12x16''
                </option>
                <option
                    value="12x24"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    12x24''
                </option>
                <option
                    value="14x14"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    14x14''
                </option>
                <option
                    value="14x18"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    14x18''
                </option>
                <option
                    value="16x20"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    16x20''
                </option>
                <option
                    value="18x24"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    18x24''
                </option>
                <option
                    value="20x20"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    20x20''
                </option>
                <option
                    value="22x28"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    22x28''
                </option>
                <option
                    value="6x12"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    6x12''
                </option>
                <option
                    value="8x10"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    8x10''
                </option>
                <option
                    value="8x24"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    8x24''
                </option>
                <option
                    value="9x12"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    9x12''
                </option>
                <option
                    value="Oval"
                    className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden"
                >
                    Oval
                </option>
            </select>
        </div>
    )
}
export default SizeSelect
