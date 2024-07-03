const cartBtn = document.querySelector(".cart-btn");
const cartModel = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModel = document.querySelector(".cart-item-confirm");


const productsDOM = document.querySelector(".products-center"); 
const cartTotal = document.querySelector(".cart-total"); 
const cartItems = document.querySelector(".cart-items"); 


import { productsData } from "./products.js";


let cart = []; 


//1. get products 

class Products{

  //get from api and pint
 getProducts(){
   return productsData; 
}
}
//2. display products
class UI{
  displayProducts(products){
    let result = ''; 
    products.forEach((item) => {
      result += `<div class="product">
                <div class="img-container">
                    <img src="${item.imageUrl}" class="product-img" />
                </div>
                <div class="product-desc">
                    <p class="product-price">$ ${item.price}</p>
                    <p class="product-title">${item.title}</p>
                </div>
                <button class="btn add-to-cart" data-id="${item.id}">
                    add to cart
                </button>
            </div>`;
            productsDOM.innerHTML = result; 
    });
  }

  getAddToCartBtns(){
    const addTocartBtns = document.querySelectorAll(".add-to-cart"); 
    const buttons = [...addTocartBtns]; 


    buttons.forEach(btn => {
      const id = btn.dataset.id; 

      //check if this products id is in cart or not
      const isInCart = cart.find(p => p.id == id); 
      if (isInCart){
        btn.innerText = 'in Cart'; 
        btn.ariaDisabled = true; 
      }

      btn.addEventListener('click', (event) => {
       event.target.innerText = "In cart"; 
       event.target.disabled = true; 
        //get product from products 
        const addedProduct = Storage.getProduct(id); 
        //add to cart
        console.log(addedProduct); 
        cart = [...cart, {...addedProduct, quantity: 1}]; 
        //save cart to local storage 
        Storage.saveCart(cart); 
        //update cart value
        this.setCartValue(cart); 
        //add to cart item 
        //
      }); 
    }); 
  }

  setCartValue(cart){
    //1. cart items: 
    //2. cart total price
    let tempCartItems = 0; 
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.quantity; //2 +1 => 3
      return acc + curr.quantity * curr.price; 
    }, 0); 
    cartTotal.innerText = `total price: $${totalPrice.toFixed(2)}`;
    cartItems.innerText = tempCartItems; 
    console.log(tempCartItems); 
  }
}


//3. storage 
class Storage{
  static saveProducts(products){
    localStorage.setItem('products', JSON.stringify(products)); 
  }

  static getProduct(id){
    const _products = JSON.parse(localStorage.getItem("products")); 
    return _products.find(p => p.id == parseInt(id));
  }
  static saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart)); 
  }
}
  


  document.addEventListener("DOMContentLoaded", () => {
    const products = new Products(); 
    const productsData = products.getProducts(); 
    const ui = new UI(); 
    ui.displayProducts(productsData); 
    ui.getAddToCartBtns(); 
    Storage.saveProducts(productsData); 
  }); 



// Cart items model
function showModelFunction() {
    backDrop.style.display = "block";
    cartModel.style.opacity = "1"; 
    cartModel.style.top = "20%"; 
}

function closeModelFunction() {
  backDrop.style.display = "none";
  cartModel.style.opacity = "0"; 
  cartModel.style.top = "100%"; 
}

cartBtn.addEventListener("click", showModelFunction);
closeModel.addEventListener("click", closeModelFunction);
backDrop.addEventListener("click", closeModelFunction);
