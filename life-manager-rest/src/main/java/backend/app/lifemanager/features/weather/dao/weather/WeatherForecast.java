package backend.app.lifemanager.features.weather.dao.weather;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherForecast {
    @JsonProperty("coord")
    private Coordinates coordinates;
    private List<Weather> weather;
    private String id;
    private String name;
    private Main main;
    private String dt;
    private Wind wind;
    private String cod;
    private Rain rain;
}
