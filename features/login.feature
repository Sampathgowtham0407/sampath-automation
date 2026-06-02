Feature: Login page radio button selection

  Scenario: Select the second radio option and confirm selection
    Given I open the login page
    When I choose the second radio button
    Then the second radio button should be selected
