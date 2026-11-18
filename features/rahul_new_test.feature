Feature: Rahul Shetty Academy new shop test

  Background:
    Given the user opens the Rahul Shetty Academy login page
    When the user signs in with credentials entered in the terminal
    Then the user should be redirected to the shop page

  Scenario: Add Blackberry to the cart and complete checkout
    When the user adds Blackberry to the cart
    And the user proceeds through Checkout to the delivery form
    And the user fills Hyderabad as the delivery location, accepts the terms, and purchases
    Then the purchase success message should be displayed
    And the user waits 4 seconds before closing the page
