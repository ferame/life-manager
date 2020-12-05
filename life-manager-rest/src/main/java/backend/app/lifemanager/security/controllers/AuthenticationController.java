package backend.app.lifemanager.security.controllers;

import backend.app.lifemanager.dao.BasicResponse;
import backend.app.lifemanager.security.authentication.AuthenticationException;
import backend.app.lifemanager.security.token.JWTTokenBlacklistService;
import backend.app.lifemanager.security.token.JwtTokenRequest;
import backend.app.lifemanager.security.token.JwtTokenResponse;
import backend.app.lifemanager.security.token.JwtTokenUtil;
import backend.app.lifemanager.security.user.InMemoryUserDetailsService;
import backend.app.lifemanager.security.user.User;
import backend.app.lifemanager.security.user.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;
import java.util.Optional;

import static backend.app.lifemanager.security.user.InMemoryUserDetailsService.inMemoryUserList;

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class AuthenticationController {

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService jwtInMemoryUserDetailsService;
    private final InMemoryUserDetailsService inMemoryUserDetailsService;
    private final JWTTokenBlacklistService jwtTokenBlacklistService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,
                                    JwtTokenUtil jwtTokenUtil,
                                    UserDetailsService jwtInMemoryUserDetailsService,
                                    InMemoryUserDetailsService inMemoryUserDetailsService,
                                    JWTTokenBlacklistService jwtTokenBlacklistService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.jwtInMemoryUserDetailsService = jwtInMemoryUserDetailsService;
        this.inMemoryUserDetailsService = inMemoryUserDetailsService;
        this.jwtTokenBlacklistService = jwtTokenBlacklistService;
    }

    @PostMapping(value = "${api.user.token.create}")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest)
            throws AuthenticationException {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final org.springframework.security.core.userdetails.UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtTokenResponse(token));
    }

    @GetMapping(value = "${api.user.token.refresh}")
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = (User) jwtInMemoryUserDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token) && !jwtTokenBlacklistService.isTokenBlacklisted(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping(value = "${api.user.register}")
    public BasicResponse register(@RequestBody UserDto userDto) {
        Optional<User> newUserDetails;
        if (userDto.getPassword().equals(userDto.getMatchingPassword())) {
            newUserDetails = inMemoryUserDetailsService.createNewUser(userDto);
        } else {
            newUserDetails = Optional.empty();
        }

        BasicResponse response;
        if (newUserDetails.isPresent()){
//            TODO: remove the id from here, as that is not really meant for api user to be seen
            response = new BasicResponse(newUserDetails.get().getId(), newUserDetails.get().getUsername());
        } else {
            response = new BasicResponse(1L, "Username is already taken.");
        }
        return response;
    }

    @PostMapping(value = "${api.user.logout}")
    public BasicResponse logout(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = (User) jwtInMemoryUserDetailsService.loadUserByUsername(username);

        BasicResponse response;
        if (jwtTokenUtil.validateToken(token, user) && jwtTokenBlacklistService.addTokenToBlacklist(token)) {
            response = new BasicResponse(1L, user.getUsername() + " logged out.");
        } else {
            response = new BasicResponse(1L, "Already logged out.");
        }
        return response;
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        inMemoryUserList.forEach(user -> log.info(user.getUsername()));
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationException("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new AuthenticationException("INVALID_CREDENTIALS", e);
        }
    }
}

