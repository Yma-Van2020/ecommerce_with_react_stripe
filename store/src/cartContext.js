import {createContext, useState} from "react";
import { productsArray, getProductData } from "./ProductsStore";

export const cartContext = createContext({
  items:[],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {}
});

export function CartProvider({children}){
  const [cartProducts, setCartProducts] = useState([])

  function getProductQuantity(id) {
    const product = cartProducts.find((product) => product.id === id);

    if (product === undefined) return 0;
    return product.quantity;
  }
  
  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) { // product is not in cart
        setCartProducts(
            [
                ...cartProducts,
                {
                    id: id,
                    quantity: 1
                }
            ]
        )
    } else { // product is in cart
        // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
        setCartProducts(
            cartProducts.map(
                product =>
                product.id === id                                // if condition
                ? { ...product, quantity: product.quantity + 1 } // if statement is true
                : product                                        // if statement is false
            )
        )
    }
}

  function deleteFromCart(id){
    setCartProducts(
      cartProducts => cartProducts.filter(product => product.id !== id)
    )
  }

  function removeOneFromCart(id){
    const quantity = getProductQuantity(id);

    if(quantity == 1){
      deleteFromCart(id);
    }
    else {
      setCartProducts(
        cartProducts.map(
          product => product.id == id? {...product, quantity:product.quantity - 1}:product
        )
      )
    }
  }

  function getTotalCost(){
    let totalCost = 0;
    cartProducts.map(product => {
      let productData = getProductData(product.id);
      totalCost += (productData.price * product.quantity);
    })
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
  }

  return(
    <cartContext.Provider value={contextValue}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider;