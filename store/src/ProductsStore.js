
const productsArray = [
  {
    id: "price_1NbSZIIXlveTwHS4qQFICcmZ",
    title: "Coffee",
    price: 4.99
  },
  {
    id: "price_1NbSb5IXlveTwHS4ZywUb19R",
    title: "Sunglasses",
    price: 5.99
  },
  {
    id: "price_1NbSbeIXlveTwHS4Dl6Rxp0I",
    title: "Camera",
    price: 6.99
  }
];

const getProductData = (id) => {
  let productData = productsArray.find(product => product.id == id);

  if(productData == undefined){
    console.log("Product data does not exist for ID: " + id);
  }
  return productData;
}

export {productsArray, getProductData};