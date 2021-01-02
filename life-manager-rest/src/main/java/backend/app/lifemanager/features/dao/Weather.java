package backend.app.lifemanager.features.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Weather {
    private String id;
    private String main;
    private String description;
    private String icon;
}
