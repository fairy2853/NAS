const products_grid = document.getElementById("products-grid");

const url = "http://my-json-server.typicode.com/fairy2853/NAS";

let products_array=[];



let xhr =new XMLHttpRequest();


xhr.open("GET",url+"/products");
xhr.responseType="json";
xhr.onload=function(){
    let products=xhr.response;
    products_grid.innerHTML=null;
    products.forEach(p=>{
        products_array.push(p);

        let Pelem=document.createElement('div');
        Pelem.classList.add(product);
       Pelem.innerHTML=`
        <h2 class='product-name'>${p.name}</h2>
           <img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
           <p class='product-price'><b>Price: </b>${p.price}$</p>
            <p class='product-description'><b>Description: </b>${p.description}</p>
            <a href=''>Seller profile</a>
            <button>Buy</button>
        `
        products_grid.append(Pelem);

    });

    
    



}

xhr.send();