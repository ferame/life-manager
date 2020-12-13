package backend.app.lifemanager.security.disabled.token.model;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@RedisHash("DisabledToken")
public class DisabledToken implements Serializable {
    private static final long serialVersionUID = 1603714798906422731L;
    private String id;
    private Date expirationDate;

    @Override
    public String toString() {
        return "DisabledToken{" + "id='" + id + '\'' + ", expirationDate='" + expirationDate + "\'}";
    }
}
