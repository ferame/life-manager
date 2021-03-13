package backend.app.lifemanager.security.cache;

import backend.app.lifemanager.security.cache.model.Token;
import backend.app.lifemanager.security.cache.repo.TokenRepo;
import backend.app.lifemanager.security.token.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.StreamSupport;

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

    public boolean addToken(String token) {
        final boolean addingStatus;
        if (tokenRepository.findById(token).isEmpty()) {
            tokenRepository.save(new Token(token, tokenUtil.getExpirationDateFromToken(token)));
            addingStatus = true;
        } else {
            addingStatus = false;
        }
        return addingStatus;
    }

    public boolean removeToken(String token) {
        final boolean removingStatus;
        if (tokenRepository.findById(token).isEmpty()) {
            tokenRepository.save(new Token(token, tokenUtil.getExpirationDateFromToken(token)));
            removingStatus = true;
        } else {
            removingStatus = false;
        }
        return removingStatus;
    }

//    Set up a cron job for this one for the half-lifetime of the token
    private void removeExpiredTokens() {
        StreamSupport.stream(tokenRepository.findAll().spliterator(), true).filter(Token::isExpired).forEach(tokenRepository::delete);
    }

    public boolean isTokenValid(String token) {
        Optional<Token> searchedToken = tokenRepository.findById(token);
        final boolean isValidToken;
        if (searchedToken.isPresent() && !searchedToken.get().isExpired()) {
            isValidToken = true;
        } else if (searchedToken.isPresent()){
            removeToken(searchedToken.get().getId());
            isValidToken = false;
        } else {
            isValidToken = false;
        }
        return isValidToken;
    }
}
