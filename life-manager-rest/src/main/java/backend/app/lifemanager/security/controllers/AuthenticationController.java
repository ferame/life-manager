package backend.app.lifemanager.security.controllers;

import backend.app.lifemanager.basic.BasicResponse;
import backend.app.lifemanager.security.authentication.AuthenticationException;
import backend.app.lifemanager.security.token.TokenRequest;
import backend.app.lifemanager.security.token.TokenResponse;
import backend.app.lifemanager.security.token.TokenUtil;
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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:9090"})
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenUtil tokenUtil;
    private final UserDetailsService jwtInMemoryUserDetailsService;
    private final InMemoryUserDetailsService inMemoryUserDetailsService;
    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,
                                    TokenUtil tokenUtil,
                                    UserDetailsService jwtInMemoryUserDetailsService,
                                    InMemoryUserDetailsService inMemoryUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.tokenUtil = tokenUtil;
        this.jwtInMemoryUserDetailsService = jwtInMemoryUserDetailsService;
        this.inMemoryUserDetailsService = inMemoryUserDetailsService;
    }

    @PostMapping(value = "${api.user.token.create}")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody TokenRequest authenticationRequest)
            throws AuthenticationException {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final org.springframework.security.core.userdetails.UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final Optional<String> generatedToken = tokenUtil.generateToken(userDetails);

        return generatedToken.isPresent() ? ResponseEntity.ok(new TokenResponse(generatedToken.get())) : ResponseEntity.ok(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(value = "${api.user.token.refresh}")
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
//        String username = tokenUtil.getUsernameFromToken(token);
//        User user = (User) jwtInMemoryUserDetailsService.loadUserByUsername(username);

        final ResponseEntity responseEntity;

        if (tokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = tokenUtil.refreshToken(token);
            responseEntity = ResponseEntity.ok(new TokenResponse(refreshedToken));
        } else {
            responseEntity = ResponseEntity.badRequest().body(null);
        }

        return responseEntity;
    }

    @PostMapping(value = "${api.user.register}")
    public BasicResponse register(@RequestBody UserDto userDto) {
        Optional<User> newUserDetails;
        if (userDto.getPassword().equals(userDto.getMatchingPassword())) {
            newUserDetails = inMemoryUserDetailsService.createNewUser(userDto);
        } else {
            newUserDetails = Optional.empty();
        }
        //            TODO: remove the id from here, as that is not really meant for api user to be seen
        return newUserDetails
                .map(user -> new BasicResponse(user.getId(), user.getUsername()))
                .orElseGet(() -> new BasicResponse(1L, "Username is already taken."));
    }

    @GetMapping(value = "${api.user.signout}")
    public BasicResponse logout(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        String username = tokenUtil.getUsernameFromToken(token);
        User user = (User) jwtInMemoryUserDetailsService.loadUserByUsername(username);

        BasicResponse response;
        if (tokenUtil.invalidateToken(token, user)) {
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

