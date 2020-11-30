package backend.app.lifemanager.controllers;

import backend.app.lifemanager.dao.BasicResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
public class BasicController {
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/basic")
    public BasicResponse basicEndpoint(@RequestParam(value = "text", defaultValue = "Default text") String text) {
        return new BasicResponse(counter.incrementAndGet(), text);
    }

    @GetMapping("/restricted")
    public String restrictedEndpoint() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        List<String> authorityList = authentication.getAuthorities()
                .parallelStream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.toList());
        return "User: " + currentPrincipalName;
    }

    @GetMapping("/unrestricted")
    public String publicEndpoint() {
        return "{message: Hello, apiState: public}";
    }
}
