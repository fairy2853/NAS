
let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let xhr = new XMLHttpRequest();
//let url = 'https://my-json-server.typicode.com/';
let url = "https://nasdb-393c.restdb.io/rest";


xhr.open('GET',url + '/product');
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "62471b7167937c128d7c9406");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.responseType = 'json';
xhr.onload = function() {
    productsArray = xhr.response
    productsGrid.innerHTML = null;
    productsArray.forEach(p => {
        productsArray.push(p);
        let pElem = document.createElement('div');
        pElem.classList.add('product');
        pElem.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
            <p class='product-price'><b>Price: </b>${p.price}$</p>
            <p class='product-description'><b>Description: </b>${p.description}</p>
            <a href='userProfile.html?id=${p.author_id}'>Seller profile</a>
            <button onclick="addProductToCart('${p._id}')">Buy</button>
        `;
        productsGrid.append(pElem);
    });
}
xhr.send();


// CART ----------------

let cartProd = document.getElementById('cart-products');

let cart = [];
if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}


function addProductToCart(id) {
    let product = productsArray.find(function(p) {
        return p._id == id;
    })
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function(){
        document.getElementById('cart-button').classList.remove('active');
    },500);
}

function drawCartProducts() {
    if(cart.length === 0) return cartProd.innerHTML = 'Cart is empty';
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function(p){
        
        cartProd.innerHTML += `
            <p><img src="${p.photo_url}"> ${p.name} |${p.price}$</p>
            <hr>
        `;
        sum += p.price;
    });
    cartProd.innerHTML += `
        <p>Total Price: ${sum}$</p>
        <button onclick="buyAll()">Buy All</button>
    `;
}

let orderBlock = document.getElementById('order-block');
// Get the modal
let modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';

  }
}

    let contentGrid = document.getElementById('content-grid');
    let form = document.getElementById('form');

function addProductToModal(){
    let totalPrice=0;
    contentGrid.innerHTML=null;
    cart.forEach(p =>{
        let modaldiv = document.createElement('div'); 
        modaldiv.classList.add('contentProduct');
       
        modaldiv.innerHTML += `
        <img src="${p.photo_url}">
        <p> ${p.name} |${p.price}$</p> `
        totalPrice+=p.price;
        contentGrid.append(modaldiv);
        
    });
   
      
}




function buyAll() {
    modal.style.display="block";
    addProductToModal();
   

  
}

function openCart() {
    cartProd.classList.toggle('hide');
}

document.getElementById("order-form").addEventListener('submit',function(e){
    
    e.preventDefault();
    let data = JSON.stringify({
        "name":e.target['FullName'].value,
        "adress":e.target['DeliveryAddress'].value,
        "phone":e.target['PhoneNumber'].value,
        "post_number":e.target['PostOfficeNumber'].value,
        "status":"new",
        "products": localStorage.getItem('cart')
    });
   
    var xhr =new  XMLHttpRequest();

    xhr.open("POST",url +`/orders`);

    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "62471b7167937c128d7c9406");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

    modal.style.display="none";
    cart= [];
    cartProd.innerHTML="Cart is empty";
    localStorage.setItem('cart','[]');

});
    
