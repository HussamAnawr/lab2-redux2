import ProductItem from './ProductItem'
import classes from './Products.module.css'

const Products = (props) => {
  const DUMMY_PRODUCTS = [
    {
      id: 'p1',
      title: 'iphone',
      price: 299.99,
      description: 'The brand new iphone 14',
    },
    {
      id: 'p2',
      title: 'cup',
      price: 2.5,
      description: 'Coffee cup with microsoft logo: White',
    },
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
