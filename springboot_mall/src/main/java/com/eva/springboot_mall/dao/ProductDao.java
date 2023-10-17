package com.eva.springboot_mall.dao;

import com.eva.springboot_mall.constant.ProductCategory;
import com.eva.springboot_mall.dto.ProductQueryParams;
import com.eva.springboot_mall.dto.ProductRequest;
import com.eva.springboot_mall.model.Product;

import java.util.List;

public interface ProductDao {
    List<Product> getProducts(ProductQueryParams productQueryParams);
    Product getProductById(Integer productId);
    Integer createProduct(ProductRequest productRequest);
    void updateProduct(Integer productId, ProductRequest productRequest);
    void deleteProductById(Integer productId);

}
