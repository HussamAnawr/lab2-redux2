import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'

export const fetchCartData = () => {
  return async (dispatcher) => {
    const fetchRequest = async () => {
      const response = await fetch(
        'https://usehttp-demo-default-rtdb.firebaseio.com/cart.json',
      )

      if (!response.ok) {
        throw new Error('Fetching cart data failed.')
      }
      const data = await response.json()
      return data
    }

    try {
      const cartData = await fetchRequest()
      dispatcher(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
