@ddt @ddt03
Feature: DDT con la API de JSON Placeholder cargando los datos de un CSV

  Background:
    * url 'https://jsonplaceholder.typicode.com/'

  Scenario Outline: Buscar usuario por id '<id>'
    Given path '/users', '<id>'
    When method GET
    Then status 200
    And match response.name == '<nombre>'


  Examples:
    | read('classpath:ddt/usuarios.csv') |
