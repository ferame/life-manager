package backend.app.lifemanager.security.cache.queue;

public interface MessagePublisher {
    void publish(final String message);
}
