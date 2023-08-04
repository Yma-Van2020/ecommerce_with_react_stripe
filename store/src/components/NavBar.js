import {Button, Container, Navbar, Modal} from 'react-bootstrap';
import { useState, useContext } from 'react';
import { cartContext } from '../cartContext';
import CartProduct from './CartProduct'

const NavBar = () => {
  const cart = useContext(cartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)
  
  const handleCheckout = async() => {
    await fetch('http://localhost:4000/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({items:cart.items})
    }).then((response) => {
      return response.json()
    }).then((response) => {
      if(response.url){
        //forward users to the stripe payment
        window.location.assign(response.url)
      }
    })
  }

  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href="/">Ecommerce store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart {productCount} Items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            productCount > 0?
            <>
              <p>Items in your cart:</p>
              {
                cart.items.map((currentProduct, idx)=>(
                  <CartProduct id={currentProduct.id} key={idx} quantity={currentProduct.quantity}/>
                ))
              }
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={handleCheckout}>Purchase Items</Button>
            </>:
            <h1>There are no items in your cart!</h1>
          }
        </Modal.Body>
      </Modal>
    </>
  )
}
export default NavBar;