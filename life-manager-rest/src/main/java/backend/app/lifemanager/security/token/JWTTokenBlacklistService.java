package backend.app.lifemanager.security.token;

import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JWTTokenBlacklistService {
    JwtTokenUtil jwtTokenUtil;
    private final Clock clock = DefaultClock.INSTANCE;

    @Autowired
    public JWTTokenBlacklistService(JwtTokenUtil jwtTokenUtil){
        this.jwtTokenUtil = jwtTokenUtil;
    }

    final static Set<BlacklistedToken> tokensBlacklist = new HashSet<>();

    public boolean addTokenToBlacklist(String token) {
        boolean actionStatus;
        Date expirationDate = jwtTokenUtil.getExpirationDateFromToken(token);
        if (isExpired(expirationDate)){
            actionStatus = false;
        } else {
            tokensBlacklist.add(new BlacklistedToken(token, jwtTokenUtil.getExpirationDateFromToken(token)));
            actionStatus = true;
        }
        return actionStatus;
    }

    public static boolean isTokenBlacklisted(String token) {
        return tokensBlacklist.stream()
                .anyMatch(blacklistedToken -> blacklistedToken.token.equals(token));
    }

    boolean isExpired(Date expirationDate) {
        return !expirationDate.after(clock.now());
    }
}
