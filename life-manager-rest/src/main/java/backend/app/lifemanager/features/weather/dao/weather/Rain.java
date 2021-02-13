package backend.app.lifemanager.features.weather.dao.weather;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rain {
    @JsonProperty("1h")
    private double oneHour;
    @JsonProperty("3h")
    private double threeHours;
}
