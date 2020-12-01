package backend.app.lifemanager.controllers;

import backend.app.lifemanager.dao.BasicResponse;
import backend.app.lifemanager.security.authentication.IAuthenticationFacade;
import backend.app.lifemanager.security.user.InMemoryUserDetailsService;
import backend.app.lifemanager.security.user.UserDetails;
import backend.app.lifemanager.security.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
public class BasicController {
    private final AtomicLong counter = new AtomicLong();

    private IAuthenticationFacade authenticationFacade;
    private InMemoryUserDetailsService inMemoryUserDetailsService;

    @Autowired
    public BasicController(IAuthenticationFacade authenticationFacade, InMemoryUserDetailsService inMemoryUserDetailsService) {
        this.authenticationFacade = authenticationFacade;
        this.inMemoryUserDetailsService = inMemoryUserDetailsService;
    }

    @GetMapping("/basic")
    public BasicResponse basicEndpoint(@RequestParam(value = "text", defaultValue = "Default text") String text) {
        return new BasicResponse(counter.incrementAndGet(), text);
    }

    @GetMapping("/restricted")
    public String restrictedEndpoint() {
        Authentication authentication = authenticationFacade.getAuthentication();
        String currentPrincipalName = authentication.getName();
        List<String> authorityList = authentication
                .getAuthorities()
                .parallelStream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.toList());
        return "User: " + currentPrincipalName;
    }

    @PostMapping("/register")
    public BasicResponse registration(@RequestBody UserDto userDto) {
        Optional<UserDetails> newUserDetails = inMemoryUserDetailsService.createNewUser(userDto);
        BasicResponse response;
        if (newUserDetails.isPresent()){
//            TODO: remove the id from here, as that is not really meant for api user to be seen
            response = new BasicResponse(newUserDetails.get().getId(), newUserDetails.get().getUsername());
        } else {
            response = new BasicResponse(1L, "Username is already taken.");
        }
        return response;
    }

    @GetMapping("/unrestricted")
    public String publicEndpoint() {
        return "{message: Hello, apiState: public}";
    }
}
