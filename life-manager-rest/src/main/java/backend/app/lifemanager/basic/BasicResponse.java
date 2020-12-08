package backend.app.lifemanager.basic;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BasicResponse {
    private final long id;
    private final String text;
}
