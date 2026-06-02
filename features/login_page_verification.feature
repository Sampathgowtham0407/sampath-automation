Feature: Login page verification

  Background: 
    Given I open the login page

  Scenario: Verify the login page displays all required fields
    Then I should see the username field
    And I should see the password field
    And I should see the sign in button
    And I should see the user type radio options

  Scenario: Log in successfully with valid credentials
    When I log in with username "rahulshettyacademy" and password "Learning@830$3mK2"
    Then I should be redirected to the shop page
    And I should see the products list
