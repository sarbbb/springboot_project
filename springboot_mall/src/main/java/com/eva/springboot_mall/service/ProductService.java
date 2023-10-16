package com.eva.springboot_mall.service;

import com.eva.springboot_mall.dto.ProductRequest;
import com.eva.springboot_mall.model.Product;

public interface ProductService {
    Product getProductById(Integer productId);
    Integer createProduct(ProductRequest productRequest);
    void updateProduct(Integer productId, ProductRequest productRequest);
    void deleteProductById(Integer productId);
}
