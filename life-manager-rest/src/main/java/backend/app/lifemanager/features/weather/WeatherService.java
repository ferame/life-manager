package backend.app.lifemanager.features.weather;

import backend.app.lifemanager.features.location.LocationService;
import backend.app.lifemanager.features.weather.dao.weather.WeatherForecast;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class WeatherService {

    private final WebClient webClient;
    private final LocationService locationService;

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.api.weather.authority}")
    private String weatherAuthority;

    @Value("${openweather.api.weather.path}")
    private String weatherPath;

    @Value("${openweather.api.units}")
    private String units;

    @Autowired
    public WeatherService(WebClient webClient, LocationService locationService) {
        this.webClient = webClient;
        this.locationService = locationService;
    }

    public WeatherForecast getCurrent(String city) {
//    public String getCurrent(String city) {
        Mono<WeatherForecast> currentWeatherForecastMono = webClient.get()
//        Mono<String> currentWeatherForecastMono = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host(weatherAuthority)
                        .path(weatherPath)
                        .queryParam("q", city)
                        .queryParam("appid", apiKey)
                        .queryParam("units", units)
                        .build()
                )
//                .accept(MediaType.APPLICATION_JSON)
//                .retrieve()
//                .bodyToMono(String.class);
                .accept(MediaType.APPLICATION_JSON)
                .retrieve().bodyToMono(WeatherForecast.class);
//        TODO: add handling of the failing calls.
        return currentWeatherForecastMono.block();
//        return currentWeatherForecastMono.block();
    }

//    public List<Location> getForecastLocations() {
//        TODO: get the list from "http://bulk.openweathermap.org/sample/current.city.list.json.gz"
//        Store it in local cache
//        Serve first x matches.
//        return locationService.getLocationsList();
//    }
}
