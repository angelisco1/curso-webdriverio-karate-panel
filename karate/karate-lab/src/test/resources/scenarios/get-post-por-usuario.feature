Feature: Obtener los posts de un usuario

  Scenario: Obtener los posts de un usuario
    Given url 'https://jsonplaceholder.typicode.com/'
    And path 'posts'
    And param userId = userId
    When method GET
    Then status 200
    And def postsDelUsuario = response
