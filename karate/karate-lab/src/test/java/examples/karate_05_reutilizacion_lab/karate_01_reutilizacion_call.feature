@reutilizacion @reut01 @call
Feature: Reutilización con call


  Scenario: Obtener todos los posts del autor del post 45 y comprobar que son 10 que van de los ids 41 al 50
    # - buscar el post 45
    * def postId = 45
    * def resultado = call read('classpath:scenarios/get-post-por-id.feature')
    # - sacar el userId
    * def userId = resultado.userId
    # - buscar los posts del userId obtenido antes
    * def resultado2 = call read('classpath:scenarios/get-post-por-usuario.feature')
    * def idsPosts = get resultado2.postsDelUsuario..id
    * print idsPosts
    * match each idsPosts == '#? _ >= 41 && _ <= 50'


  Scenario: Obtener todos los posts del autor del post 22 y comprobar que son 10 que van de los ids 21 al 30
    * def resultado = call read('classpath:scenarios/get-post.feature@id') { postId: 22 }
    * def userId = resultado.userId
    * def resultado2 = call read('classpath:scenarios/get-post.feature@userId') { userId: '#(userId)' }
    * def idsPosts = get resultado2.postsDelUsuario..id
    * print idsPosts
    * match each idsPosts == '#? _ >= 21 && _ <= 30'

  Scenario: Se puede reutilizar el currency
    * def basket1 =
      """
      {
        "elements": [
          "A",
          "B",
          "C"
        ],
        "currency": 27
      }
      """
    * match basket1 == tipos.basket