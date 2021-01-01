package backend.app.lifemanager.features.weather;

import backend.app.lifemanager.external.calls.WebClientConfig;
import backend.app.lifemanager.features.dao.WeatherForecast;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
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

    public WeatherForecast getCurrent(String city) {
        Mono<WeatherForecast> currentWeatherForecastMono = webClientConfig.client.get()
                .uri(uriBuilder -> uriBuilder
                        .path(weatherPath)
                        .queryParam("q", city)
                        .queryParam("appid", apiKey)
                        .build()
                )
                .retrieve().bodyToMono(WeatherForecast.class);
        WeatherForecast currentWeatherForecast = currentWeatherForecastMono.block();
        return currentWeatherForecast;
    }
}
