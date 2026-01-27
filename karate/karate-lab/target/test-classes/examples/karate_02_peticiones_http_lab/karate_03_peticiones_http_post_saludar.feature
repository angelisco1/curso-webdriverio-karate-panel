@peticiones @http03
Feature: API saludo

  Background:
    * url 'http://localhost:4001'

  Scenario: debería devolver un saludo en inglés cuando se envia un nombre e idioma 'en'
    Given path 'api/saludo'
    And request { "nombre": "Charly", "idioma": "en" }
    When method POST
    Then status 201
    And response.mensaje == "Hello Charly!"