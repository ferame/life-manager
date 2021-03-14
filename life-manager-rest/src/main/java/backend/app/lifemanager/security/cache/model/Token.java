package backend.app.lifemanager.security.cache.model;

import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@RedisHash("DisabledToken")
public class Token implements Serializable {
    private static final long serialVersionUID = 1603714798906422731L;
    private static final Clock clock = DefaultClock.INSTANCE;
    private String id;
    private Date expirationDate;

    @Override
    public String toString() {
        return "DisabledToken{" + "id='" + id + '\'' + ", expirationDate='" + expirationDate + "\'}";
    }

    public boolean isExpired() {
        return expirationDate.before(clock.now());
    }
}
