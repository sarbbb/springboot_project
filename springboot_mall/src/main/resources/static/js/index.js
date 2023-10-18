window.onload = () => {
    // Fetch categories
    fetch('http://localhost:8081/products/categories')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('categorySelect');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.innerText = category;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });

    // Fetch initial products
    fetchProducts();
};


function fetchProducts() {
    const searchValue = document.getElementById('searchBox').value;
    const categoryValue = document.getElementById('categorySelect').value;
    const orderByValue = document.getElementById('orderBySelect').value;
    const sortAscButton = document.getElementById('sortAscBtn');
    const sortValue = sortAscButton.classList.contains('active') ? 'asc' : 'desc';

    let url = 'http://localhost:8081/products?';
    if (searchValue) {
        url += 'search=' + encodeURIComponent(searchValue) + '&';
    }
    if (categoryValue) {
        url += 'category=' + encodeURIComponent(categoryValue) + '&';
    }
    url += 'orderBy=' + encodeURIComponent(orderByValue) + '&';
    url += 'sort=' + encodeURIComponent(sortValue);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productsRow = document.getElementById('productsRow');
            productsRow.innerHTML = '';  // Clear previous products

            data.forEach(product => {
                let colElem = document.createElement("div");
                colElem.className = "col-md-4";  // Create a column div

                let cardElem = document.createElement("div");
                cardElem.className = "card mb-4 d-flex flex-column";  // Added styles from your template

                let imgElem = document.createElement("img");
                imgElem.className = "card-img-top";
                imgElem.src = product.imageUrl;
                imgElem.alt = "Product Image";

                let cardBodyElem = document.createElement("div");
                cardBodyElem.className = "card-body d-flex flex-column justify-content-between";  // Added styles

                let cardTitleElem = document.createElement("h5");
                cardTitleElem.className = "card-title mb-auto";
                cardTitleElem.textContent = product.productName;

                let cardDescriptionElem = document.createElement("p");
                cardDescriptionElem.className = "card-text truncate-description";
                cardDescriptionElem.textContent = product.description || '';

                let cardCategoryElem = document.createElement("p");
                cardCategoryElem.className = "card-text";
                let strongElem = document.createElement("strong");
                strongElem.textContent = "Category:";
                cardCategoryElem.appendChild(strongElem);
                let textNode = document.createTextNode(" " + product.category);
                cardCategoryElem.appendChild(textNode);

                let cardPriceElem = document.createElement("p");
                cardPriceElem.className = "card-text";
                cardPriceElem.innerHTML = "<strong>Price:</strong> $" + product.price;

                let cardUpdatedElem = document.createElement("p");
                cardUpdatedElem.className = "card-text";
                cardUpdatedElem.innerHTML = `<small class="text-muted">Last updated ${product.lastModifiedDate}</small>`;

                cardBodyElem.appendChild(cardTitleElem);
                cardBodyElem.appendChild(cardDescriptionElem);
                cardBodyElem.appendChild(cardCategoryElem);
                cardBodyElem.appendChild(cardPriceElem);
                cardBodyElem.appendChild(cardUpdatedElem);

                cardElem.appendChild(imgElem);
                cardElem.appendChild(cardBodyElem);

                let linkElem = document.createElement("a");
                linkElem.href = "product-details?id=" + product.productId;
                linkElem.className = "text-decoration-none text-dark";
                linkElem.appendChild(cardElem);

                colElem.appendChild(linkElem);
                productsRow.appendChild(colElem);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

}

const sortButtons = document.querySelectorAll('.sort-btn');
sortButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        sortButtons.forEach(innerBtn => innerBtn.classList.remove('active'));
        this.classList.add('active');
        fetchProducts(); // Refetch the products with the new sort order
    });
});

// Add event listener for the search button
document.getElementById('searchButton').addEventListener('click', fetchProducts);
document.getElementById('orderBySelect').addEventListener('change', fetchProducts);

