import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      state.totalQuantity++
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
    },
    removeItem(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => id === item.id)
      state.totalQuantity--
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => id !== item.id)
      } else {
        existingItem.totalPrice -= existingItem.price
        existingItem.quantity--
      }
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
