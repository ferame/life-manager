package backend.app.lifemanager.security.disabled.token;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisabledTokenRepository extends CrudRepository<DisabledToken, String> {}
