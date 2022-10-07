import { createSlice } from '@reduxjs/toolkit'

const Plantslice = createSlice({
  name: 'plant',
  initialState: {
    plants: [],
    plant: {},
    loading: false,
    error: false,
  },
  reducers: {
    loading: (state) => {
      state.loading = true
    },
    getAllPlants: (state, action) => {
      state.loading = false
      state.error = false
      state.plants = action.payload
    },
    error: (state) => {
      state.loading = false
      state.error = true
    },
    getPlant: (state, action) => {
      state.loading = false
      state.error = false
      state.plant = action.payload
    },
    resetPlant: (state) => {
      state.loading = false
      state.error = false
      state.plant = {}
    },
    resetFlags: (state) => {
      state.loading = false
      state.error = false
    },
  },
})

export default Plantslice.reducer
export const {
  loading,
  getAllPlants,
  error,
  getPlant,
  resetPlant,
  resetFlags,
} = Plantslice.actions
