Feature: Conceptos básicos de Karate

  Background:
    * def sumar =
      """
      function(n1, n2) {
        return n1 + n2
      }
      """

  Scenario: Uso de variables y aserciones
    * def nombre = 'Charly'
    * def apellido = 'Falco'
    * def hobbies = ['series', 'cine', 'correr']
    * match nombre == 'Charly'
    * match apellido == '#string'
    * match hobbies == '#array'
    * match hobbies == '#[3]'

  Scenario: La función suma debería poder sumar dos números positivos
    * def resultado = sumar(2, 3)
    * match resultado == 5

  Scenario: La función suma debería poder sumar dos números negativos
    * def resultado = sumar(-2, -3)
    * match resultado == -5

  Scenario: La función suma debería poder sumar un número con el 0
    Given def n1 = 10
    And def n2 = 0
    When def resultado = sumar(n1, n2)
    Then match resultado == 10
    And match resultado == '#number'
