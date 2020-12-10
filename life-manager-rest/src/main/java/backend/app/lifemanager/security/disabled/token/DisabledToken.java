package backend.app.lifemanager.security.disabled.token;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;

@RedisHash("DisabledToken")
@Data
@AllArgsConstructor
public class DisabledToken implements Serializable {
    private String id;
    private Date expirationDate;
}
