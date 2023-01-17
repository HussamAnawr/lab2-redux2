import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { useSelector, useDispatch } from 'react-redux'
import { sendCartData } from './store/cart-slice'
import { useEffect, Fragment } from 'react'
import Notification from './components/UI/Notification'

let isInit = true
function App() {
  const cart = useSelector((state) => state.cart)
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const notification = useSelector((state) => state.ui.notification)
  const dispatcher = useDispatch()

  useEffect(() => {
    if (isInit) {
      isInit = false
      return
    }
    dispatcher(sendCartData(cart))
  }, [cart, dispatcher])

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  )
}

export default App
