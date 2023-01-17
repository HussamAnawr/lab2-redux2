import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './ui-slice'

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

export const sendCartData = (cart) => {
  return async (dispatcher) => {
    dispatcher(
      uiActions.showNotification({
        status: 'pending',
        title: 'pending!',
        message: 'Sending data cart ...',
      }),
    )

    const sendRedquest = async () => {
      const response = await fetch(
        'https://usehttp-demo-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        },
      )

      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRedquest()
      dispatcher(
        uiActions.showNotification({
          status: 'success',
          title: 'success!',
          message: 'The cart data is successfully sent',
        }),
      )
    } catch (error) {
      dispatcher(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        }),
      )
    }
  }
}

export const cartActions = cartSlice.actions

export default cartSlice
