package backend.app.lifemanager.security.cache.repo;

import backend.app.lifemanager.security.cache.model.Token;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepo extends CrudRepository<Token, String> {}
