package backend.app.lifemanager.features.weather;

import backend.app.lifemanager.basic.BasicResponse;
import backend.app.lifemanager.security.authentication.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    private final IAuthenticationFacade authenticationFacade;
    private final WeatherService weatherService;

    @Autowired
    public WeatherController(IAuthenticationFacade authenticationFacade, WeatherService weatherService) {
        this.authenticationFacade = authenticationFacade;
        this.weatherService = weatherService;
    }

    @GetMapping("/current/{location}")
    public CurrentWeather currentWeather(@PathVariable String location) {
        Authentication authentication = authenticationFacade.getAuthentication();
        String currentPrincipalName = authentication.getName();
        return weatherService.getCurrent(location);
    }

    @GetMapping("/unrestricted")
    public String publicEndpoint() {
        Authentication authentication = authenticationFacade.getAuthentication();
        String currentPrincipalName = authentication.getName();
//        List<String> authoritypirkaList = authentication
//                .getAuthorities()
//                .parallelStream()
//                .map(authority -> authority.getAuthority())
//                .collect(Collectors.toList());
        return "User: " + currentPrincipalName;
    }
}
