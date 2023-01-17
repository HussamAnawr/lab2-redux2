import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    isChanged: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items
      state.totalQuantity = action.payload.totalQuantity
    },

    addItem(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      state.totalQuantity++
      state.isChanged = true
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
      state.isChanged = true
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
