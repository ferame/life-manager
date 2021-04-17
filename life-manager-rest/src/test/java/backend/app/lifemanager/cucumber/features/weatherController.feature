Feature: the weather for specific city in a country is retrieved
  Scenario: client makes call to GET /current/Lithuania/Vilnius
    When the client calls /current/lt/vilnius
    Then the client receives status code of 200
    And the client receives weather forecast with name Vilnius