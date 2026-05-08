import { createSlice } from '@reduxjs/toolkit'

const setToteItem = (item, item1) => {
    localStorage.setItem('totePics', JSON.stringify(item))
}

const getToteItems = () => {
    const tote = JSON.parse(localStorage.getItem('totePics'))

    if (!tote) {
        setToteItem([])
        return []
    } else {
        return JSON.parse(localStorage.getItem('totePics'))
    }
}

const emptyToteItems = () => {
    setToteItem([])
}

export const toteSlice = createSlice({
    name: 'tote',
    initialState: { items: getToteItems(), count: getToteItems().length },
    reducers: {
        incrementCount: (state) => {
            state.count += 1
        },
        decrementCount: (state) => {
            state.count -= 1
        },
        addToteItem: (state, item) => {
            const tote = getToteItems()
            tote.push(item.payload)
            setToteItem(tote)
            state.items.push(item.payload)
        },
        removeToteItem: (state, id) => {
            let tote = getToteItems()
            tote = tote.filter((item) => {
                return item._id != id.payload
            })
            setToteItem(tote)
            return tote
        },
        emptyTote: () => {
            emptyToteItems()
        },
    },
})

export const {
    incrementCount,
    decrementCount,
    addToteItem,
    removeToteItem,
    emptyTote,
} = toteSlice.actions

export default toteSlice.reducer
