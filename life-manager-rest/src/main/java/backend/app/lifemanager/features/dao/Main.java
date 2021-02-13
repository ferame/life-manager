package backend.app.lifemanager.features.dao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Main {
    @JsonProperty("temp")
    private double temperature;
    private double pressure;
    private double humidity;
    @JsonProperty("temp_min")
    private double temperatureMin;
    @JsonProperty("temp_max")
    private double temperatureMax;
    @JsonProperty("feels_like")
    private double feelsLike;
}
