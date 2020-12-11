package backend.app.lifemanager.security.disabled.token.model;

import lombok.*;

import java.io.Serializable;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DisabledToken implements Serializable {
    private static final long serialVersionUID = 1603714798906422731L;
    private String id;
    private String expirationDate;
}
