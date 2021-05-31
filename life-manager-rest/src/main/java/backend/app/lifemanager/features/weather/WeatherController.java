package backend.app.lifemanager.features.weather;

import backend.app.lifemanager.features.location.LocationService;
import backend.app.lifemanager.features.weather.dao.locations.Location;
import backend.app.lifemanager.features.weather.dao.weather.WeatherForecast;
import backend.app.lifemanager.security.authentication.IAuthenticationFacade;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:9090"})
@RequestMapping("/api/weather")
public class WeatherController {
    private final IAuthenticationFacade authenticationFacade;
    private final WeatherService weatherService;
    private final LocationService locationService;

    @Autowired
    public WeatherController(IAuthenticationFacade authenticationFacade, WeatherService weatherService, LocationService locationService) {
        this.authenticationFacade = authenticationFacade;
        this.weatherService = weatherService;
        this.locationService = locationService;
    }

    @GetMapping("/current/{location}")
    public WeatherForecast currentWeather(@PathVariable String location) {
//        Authentication authentication = authenticationFacade.getAuthentication();
//        String currentPrincipalName = authentication.getName();
        return weatherService.getCurrent(location);
    }

    @GetMapping("/current/{country}/{city}")
    public WeatherForecast currentWeather(@PathVariable String country, @PathVariable String city) {
        return weatherService.getCurrent(country, city);
    }

    @GetMapping("/locations")
    public List<Location> forecastLocations() {
        return locationService.getLocationsList();
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
