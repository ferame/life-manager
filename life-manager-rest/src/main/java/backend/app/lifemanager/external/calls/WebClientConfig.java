package backend.app.lifemanager.external.calls;

import org.eclipse.jetty.client.HttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ClientHttpConnector;
import org.springframework.http.client.reactive.JettyClientHttpConnector;
import org.springframework.http.client.reactive.JettyResourceFactory;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public JettyResourceFactory resourceFactory() {
        return new JettyResourceFactory();
    }

    @Bean
    public WebClient webClient() {
        HttpClient httpClient = new HttpClient();
        ClientHttpConnector connector = new JettyClientHttpConnector(httpClient, resourceFactory());

        return WebClient.builder().clientConnector(connector).build();
    }
}
