let productForm = document.getElementById('add_product_form');

productForm.addEventListener('submit', function(event){
    event.preventDefault();
    let data = JSON.stringify({
        "name": event.target['name'].value,
        "description": event.target['description'].value,
        "price": event.target['price'].value,
        "photo_url": event.target['photo_url'].value
    });

    let xhr = new XMLHttpRequest();

    // &&&&&
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "https://nasdb-393c.restdb.io/rest/product");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "62471b7167937c128d7c9406");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
});