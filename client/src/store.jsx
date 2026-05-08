import { configureStore } from '@reduxjs/toolkit'
import toteSlice from './components/Tote/ToteSlice'

const store = configureStore({
    reducer: {
        tote: toteSlice,
    },
})

export default store
