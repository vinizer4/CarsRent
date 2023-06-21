package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.rest.dto.user.LoginResponseDTO;
import com.digitalhouse.carsrent.rest.dto.user.UserLoginDTO;
import com.digitalhouse.carsrent.rest.dto.user.UserDTO;
import com.digitalhouse.carsrent.model.User;
import com.digitalhouse.carsrent.repository.UserRepository;
import com.digitalhouse.carsrent.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public UserDTO createUser(UserDTO userDTO) {
        User user = userDTO.toUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return UserDTO.fromUser(userRepository.save(user));
    }

    public ResponseEntity<LoginResponseDTO> loginUser(UserLoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (user != null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            LoginResponseDTO responseDTO = new LoginResponseDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    jwtUtil.generateToken(user.getEmail())
            );
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                             .map(UserDTO::fromUser)
                             .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        return userRepository.findById(id)
                             .map(UserDTO::fromUser)
                             .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                                  .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());

        if (userDTO.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        return UserDTO.fromUser(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        userRepository.findById(id)
                      .ifPresentOrElse(userRepository::delete, () -> {
                          throw new RuntimeException("User not found");
                      });
    }
}
