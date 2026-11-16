Feature: Login and navigation

  Scenario: Verify that user is able to login successfully.
    Given the user is on the login page
    And the user logs in with valid credentials
    Then the user should see the logout link

  Scenario: Verify that user is able to open Tips.
    Given the user is on the login page
    And the user logs in with valid credentials
    When the user clicks the Tips link
    Then the user should be on the Tips page

  Scenario: Verify that user is able to click on Test Cases.
    Given the user is on the login page
    And the user logs in with valid credentials
    When the user clicks the Test Cases link
    Then the user should be on the Test Cases page

  Scenario: Verify that user is able to click on API Testing.
    Given the user is on the login page
    And the user logs in with valid credentials
    When the user clicks the API Testing link
    Then the user should be on the API Docs page
