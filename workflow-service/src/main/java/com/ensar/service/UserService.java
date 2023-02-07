package com.ensar.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.ensar.entity.User;

import com.ensar.repository.UserRepository;

import com.ensar.security.EnsarUserDetails;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@Transactional
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
       
    }

    @PostConstruct
    public void init() {
        
    }

    public User getUserById(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if(!userOptional.isPresent())
            throw new RuntimeException("User with " + id + " not found.");

        return userOptional.get();
    }

    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    

    @Override
    public EnsarUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username.");
        }
        return new EnsarUserDetails(user);
    }

    

    public User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return getUserByEmail(authentication.getName());
    }

    public void enableOrDisableUsers(List<String> userIdList, final boolean disabled) {
        userIdList.forEach(id-> {userRepository.getById(id).setDisabled(disabled);});
    }

    

}
