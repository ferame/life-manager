package backend.app.lifemanager.features.weather;

import backend.app.lifemanager.features.dao.weather.WeatherForecast;
import backend.app.lifemanager.security.authentication.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
    public WeatherForecast currentWeather(@PathVariable String location) {
        Authentication authentication = authenticationFacade.getAuthentication();
        String currentPrincipalName = authentication.getName();
        return weatherService.getCurrent(location);
    }

    @GetMapping("/locations")
    public List<String> forecastLocations() {
        weatherService.getForecastLocations();
        return new ArrayList<>();
    }

    @GetMapping("/unrestricted")
    public String publicEndpoint() {
        Authentication authentication = authenticationFacade.getAuthentication();
        String currentPrincipalName = authentication.getName();
//        List<String> authorityList = authentication
//                .getAuthorities()
//                .parallelStream()
//                .map(authority -> authority.getAuthority())
//                .collect(Collectors.toList());
        return "User: " + currentPrincipalName;
    }
}
