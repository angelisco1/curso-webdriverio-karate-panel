@validaciones @listas @val01
Feature: Validaciones de listas de datos

  # Background:
  #   * def agentes =
  #   """
  #   [
  #     {
  #       id: 1,
  #       nombre: "Charles Falco",
  #       email: "falco@atf.gov",
  #       edad: 55,
  #       activo: false,
  #       organizaciones: ["Vagos MC", "Mongols MC"],
  #       añosServicio: 3,
  #       agencia: "ATF",
  #       identidadEncubierta: "Charles Falco",
  #       casosPrincipales: ["Operación 22 Green"]
  #     },
  #     {
  #       id: 2,
  #       nombre: "Joseph Pistone",
  #       email: "pistone@fbi.gov",
  #       edad: 85,
  #       activo: false,
  #       organizaciones: ["Bonanno Crime Family", "Colombo Crime Family"],
  #       añosServicio: 6,
  #       agencia: "FBI",
  #       identidadEncubierta: "Donnie Brasco",
  #       casosPrincipales: ["Infiltración Mafia NYC"]
  #     },
  #     {
  #       id: 3,
  #       nombre: "William Queen",
  #       email: "queen@atf.gov",
  #       edad: 70,
  #       activo: false,
  #       organizaciones: ["Mongols MC"],
  #       añosServicio: 2,
  #       agencia: "ATF",
  #       identidadEncubierta: "Billy St. John",
  #       casosPrincipales: ["Operación Black Rain"]
  #     },
  #     {
  #       id: 4,
  #       nombre: "Jay Dobyns",
  #       email: "dobyns@atf.gov",
  #       edad: 60,
  #       activo: true,
  #       organizaciones: ["Hells Angels MC", "Solo Angeles"],
  #       añosServicio: 4,
  #       agencia: "ATF",
  #       identidadEncubierta: "Jay Bird Davis",
  #       casosPrincipales: ["Operación Black Biscuit"]
  #     },
  #     {
  #       id: 5,
  #       nombre: "Alex Caine",
  #       email: "caine@rcmp.ca",
  #       edad: 65,
  #       activo: false,
  #       organizaciones: ["Hells Angels MC", "Bandidos MC", "Rock Machine"],
  #       añosServicio: 5,
  #       agencia: "RCMP",
  #       identidadEncubierta: "Alex Atwell",
  #       casosPrincipales: ["Operación Springtime", "Operación Amigo"]
  #     }
  #   ]
  #   """

  # Scenario: Comprobar que la lista tiene 5 agentes


  # Scenario: Comprobar que la información de "Charles Falco" es correcta accediendo por el índice


  # Scenario: Buscar el agente "Joseph Pistone" por su correo


  # Scenario: Comprobar que solo queda 1 agente en activo


  # Scenario: Validar que todos los agentes tienen un identificador superior a 0


  # Scenario: Validar que existe un agente del FBI


  # Scenario: Validar que cada agente tiene la estructura de datos correcta


  # Scenario: Validar que los emails no se repiten


  # Scenario: Contar los agentes que tienen más de 60 años


  # Scenario: Comprobar que no hay ningún agente menor de 50 años


  # Scenario: Comprobar que todos los agentes tienen entre 50 y 100 años


  # Scenario: Comprueba que hay 4 agentes inactivos (con JSON Path)


  # Scenario: Comprueba que al menos todos los agentes se infiltraron en al menos una organización


  # Scenario: Comprueba que hay 2 agentes que están en activo o que han estado en servicio durante 3 o más años


  # Scenario: Comprobar que los agentes pueden tener la propiedad condecoraciones o no tenerla al ser opcional
  #   * def agentesExtendidos =
  #   """
  #   [
  #     { id: 6, nombre: "Test Agent", email: "test@dea.gov", edad: 45, activo: true, organizaciones: ["Test Org"], añosServicio: 1, agencia: "DEA", identidadEncubierta: "John Doe", casosPrincipales: ["Operación Test"], condecoraciones: null },
  #     { id: 7, nombre: "Test Agent 2", email: "test2@atf.gov", edad: 40, activo: true, organizaciones: ["Test Org 2"], añosServicio: 2, agencia: "ATF", identidadEncubierta: "Jane Doe", casosPrincipales: ["Operación Test 2"] }
  #   ]
  #   """

  # Scenario: Obtener la lista de agentes pero solo con el nombre y la agencia y comprobar que ambas propiedades son strings


  # Scenario: Comprueba que la lista de nombres contiene a "Charles Falco" pero no a "Agente Inexistente"


  # Scenario: Comprueba que "Charles Falco" se infiltró exactamente en 2 organizaciones y "William Queen" en 1


  # Scenario: Comprueba que hay 3 agentes del ATF, 1 del FBI y 1 del RCMP
