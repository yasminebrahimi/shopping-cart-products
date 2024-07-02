const cartBtn = document.querySelector(".cart-btn"); 
const cartModel = document.querySelector(".cart"); 
const backDrop = document.querySelector(".backdrop"); 
const closeModel = document.querySelector(".cart-item-confirm"); 



function showModelFunction(){
    backDrop.style.display = "block"; 
    cartModel.style.display = "1"; 
    cartModel.style.display = "20%"; 
}


function closeModelFunction(){
    backDrop.style.display = "none"; 
    cartModel.style.display = "0"; 
    cartModel.style.display = "100%"; 
}


cartBtn.addEventListener("click", showModelFunction); 
closeModel.addEventListener("click", closeModelFunction); 
backDrop.addEventListener("click", closeModelFunction); 
