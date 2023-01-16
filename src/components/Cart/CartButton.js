import classes from './CartButton.module.css'
import { uiActions } from '../../store/ui-slice'
import { useSelector, useDispatch } from 'react-redux'

const CartButton = (props) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const dispatch = useDispatch()

  const cartToggleHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  )
}

export default CartButton
