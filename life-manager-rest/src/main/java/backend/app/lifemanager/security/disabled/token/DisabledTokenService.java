package backend.app.lifemanager.security.disabled.token;

import backend.app.lifemanager.security.token.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisabledTokenService {
    TokenUtil tokenUtil;
    private final DisabledTokenRepository disabledTokenRepository;

    @Autowired
    public DisabledTokenService(DisabledTokenRepository disabledTokenRepository,
                                TokenUtil tokenUtil) {
        this.disabledTokenRepository = disabledTokenRepository;
        this.tokenUtil = tokenUtil;
    }

    public boolean disableToken(String token) {
        removeExpiredDisabledTokens();
        boolean actionStatus;
        if (tokenUtil.isTokenExpired(token)) {
            actionStatus = false;
        } else {
            DisabledToken disabledToken = new DisabledToken(token, tokenUtil.getExpirationDateFromToken(token));
            if (disabledTokenRepository.findById(token).isEmpty()) {
                disabledTokenRepository.save(disabledToken);
            }
            actionStatus = true;
        }
        return actionStatus;
    }

    private void removeExpiredDisabledTokens() {
        disabledTokenRepository.findAll().forEach(disabledToken -> {
            if (tokenUtil.isTokenExpired(disabledToken.getId())) {
                disabledTokenRepository.delete(disabledToken);
            }
        });
    }

    public boolean isTokenDisabled(String token) {
        return disabledTokenRepository.findById(token).isPresent();
    }
}
