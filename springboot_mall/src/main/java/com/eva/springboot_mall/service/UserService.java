package com.eva.springboot_mall.service;

import com.eva.springboot_mall.dto.UserRegisterRequest;
import com.eva.springboot_mall.model.User;

public interface UserService {
    User getUserById(Integer userId);
    Integer register(UserRegisterRequest userRegisterRequest);
}
