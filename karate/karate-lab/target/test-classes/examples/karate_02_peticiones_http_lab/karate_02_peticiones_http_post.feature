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
    * def getTimestamp =
      """
        function() {
          return Date.now() + ''
        }
      """
    * def getRandomUserId =
      """
        function() {
          return Math.floor(Math.random() * 10) + 1
        }
      """

  Scenario: Al crear un nuevo post, obtenemos un código 201 y el id del post es mayor a 100
    Given path 'posts'
    And request postACrear
    When method POST
    Then status 201
    And response.id > 100

  Scenario: Al crear un nuevo post, obtenemos un código 201 y el id del post es mayor a 100
    Given path 'posts'
    And def randomUserId = getRandomUserId()
    And request
      """
      {
        "userId": #(randomUserId),
        "title": #( getTimestamp() + ' - Título del post' ),
        "body": "Bla bla bla..."
      }
      """
    When method POST
    Then status 201
    And response.id == 101
    And response.userId == randomUserId


  Scenario: Al crear un nuevo post, obtenemos un código 201 y el id del post es mayor a 100
    Given path 'posts'
    And def randomUserId = getRandomUserId()
    And set postACrear.userId = randomUserId
    And set postACrear.title = 'Título nuevo'
    And request postACrear
    When method POST
    Then status 201
    And response.id == 101
    And response.userId == randomUserId
