package backend.app.lifemanager.features.weather;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrentWeather {
    private String id;
    private String name;
    private String cod;
}
