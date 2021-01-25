package backend.app.lifemanager.features.dao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coordinates {
    @JsonProperty("lon")
    private double longitude;
    @JsonProperty("lat")
    private double latitude;
}
