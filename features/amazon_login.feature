Feature: Amazon account login

  Background:
    Given the user opens the Amazon home page
    When the user signs in to Amazon with credentials from the environment
    Then the Amazon account greeting should be visible

  Scenario: Add an Apple iPhone to the cart and proceed to buy
    Then the Amazon sign-in prompt should no longer be visible
    When the user clicks the Mobiles link
    And the user selects Apple from the Brands filter
    Then the Apple-filtered products should be displayed
    When the user adds the Apple iPhone 16 to the cart
    And the user opens the cart
    And the user clicks Proceed to Buy and waits for the page to load
    And the user closes the page
