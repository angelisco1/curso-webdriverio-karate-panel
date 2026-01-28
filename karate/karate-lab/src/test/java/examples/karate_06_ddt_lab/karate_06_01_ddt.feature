@ddt @ddt01
Feature: DDT con la API de JSON Placeholder cargando los datos de una tabla

  Background:
    * url 'https://jsonplaceholder.typicode.com/'

  Scenario Outline: Buscar usuario por id
    Given path '/users', '<id>'
    When method GET
    Then status 200
    And match response.name == '<nombre>'


  Examples:
    | id | nombre |
    | 1  | Leanne Graham |
    | 2  | Ervin Howell |
    | 3  | Clementine Bauch |
    | 4  | Patricia Lebsack |
    | 5  | Chelsey Dietrich |
