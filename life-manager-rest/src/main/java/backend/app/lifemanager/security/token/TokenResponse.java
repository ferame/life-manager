package backend.app.lifemanager.security.token;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@AllArgsConstructor
@Data
public class TokenResponse implements Serializable {

    private static final long serialVersionUID = 8317676219297719109L;

    private final String token;
}