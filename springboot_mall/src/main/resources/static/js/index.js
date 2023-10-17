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

    let url = 'http://localhost:8081/products?';
    if (searchValue) {
        url += 'search=' + encodeURIComponent(searchValue) + '&';
    }
    if (categoryValue) {
        url += 'category=' + encodeURIComponent(categoryValue);
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productsRow = document.getElementById('productsRow');
            productsRow.innerHTML = '';  // Clear previous products

            data.forEach(product => {
                if (product.productName && product.imageUrl && product.category && product.price) {
                    const card = `
                <div class="col-md-4">
                    <a href="product-details?id=${product.productId}" class="text-decoration-none text-dark">
                        <div class="card mb-4  d-flex flex-column" style="margin-top: 20px; margin-bottom: 20px;">
                            <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.productName}">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 class="card-title mb-auto">${product.productName}</h5>
                                    <p class="card-text truncate-description">${product.description || ''}</p>
                                </div>
                                <div>
                                    <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                                    <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                                    <p class="card-text"><small class="text-muted">Last updated ${product.lastModifiedDate}</small></p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                `;
                    productsRow.innerHTML += card;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Add event listener for the search button
document.getElementById('searchButton').addEventListener('click', fetchProducts);

