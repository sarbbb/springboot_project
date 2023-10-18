package com.eva.springboot_mall.service.impl;

import com.eva.springboot_mall.dao.UserDao;
import com.eva.springboot_mall.dto.UserRegisterRequest;
import com.eva.springboot_mall.model.User;
import com.eva.springboot_mall.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User getUserById(Integer userId) {
        return userDao.getUserById(userId);
    }

    @Override
    public Integer register(UserRegisterRequest userRegisterRequest) {
        return userDao.createUser(userRegisterRequest);
    }
}
