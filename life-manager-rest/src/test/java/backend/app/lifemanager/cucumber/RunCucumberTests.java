package backend.app.lifemanager.cucumber;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = {"src/test/java/backend.app.lifemanager/cucumber/features"},
        glue = "backend.app.lifemanager.cucumber.steps"
)
public class RunCucumberTests {
}
