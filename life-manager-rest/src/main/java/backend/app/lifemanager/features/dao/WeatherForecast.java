package backend.app.lifemanager.features.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherForecast {
    private Coordinates coord;
    private List<Weather> weather;
    private String id;
    private String name;
    private Main main;
    private String dt;
    private Wind wind;
    private String cod;
    private Rain rain;
}
