const cartBtn = document.querySelector(".cart-btn");
const cartModel = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModel = document.querySelector(".cart-item-confirm");


const productsDOM = document.querySelector(".products-center"); 

import { productsData } from "./products.js";


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
}

//3. storage 
class Straoge{
  static saveProducts(products){
    localStorage.setItem('products', JSON.stringify(products)); 
  }
}
  


  document.addEventListener("DOMContentLoaded", () => {
    const products = new Products(); 
    const productsData = products.getProducts(); 
    const ui = new UI(); 
    ui.displayProducts(productsData); 

    Storage.saveProducts(productsData); 
    //console.log(productsData); 
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
