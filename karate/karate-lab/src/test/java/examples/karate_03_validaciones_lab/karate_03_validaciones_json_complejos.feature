@validaciones @val03
Feature: Validaciones JSON complejos

  # Background:
  #   * def maquinaExpendedora =
  #     """
  #     {
  #       "id": "VEND-RETRO-3000",
  #       "maquina_alias": "La joya de la feria",
  #       "estado": {
  #         "operativa": true,
  #         "altavoces_estado": "OK",
  #         "luces_incandescentes": "FUNDIDAS_PARCIAL",
  #         "voltaje_estable": true,
  #         "temperatura_interna_celsius": 22.0,
  #         "alertas": []
  #       },
  #       "inventario": {
  #         "secciones": [
  #           {
  #             "tipo": "Premios gordos",
  #             "productos": [
  #               {
  #                 "codigo": "A1",
  #                 "id_prod": "G-001",
  #                 "nombre": "Muñeca chochona",
  #                 "precio": 500,
  #                 "stock": 2
  #               },
  #               {
  #                 "codigo": "A2",
  #                 "id_prod": "G-002",
  #                 "nombre": "Radio transistor coche",
  #                 "precio": 350,
  #                 "stock": 1
  #               }
  #             ]
  #           },
  #           {
  #             "tipo": "Premios Populares",
  #             "productos": [
  #               {
  #                 "codigo": "B1",
  #                 "id_prod": "P-101",
  #                 "nombre": "Perrito piloto con gafas",
  #                 "precio": 150,
  #                 "stock": 6
  #               },
  #               {
  #                 "codigo": "B2",
  #                 "id_prod": "P-102",
  #                 "nombre": "Cigarrillos de chocolate",
  #                 "precio": 25,
  #                 "stock": 10
  #               }
  #             ]
  #           },
  #           {
  #             "tipo": "Consolación",
  #             "productos": [
  #               {
  #                 "codigo": "C1",
  #                 "id_prod": "C-501",
  #                 "nombre": "Perrito que mueve la cabeza",
  #                 "precio": 50,
  #                 "stock": 8
  #               },
  #               {
  #                 "codigo": "C2",
  #                 "id_prod": "C-503",
  #                 "nombre": "Mechero Zippo",
  #                 "precio": 10,
  #                 "stock": 0
  #               }
  #             ]
  #           }
  #         ]
  #       },
  #       "estadisticas_globales": {
  #         "stock_total_unidades": 27,
  #         "total_productos_vendidos": 1240,
  #         "recaudacion_total_pesetas": 85600,
  #         "moneda": "pst"
  #       },
  #       "mantenimiento": {
  #         "encargado": "Pepe 'El de la tómbola'",
  #         "ultima_revision": "2023-10-10",
  #         "proxima_revision_estimada": "2024-04-10",
  #         "requiere_intervencion_urgente": false
  #       }
  #     }
  #     """

  # @directos
  # Scenario: El ID de la maquina es "VEND-RETRO-3000"


  # @directos
  # Scenario: El estado de los altavoces debe ser "OK"


  # @directos
  # Scenario: La máquina no tiene ninguna alerta en este momento


  # @directos
  # Scenario: El estado de las luces incandescentes debe ser "FUNDIDAS_PARCIAL"


  # @directos
  # Scenario: En las estadísticas globales, la moneda debe ser "pst"


  # @deepscan
  # Scenario: Dentro del JSON hay un producto con el nombre "Perrito piloto con gafas"


  # @deepscan
  # Scenario: Extraer todos los códigos de la máquina en una sola lista y comprobar que el código "A1" está entre ellos


  # @deepscan
  # Scenario: Validar que todos los campos de precios son numéricos


  # @filtros
  # Scenario: Encontrar el objeto del producto cuyo código es "B1" y validar que su nombre es "Perrito piloto con gafas"


  # @filtros
  # Scenario: Obtener una lista de nombres de productos cuyo stock es igual a 0


  # @filtros
  # Scenario: Filtrar todos los productos que tengan un precio mayor a 100


  # @filtros
  # Scenario: Comprobar que hay 2 productos en la sección de "Consolación"


  # @fuzzy
  # Scenario: Validar que "ultima_revision" sigue un patrón de fecha (YYYY-MM-DD)


  # @fuzzy
  # Scenario: Validar que cada objeto dentro del array "secciones" contiene las claves "tipo" y "productos"


  # @fuzzy
  # Scenario: Comprobar que la lista de "alertas" está vacía


  # @fuzzy
  # Scenario: Comprobar que "requiere_intervencion_urgente" es un booleano y es false


  # @fuzzy
  # Scenario: Comprobar que el "total_productos_vendidos" es un número mayor que 1000
