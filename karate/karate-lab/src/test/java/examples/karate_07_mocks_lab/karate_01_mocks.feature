@mocks
Feature: Ejemplos de Mocks en Karate con JSONPlaceholder

  Background:
    * def server = karate.start('classpath:mocks/jsonplaceholder-mock.feature')
    * url 'http://localhost:' + server.port


  Scenario: Obtener un post mockeado
    Given path 'posts', 1
    When method GET
    Then match response.id == 1
    And match response.userId == 10
    And match response.title == "Un título cualquiera"


  Scenario: Obtener posts de un usuario específico
    Given path 'posts'
    And param userId = 9
    When method GET
    Then match response == '#[2]'
    Then match each response..id == '#? _ == 12 || _ == 18'

  Scenario: Crear un nuevo post y verificar la respuesta mockeada
    Given path 'posts'
    And def title = 'Un nuevo post'
    And request
      """
        {
          "title": #(title),
          "body": "El body de un nuevo post",
          "userId": 12
        }
      """
    When method POST
    Then status 201
    And match response.id == 110
    And match response.title == title


  Scenario: Eliminar un post
    Given path 'posts', 5
    When method DELETE
    Then status 204
    And match response == ''


  Scenario: Obtener un usuario con datos dinámicos según el ID
    Given def userId = 12
    And path 'users', userId
    When method GET
    Then status 200
    And match response.id == userId
    And match response.name == 'Charly Falco'
