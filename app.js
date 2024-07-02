const cartBtn = document.querySelector(".cart-btn");
const cartModel = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModel = document.querySelector(".cart-item-confirm");

const productsDOM = document.querySelector(".products-center"); // Corrected selector

import { productsData } from "./products.js";

// 1. get products
class Products {
    // Get from API and point!
    getProducts() {
        return productsData;
    }
}

// 2. display products
class UI {
    displayProducts(products) {
        let result = "";
        products.forEach((product) => {
            result += `<div class="product">
                <div class="img-container">
                    <img src="${product.imageUrl}" class="product-img" />
                </div>
                <div class="product-desc">
                    <p class="product-price">$ ${product.price}</p>
                    <p class="product-title">${product.title}</p>
                </div>
                <button class="btn add-to-cart" data-id="${product.id}">
                    add to cart
                </button>
            </div>`;
        });
        if (productsDOM) { // Ensure productsDOM is not null
            productsDOM.innerHTML = result;
        } else {
            console.error('Element with class "products-center" not found in the DOM.');
        }
    }
}

// 3. storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const products = new Products();
    const productsData = products.getProducts();
    const ui = new UI();
    ui.displayProducts(productsData);
    Storage.saveProducts(productsData);
});

// Cart items model
function showModelFunction() {
    backDrop.style.display = "block";
    cartModel.style.display = "block"; 
}

function closeModelFunction() {
    backDrop.style.display = "none";
    cartModel.style.display = "none"; 
}

cartBtn.addEventListener("click", showModelFunction);
closeModel.addEventListener("click", closeModelFunction);
backDrop.addEventListener("click", closeModelFunction);
