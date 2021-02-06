package backend.app.lifemanager.features.dao.locations;

import backend.app.lifemanager.features.dao.weather.Coordinates;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    private Long id;
    private Coordinates coordinates;
    private String country;
    private String name;
}
