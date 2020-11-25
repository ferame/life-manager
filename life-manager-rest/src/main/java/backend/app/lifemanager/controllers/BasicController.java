package backend.app.lifemanager.controllers;

import backend.app.lifemanager.dao.BasicResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class BasicController {
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/basic")
    public BasicResponse basicEndpoint(@RequestParam(value = "text", defaultValue = "Default text") String text) {
        return new BasicResponse(counter.incrementAndGet(), text);
    }

    @GetMapping("/restricted")
    public String restrictedEndpoint() {
        return "{message: Hello, apiState: restricted}";
    }

    @GetMapping("/unrestricted")
    public String publicEndpoint() {
        return "{message: Hello, apiState: public}";
    }
}
