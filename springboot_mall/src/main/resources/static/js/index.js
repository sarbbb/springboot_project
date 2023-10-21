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

let loginModalElement = document.getElementById('loginModal');
let loginModal = new bootstrap.Modal(loginModalElement);

document.getElementById('loginButton').addEventListener('click', function() {
    loginModal.show();
});

document.getElementById('closeModalButton').addEventListener('click', function() {
    loginModal.hide();
});


let currentPage = 1;
const productsPerPage = 10;
function fetchProducts(page = 1) {
    currentPage = page;
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
    url += 'sort=' + encodeURIComponent(sortValue) + '&';

    url += 'limit=' + encodeURIComponent(productsPerPage) + '&';
    url += 'offset=' + encodeURIComponent((currentPage - 1) * productsPerPage);

    fetch(url)
        .then(response => response.json())
        .then(data => {
                const productsRow = document.getElementById('productsRow');
                productsRow.innerHTML = '';  // Clear previous products

                data.results.forEach(product => {

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
            renderPagination(data.total, productsPerPage);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

}

function renderPagination(totalProducts, productsPerPage) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = i === currentPage ? 'page-item active' : 'page-item';

        const a = document.createElement('a');
        a.href = '#';
        a.className = 'page-link';
        a.textContent = i;
        a.addEventListener('click', function(e) {
            e.preventDefault();
            fetchProducts(i);
        });

        li.appendChild(a);
        paginationElement.appendChild(li);
    }
}

document.getElementById('submitLogin').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userLoginRequest = {
        email: email,
        password: password
    };

    fetch('http://localhost:8081/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginRequest)
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.userId) {
                var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.hide();

                // Login successful, you can redirect or do something here
            } else {
                // Handle login error here
                alert('登入失敗！');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
});


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

