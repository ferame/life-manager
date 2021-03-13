package backend.app.lifemanager.security.token;

import backend.app.lifemanager.security.cache.TokenService;
import backend.app.lifemanager.security.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Slf4j
@Component
public class TokenUtil implements Serializable {

  static final String CLAIM_KEY_USERNAME = "sub";
  static final String CLAIM_KEY_CREATED = "iat";
  private static final long serialVersionUID = -3301605591108950415L;
  private final Clock clock = DefaultClock.INSTANCE;

  @Lazy
  @Autowired
  private TokenService tokenService;

  @Value("${jwt.signing.key.secret}")
  private String secret;

  @Value("${jwt.token.expiration.in.seconds}")
  private Long expiration;

  public String getUsernameFromToken(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  public Date getIssuedAtDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getIssuedAt);
  }

  public Date getExpirationDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }

  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimsResolver.apply(claims);
  }

  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
  }

  private Boolean ignoreTokenExpiration(String token) {
    // here you specify tokens, for that the expiration is ignored
    return false;
  }

  public Optional<String> generateToken(org.springframework.security.core.userdetails.UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    String generatedToken = doGenerateToken(claims, userDetails.getUsername());
    return tokenService.addToken(generatedToken) ? Optional.of(generatedToken) : Optional.empty();
  }

  private String doGenerateToken(Map<String, Object> claims, String subject) {
    final Date createdDate = clock.now();
    final Date expirationDate = calculateExpirationDate(createdDate);

    return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(createdDate)
            .setExpiration(expirationDate)
            .signWith(SignatureAlgorithm.HS512, secret).compact();
  }

  public Boolean canTokenBeRefreshed(String token) {
    return (tokenService.isTokenValid(token) || ignoreTokenExpiration(token));
  }

  public String refreshToken(String token) {
    final Date createdDate = clock.now();
    final Date expirationDate = calculateExpirationDate(createdDate);

    final Claims claims = getAllClaimsFromToken(token);
    claims.setIssuedAt(createdDate);
    claims.setExpiration(expirationDate);
    String refreshedToken = Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, secret).compact();
    if (!tokenService.removeToken(token)) {
      log.warn("Failed to remove token {}", token);
    }
    if (!tokenService.addToken(refreshedToken)) {
      log.warn("Failed to add token {}", refreshedToken);
    }
    return refreshedToken;
  }

  private Boolean isUsernameCorrect (String token, User user) {
    final String username = getUsernameFromToken(token);
    return username.equals(user.getUsername());
  }

  public Boolean validateToken(String token, UserDetails userDetails) {
    return isUsernameCorrect(token, (User) userDetails) && tokenService.isTokenValid(token);
  }

  public Boolean invalidateToken(String token, User user) {
    final boolean invalidationStatus;
    if (isUsernameCorrect(token, user)){
      if (tokenService.isTokenValid(token)){
        invalidationStatus = tokenService.removeToken(token);
      } else {
        invalidationStatus = true;
      }
    } else {
      invalidationStatus = false;
    }
    return invalidationStatus;
  }

  private Date calculateExpirationDate(Date createdDate) {
    return new Date(createdDate.getTime() + expiration * 1000);
  }
}

