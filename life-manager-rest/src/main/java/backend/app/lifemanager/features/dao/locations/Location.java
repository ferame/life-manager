package backend.app.lifemanager.features.dao.locations;

import backend.app.lifemanager.features.dao.weather.Coordinates;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    private Long id;
    @JsonProperty("coord")
    private Coordinates coordinates;
    private String country;
    private String name;
}
