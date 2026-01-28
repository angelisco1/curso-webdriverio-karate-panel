Feature: Mock de JSONPlaceholder

  Background:

  # Ejemplo 1: Mock básico - Respuesta fija para GET /posts/1
  Scenario: methodIs('get') && pathMatches('/posts/1')
    * def response =
      """
        {
          "id": 1,
          "title": "Un título cualquiera",
          "body": "Un post cualquiera",
          "userId": 10
        }
      """

  # Ejemplo 2: Mock con filtrado - GET /posts con query param userId
  Scenario: methodIs('get') && pathMatches('/posts') && paramExists('userId')
    * def userId = Number(paramValue('userId'))
    * def response =
      """
        [
          {
            "id": 12,
            "title": "Un título cualquiera 12",
            "body": "Un post cualquiera 12",
            "userId": #(userId)
          },
          {
            "id": 18,
            "title": "Un título cualquiera 18",
            "body": "Un post cualquiera 18",
            "userId": #(userId)
          }
        ]
      """

  # Ejemplo 3: Mock para POST - Crear un nuevo post
  Scenario: methodIs('post') && pathMatches('/posts')
    * def responseStatus = 201
    * def post = request
    * def response =
      """
        {
          "id": 110,
          "title": #(post.title),
          "body": #(post.body),
          "userId": #(post.userId),
        }
      """

  # Ejemplo 4: Mock para DELETE - Eliminar un post
  Scenario: methodIs('delete')
    * def responseStatus = 204
    * def response = null

  # Ejemplo 5: Mock con respuesta dinámica - GET /users/{id}
  Scenario: methodIs('get') && pathMatches('/users/{id}')
    * def userId = Number(pathParams.id)
    * def response =
      """
        {
          "id": #(userId),
          "name": "Charly Falco",
          "username": "cfalco",
          "email": "cfalco@gmail.com",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        }
      """

  # Escenario por defecto para peticiones no contempladas
  Scenario:
