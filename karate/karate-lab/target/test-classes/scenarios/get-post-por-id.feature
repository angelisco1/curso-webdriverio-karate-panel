Feature: Obtener un post dado su identificador

  Scenario: Obtener un post por Id
    Given url 'https://jsonplaceholder.typicode.com/'
    And path 'posts', postId
    When method GET
    Then status 200
    And def userId = response.userId
    And def post = response
