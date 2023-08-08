import './App.css'
import Cart from './cart/Cart'
import ProductForm from './products/ProductForm'
import ProductsList from './products/ProductsList'

function App() {

  return (
    <>
      <ProductsList/>
      <hr />
      <ProductForm/>
      <hr />
      <Cart/>
    </>
  )
}

export default App
 