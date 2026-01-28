Feature: Obtener un post de varias formas

  @id
  Scenario: Obtener un post por Id
    Given url 'https://jsonplaceholder.typicode.com/'
    And path 'posts', postId
    When method GET
    Then status 200
    And def userId = response.userId
    And def post = response

  @userId
  Scenario: Obtener los posts de un usuario
    Given url 'https://jsonplaceholder.typicode.com/'
    And path 'posts'
    And param userId = userId
    When method GET
    Then status 200
    And def postsDelUsuario = response
