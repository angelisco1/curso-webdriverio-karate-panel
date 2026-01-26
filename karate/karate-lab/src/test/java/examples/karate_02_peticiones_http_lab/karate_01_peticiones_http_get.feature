@peticiones @http01
Feature: Peticiones HTTP GET

  Background:
    * def utils = read('classpath:utils/utils.js')
    * def utils2 = read('classpath:utils/utils2.js')

  Scenario: Hola mundo desde Karate
    Given url 'http://localhost:4001/api/hola'
    When method GET
    Then status 200
    And match response.mensaje == '#string'
    And match response.mensaje == 'Hola Mundo desde Karate!!!'


  Scenario: Saludar con un nombre específico (con path separado)
    Given url 'http://localhost:4001'
    And def nombre = 'Charly'
    And path 'api', 'saludar', nombre
    When method GET
    Then status 200
    And match response.mensaje == 'Hola ' + nombre + '!'


  Scenario: Saludar con un nombre específico
    Given url 'http://localhost:4001'
    And def nombre = 'Kozinski'
    And path 'api/saludar/' + nombre
    When method GET
    Then status 200
    And match response.mensaje == 'Hola ' + nombre + '!'


  Scenario: Al obtener un post específico, obtenemos un código 200 y el post es el que esperamos
    Given url 'https://jsonplaceholder.typicode.com/'
    And def postId = utils.generateRandomId()
    And path 'posts', postId
    When method GET
    Then status 200
    And response.id == postId

  Scenario: Al obtener un post específico, obtenemos un código 200 y el post es el que esperamos
    Given url 'https://jsonplaceholder.typicode.com/'
    And def postId = utils2.generateRandomId()
    And path 'posts', postId
    When method GET
    Then status 200
    And response.id == postId

  Scenario: Obtenemos 10 posts al buscar los posts del usuario 3
    Given url 'https://jsonplaceholder.typicode.com/'
    And def userId = 3
    And path 'posts'
    And param userId = 3
    # And params {userId: 3}
    When method GET
    Then status 200
    And response.length == 10
    And karate.sizeOf(response) == 10
    # And response == '#array'
    # And response == '#[10]'
