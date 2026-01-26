@peticiones @http02
Feature: Peticiones HTTP POST

  Background:
    * url 'https://jsonplaceholder.typicode.com/'
    * def postACrear =
      """
        {
          "userId": 7,
          "title": "Aumenta la venta de pitos y flautas",
          "body": "Bla bla bla..."
        }
      """

  Scenario: Al crear un nuevo post, obentemos un código 201 y el id del post es mayor a 100
    Given path 'posts'
    And request postACrear
    When method POST
    Then status 201
    And response.id > 100

  # Scenario: Al crear un nuevo post, obentemos un código 201 y el id del post es mayor a 100


  # Scenario: Al crear un nuevo post, obentemos un código 201 y el id del post es mayor a 100


  # Scenario: Al crear un nuevo post, obtenemos un código 201 y el id del post es mayor a 100
