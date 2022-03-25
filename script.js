const products_grid = document.getElementById("products-grid");

const url = "https://my-json-server.typicode.com/fairy2853/NAS/products";

let products_array=[];

let cartProd = document.getElementById('cart-products');

let cart = [];

let productsArray;




let xhr =new XMLHttpRequest();


xhr.open("GET",url );
xhr.responseType="json";
xhr.onload=function(){
    productsArray=xhr.response;
    let products=xhr.response;
    products_grid.innerHTML=null;
    products.forEach(p=>{
        products_array.push(p);

        let Pelem=document.createElement('div');
        Pelem.classList.add("product");
       Pelem.innerHTML=`
        <h2 class='product-name'>${p.name}</h2>
           <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
           <p class='product-price'><b>Price: </b>${p.price}$</p>
            <p class='product-description'><b>Description: </b>${p.description}</p>
            <a href='userProfile.html?id=${p.author_id}'>Seller profile</a>
            <button onclick ="addProductToCart(id)">Buy</button>
        `
        products_grid.append(Pelem);

    });

    
    
    


}


xhr.send();







if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}


function addProductToCart(id) {
    let product = productsArray.find(function(p) {
        return p._id == id;
  
    });
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
        sum += +p.price;
    });
    cartProd.innerHTML += `
        <p>Total Price: ${sum}$</p>
        <button onclick="buyAll()">Buy All</button>
    `;
}



function openCart(){
    cartProd.classList.toggle("hide");
}







