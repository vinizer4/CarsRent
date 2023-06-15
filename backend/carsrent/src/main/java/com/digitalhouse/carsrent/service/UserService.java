package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.rest.dto.user.LoginResponseDTO;
import com.digitalhouse.carsrent.rest.dto.user.UserLoginDTO;
import com.digitalhouse.carsrent.rest.dto.user.UserDTO;
import com.digitalhouse.carsrent.model.User;
import com.digitalhouse.carsrent.repository.UserRepository;
import com.digitalhouse.carsrent.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService
{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO createUser(UserDTO userDTO)
    {
        User user = userDTO.toUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userRepository.save(user);
        return UserDTO.fromUser(newUser);
    }

    public ResponseEntity<LoginResponseDTO> loginUser(UserLoginDTO loginDTO)
    {
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (user != null && passwordEncoder.matches(
                loginDTO.getPassword(),
                user.getPassword()
                                                   ))
        {
            String token = jwtUtil.generateToken(user.getEmail());
            LoginResponseDTO responseDTO =
                    new LoginResponseDTO(
                            user.getId(),
                            user.getEmail(),
                            user.getFirstName(),
                            user.getLastName(),
                            token
                    );
            return new ResponseEntity<>(
                    responseDTO,
                    HttpStatus.OK
            );
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public List<UserDTO> getAllUsers()
    {
        return userRepository
                .findAll()
                .stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id)
    {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.fromUser(user);
    }

    public UserDTO updateUser(
            Long id,
            UserDTO userDTO
                             )
    {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        if (userDTO.getPassword() != null)
        {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        User updatedUser = userRepository.save(user);
        return UserDTO.fromUser(updatedUser);
    }

    public void deleteUser(Long id)
    {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
