const productId = getProductIdFromUrl();


function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log("獲取到的 productId:", id);
    return id;
}

function updateProductUI(data) {
    document.getElementById('productImage').src = data.imageUrl;
    document.getElementById('editProductName').value = data.productName;
    document.getElementById('editCategory').value = data.category;
    document.getElementById('editPrice').value = data.price;
    document.getElementById('editStock').value = data.stock;
}

function fetchProductDetails() {
    if (!productId) {
        alert('請輸入商品ID');
        return;
    }

    const apiUrl = 'http://localhost:8081/products/' + productId;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('未找到商品');
            }
            return response.json();
        })
        .then(data => {
            updateProductUI(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

document.getElementById('updateProductForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const isValid = this.checkValidity();
    if (!isValid) {
        alert('請確認所有欄位都已正確填寫');
        return;
    }

    const productData = {
        productName: document.getElementById('editProductName').value,
        category: document.getElementById('editCategory').value,
        imageUrl: document.getElementById('editImageUrl').value,
        price: parseFloat(document.getElementById('editPrice').value),
        stock: parseInt(document.getElementById('editStock').value)
    };

    fetch('http://localhost:8081/products/' + productId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('修改失敗');
            }
            return response.json();
        })
        .then(data => {
            alert('商品已成功修改');
        })
        .catch(error => {
            alert(error.message);
        });
});

// 當頁面加載時，填充"分類"下拉菜單
fetch('/products/categories')
    .then(response => response.json())
    .then(data => {
        const categorySelect = document.getElementById('editCategory');
        data.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    });

// ... 以下您可以根据需要继续添加其他功能或处理逻辑 ...
// document.getElementById('updateProductForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//
//     var isValid = this.checkValidity();
//     if (!isValid) {
//         alert('請確認所有欄位都已正確填寫');
//         return;
//     }
//
//     var productData = {
//         productName: document.getElementById('editProductName').value,
//         category: document.getElementById('editCategory').value,
//         imageUrl: document.getElementById('editImageUrl').value,
//         price: parseFloat(document.getElementById('editPrice').value),
//         stock: parseInt(document.getElementById('editStock').value)
//     };
//
//     fetch('/products/' + document.getElementById('productId').value, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(productData)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('修改失敗');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // 使用回應的數據更新UI
//             updateProductUI(data);
//             alert('商品已成功修改');
//         })
//         .catch(error => {
//             alert(error.message);
//         });
// });

function deleteProduct() {
    var productId = document.getElementById('productId').value;
    if (!productId) {
        alert('請輸入商品ID');
        return;
    }

    var confirmation = confirm("確定要刪除這個商品嗎？");
    if (!confirmation) {
        return;
    }

    var apiUrl = 'http://localhost:8081/products/' + productId;

    fetch(apiUrl, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 204) {
                alert('商品已成功刪除');
                // 清除畫面上的商品資訊或重新導向到其他頁面
                clearProductDetails();
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data && data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            alert('刪除失敗');
        });
}

function clearProductDetails() {
    document.getElementById('productImage').src = "";
    document.getElementById('editProductName').value = "";
    document.getElementById('editCategory').value = "";
    document.getElementById('editImageUrl').value = "";
    document.getElementById('editPrice').value = "";
    document.getElementById('editStock').value = "";
}

window.onload = fetchProductDetails;
