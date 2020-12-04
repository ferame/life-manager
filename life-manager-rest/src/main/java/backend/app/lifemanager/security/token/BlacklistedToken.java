package backend.app.lifemanager.security.token;

import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class BlacklistedToken {
    String token;
    Date expirationDate;
}
