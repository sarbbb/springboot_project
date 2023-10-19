package com.eva.springboot_mall.dao;

import com.eva.springboot_mall.dto.UserRegisterRequest;
import com.eva.springboot_mall.model.User;

public interface UserDao {

    User getUserById(Integer userId);

    User getUserByEmail(String Email);
    Integer createUser(UserRegisterRequest userRegisterRequest);
}
