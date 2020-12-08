package backend.app.lifemanager.security.token;

import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TokenBlacklistService {
    TokenUtil tokenUtil;
    private final Clock clock = DefaultClock.INSTANCE;

    @Autowired
    public TokenBlacklistService(TokenUtil tokenUtil){
        this.tokenUtil = tokenUtil;
    }

    final static Set<BlacklistedToken> tokensBlacklist = new HashSet<>();

    public boolean addTokenToBlacklist(String token) {
//        TODO: will need to have a timer to kick of the removal of expired tokens
        removeExpiredTokens();
        boolean actionStatus;
        if (tokenUtil.isTokenExpired(token)){
            actionStatus = false;
        } else {
            tokensBlacklist.add(new BlacklistedToken(token, tokenUtil.getExpirationDateFromToken(token)));
            actionStatus = true;
        }
        return actionStatus;
    }

    private void removeExpiredTokens() {
        tokensBlacklist.stream()
                .filter(blacklistedToken -> tokenUtil.isTokenExpired(blacklistedToken.getToken()))
                .forEach(expiredToken -> tokensBlacklist.remove(expiredToken));
    }

    public static boolean isTokenBlacklisted(String token) {
        return tokensBlacklist.stream()
                .anyMatch(blacklistedToken -> blacklistedToken.token.equals(token));
    }

    boolean isExpired(Date expirationDate) {
        return !expirationDate.after(clock.now());
    }
}
