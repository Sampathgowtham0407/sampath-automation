Feature: Rahul Shetty Academy login

  Scenario: Log in with credentials entered in the terminal
    Given the user opens the Rahul Shetty Academy login page
    When the user signs in with credentials entered in the terminal
    Then the user should be redirected to the shop page
    When the user clicks the Category 1 link
