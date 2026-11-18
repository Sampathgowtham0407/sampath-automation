Feature: Rahul Shetty Academy shop

  Background:
    Given the user opens the Rahul Shetty Academy login page
    When the user signs in with credentials entered in the terminal
    Then the user should be redirected to the shop page

  Scenario: Open Category 1 and submit the Home form
    When the user clicks the Category 1 link
    And the user opens the Home form
    Then the user should be on the Home form page
    When the user fills the Home form with the requested details
    Then the Home form should show the requested values and selections
    When the user submits the Home form
    Then the success message should be displayed
