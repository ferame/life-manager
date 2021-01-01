package backend.app.lifemanager.features.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherForecast {
    private List<Weather> weather;
    private Wind wind;
    private String id;
    private String name;
    private String cod;
}
