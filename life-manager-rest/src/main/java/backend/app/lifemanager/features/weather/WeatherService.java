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

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.api.weather.authority}")
    private String weatherAuthority;

    @Value("${openweather.api.weather.path}")
    private String weatherPath;

    @Value("${openweather.api.units}")
    private String units;

    @Autowired
    public WeatherService(WebClient webClient) {
        this.webClient = webClient;
    }

    public WeatherForecast getCurrent(String city) {
        Mono<WeatherForecast> currentWeatherForecastMono = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host(weatherAuthority)
                        .path(weatherPath)
                        .queryParam("q", city)
                        .queryParam("appid", apiKey)
                        .queryParam("units", units)
                        .build()
                )
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(WeatherForecast.class);
//        TODO: add handling of the failing calls.
        return currentWeatherForecastMono.block();
    }

    public WeatherForecast getCurrent(String country, String city) {
        Mono<WeatherForecast> currentWeatherForecastMono = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host(weatherAuthority)
                        .path(weatherPath)
                        .queryParam("q", String.format("%s,%s", city, country))
                        .queryParam("appid", apiKey)
                        .queryParam("units", units)
                        .build()
                )
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(WeatherForecast.class);
//        TODO: add handling of the failing calls.
        return currentWeatherForecastMono.block();
    }
}
