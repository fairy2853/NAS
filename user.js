
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let profile = document.getElementById('profile');

let products_grid = document.getElementById("user-products-grid")

const url = `https://my-json-server.typicode.com/fairy2853/NAS/users/${id}`;

let userRequest =new XMLHttpRequest();



userRequest.open("GET",url);
userRequest.responseType="json";
userRequest.onload=function(){
    let user=userRequest.response;
  
    profile.innerHTML = `

        <h1>${user.name}</h1>

        <h2>${user.sirname}</h2>

        <img class="profile-img" src="${user.photo_url}">

        <p>Balance: ${user.balance}$</p>

    `
    
    
    

};

    

let productsRequest = new XMLHttpRequest();

productsRequest.open('GET',`${url}/products?author_id=${id}`);
productsRequest.responseType = 'json'
productsRequest.onload = function() { 
    let products = productsRequest.response;
    productsGrid.innerHTML = null;
    products.forEach(p => {
        productsGrid.innerHTML += `
            <div class="product">
                <h2 class='product-name'>${p.name}</h2>
                <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
                <p class='product-price'><b>Price: </b>${p.price}$</p>
                <p class='product-description'><b>Description: </b>${p.description}</p>
            </div>
        `;
    });
}

productsRequest.send();
    





userRequest.send();

