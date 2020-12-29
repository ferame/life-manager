package backend.app.lifemanager.security.disabled.token.queue;

public interface MessagePublisher {
    void publish(final String message);
}
