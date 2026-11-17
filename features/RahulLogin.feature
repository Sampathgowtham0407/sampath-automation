Feature: Rahul Shetty Academy login and home form

  Scenario: Log in, open Category 1, and fill the Home form
    Given the user opens the Rahul Shetty Academy login page
    When the user signs in with credentials entered in the terminal
    Then the user should be redirected to the shop page
    When the user clicks the Category 1 link
    When the user opens the Home form
    Then the user should be on the Home form page
    When the user fills the Home form with the requested details
    Then the Home form should show the requested values and selections
