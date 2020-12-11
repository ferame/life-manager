package backend.app.lifemanager.security.disabled.token.service;

import backend.app.lifemanager.security.disabled.token.model.DisabledToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class RedisService {
    private ReactiveRedisTemplate<String, DisabledToken> redisTemplate;

    @Autowired
    public RedisService(ReactiveRedisTemplate<String, DisabledToken> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Mono<Boolean> put(String key, DisabledToken disabledToken) {
        return redisTemplate.opsForValue().set(key, disabledToken);
    }

    public Mono<DisabledToken> get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public Mono<Boolean> delete(String key) {
        return redisTemplate.opsForValue().delete(key);
    }
}
