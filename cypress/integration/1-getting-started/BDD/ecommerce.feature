Feature: Ecommerce website end to end test

    Web application used for shopping mobile phones
    @Regression
    Scenario: Validate user is able to shop for mobile phone and place home delivery order
        Given I open application
        When I add items in the cart
        And remove an item from the cart
        And validate the total price
        Then i am place to place order successfully
    @Smoke
    Scenario: Validate new user can signup successfully
        Given I open application
        When I click the homelink
        And Enter the user details and submit the form
            | name | email  | password |
            | abc  | s@s.in | abc@123  |
        Then I am able to register successfully
