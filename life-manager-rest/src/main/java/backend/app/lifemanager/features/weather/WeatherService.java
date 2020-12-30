package backend.app.lifemanager.features.weather;

import backend.app.lifemanager.external.calls.WebClientConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class WeatherService {
    private WebClientConfig webClientConfig;

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.api.weather.path}")
    private String weatherPath;

    @Autowired
    public WeatherService(WebClientConfig webClientConfig) {
        this.webClientConfig = webClientConfig;
    }

    public CurrentWeather getCurrent(String city) {
        Mono<CurrentWeather> currentWeatherMono = webClientConfig.client.get()
                .uri(uriBuilder -> uriBuilder
                .path(weatherPath)
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .build()
        ).retrieve().bodyToMono(CurrentWeather.class);
        CurrentWeather currentWeather = currentWeatherMono.block();
        return currentWeather;
    }
}
