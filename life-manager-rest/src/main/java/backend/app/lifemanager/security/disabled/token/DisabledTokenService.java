package backend.app.lifemanager.security.disabled.token;

import backend.app.lifemanager.security.disabled.token.model.DisabledToken;
import backend.app.lifemanager.security.disabled.token.repo.DisabledTokenRepo;
import backend.app.lifemanager.security.token.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisabledTokenService {
    final TokenUtil tokenUtil;
    private final DisabledTokenRepo disabledTokenRepository;

    @Autowired
    public DisabledTokenService(DisabledTokenRepo disabledTokenRepository,
                                TokenUtil tokenUtil) {
        this.disabledTokenRepository = disabledTokenRepository;
        this.tokenUtil = tokenUtil;
    }


    public boolean disableToken(String token) {
        final boolean disablingStatus;
        if (tokenUtil.isTokenExpired(token)) {
            disablingStatus = false;
        } else {
            if (disabledTokenRepository.findById(token).isEmpty()) {
                disabledTokenRepository.save(new DisabledToken(token, tokenUtil.getExpirationDateFromToken(token)));
            }
            disablingStatus = true;
        }
        return disablingStatus;
    }

//    TODO: flip the tokenRepoToBeValidTokenRepo?
//    private void removeExpiredDisabledTokens() {
//        disabledTokenRepository.findAll().forEach(disabledToken -> {
//            if (tokenUtil.isTokenExpired(disabledToken.getId())) {
//                disabledTokenRepository.delete(disabledToken);
//            }
//        });
//    }

    public boolean isTokenDisabled(String token) {
        return disabledTokenRepository.findById(token).isPresent();
    }
}
