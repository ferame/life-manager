package backend.app.lifemanager.security.token;

import lombok.Data;

import java.io.Serializable;

@Data
public class TokenRequest implements Serializable {
    private static final long serialVersionUID = -5616176897013108345L;

    private String username;
    private String password;

    public TokenRequest() {
        super();
    }

    public TokenRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }
}

