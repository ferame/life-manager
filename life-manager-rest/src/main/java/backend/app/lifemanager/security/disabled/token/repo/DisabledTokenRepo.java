package backend.app.lifemanager.security.disabled.token.repo;

import backend.app.lifemanager.security.disabled.token.model.DisabledToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisabledTokenRepo extends CrudRepository<DisabledToken, String> {}
