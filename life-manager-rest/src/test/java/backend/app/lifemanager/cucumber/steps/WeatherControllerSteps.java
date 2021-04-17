package backend.app.lifemanager.cucumber.steps;

import backend.app.lifemanager.cucumber.SpringIntegrationTest;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.http.HttpStatus;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class WeatherControllerSteps extends SpringIntegrationTest {
//    Feature: the weather for specific city in a country is retrieved
//    Scenario: client makes call to GET /current/Lithuania/Vilnius
//    When the client calls /current/lt/vilnius
//    Then the client receives status code of 200
//    And the client receives weather forecast with name Vilnius
    @When("^the client calls /current/lt/vilnius$")
    public void the_client_calls_country_city_forecast() throws IOException {
        executeGet("http://localhost:8082/current/lt/vilnius");
    }

    @Then("^the client receives status code of (\\d+)$")
    public void the_client_receives_status_code_of(int statusCode) throws Throwable {
        final HttpStatus currentStatusCode = latestResponse.getTheResponse().getStatusCode();
        assertThat("status code is incorrect : " + latestResponse.getBody(), currentStatusCode.value(), is(statusCode));
    }

    @And("^the client receives weather forecast with name Vilnius$")
    public void the_client_receives_server_version_body() throws Throwable {
        assertThat(latestResponse.getBody(), is("Vilnius"));
    }
}
