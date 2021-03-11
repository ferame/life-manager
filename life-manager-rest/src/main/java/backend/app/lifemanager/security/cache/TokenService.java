package backend.app.lifemanager.security.cache;

import backend.app.lifemanager.security.cache.model.Token;
import backend.app.lifemanager.security.cache.repo.TokenRepo;
import backend.app.lifemanager.security.token.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    final TokenUtil tokenUtil;
    private final TokenRepo tokenRepository;

    @Autowired
    public TokenService(TokenRepo tokenRepository,
                        TokenUtil tokenUtil) {
        this.tokenRepository = tokenRepository;
        this.tokenUtil = tokenUtil;
    }


    public boolean disableToken(String token) {
        final boolean disablingStatus;
        if (tokenUtil.isTokenExpired(token)) {
            disablingStatus = false;
        } else {
            if (tokenRepository.findById(token).isEmpty()) {
                tokenRepository.save(new Token(token, tokenUtil.getExpirationDateFromToken(token)));
            }
            disablingStatus = true;
        }
        return disablingStatus;
    }

    public boolean removeToken(String token) {
        final boolean removingStatus;
        if (tokenUtil.isTokenExpired(token)) {
            disablingStatus = false;
        } else {
            if (tokenRepository.findById(token).isEmpty()) {
                tokenRepository.save(new Token(token, tokenUtil.getExpirationDateFromToken(token)));
            }
            disablingStatus = true;
        }
        return disablingStatus;
    }

//    TODO: flip the tokenRepoToBeValidTokenRepo?
    private void removeExpiredTokens() {
        tokenRepository.findAll().forEach(token -> {
            if (tokenUtil.isTokenExpired(token.getId())) {
                tokenRepository.delete(token);
            }
        });
    }

    public boolean isTokenDisabled(String token) {
        return tokenRepository.findById(token).isPresent();
    }
}
