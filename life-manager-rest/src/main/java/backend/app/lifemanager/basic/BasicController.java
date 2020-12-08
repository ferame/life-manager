package backend.app.lifemanager.basic;

import backend.app.lifemanager.security.authentication.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/basic")
public class BasicController {
    private final AtomicLong counter = new AtomicLong();

    private final IAuthenticationFacade authenticationFacade;

    @Autowired
    public BasicController(IAuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }

    @GetMapping("/basic")
    public BasicResponse basicEndpoint(@RequestParam(value = "text", defaultValue = "Default text") String text) {
        return new BasicResponse(counter.incrementAndGet(), text);
    }

    @GetMapping("/restricted")
    public String restrictedEndpoint() {
        Authentication authentication = authenticationFacade.getAuthentication();
        String currentPrincipalName = authentication.getName();
//        List<String> authorityList = authentication
//                .getAuthorities()
//                .parallelStream()
//                .map(authority -> authority.getAuthority())
//                .collect(Collectors.toList());
        return "User: " + currentPrincipalName;
    }

    @GetMapping("/unrestricted")
    public String publicEndpoint() {
        return "{message: Hello, apiState: public}";
    }
}
