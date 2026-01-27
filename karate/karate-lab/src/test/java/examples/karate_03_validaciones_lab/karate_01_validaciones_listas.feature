@validaciones @listas @val01
Feature: Validaciones de listas de datos

  Background:
    * def agentes =
    """
    [
      {
        id: 1,
        nombre: "Charles Falco",
        email: "falco@atf.gov",
        edad: 55,
        activo: false,
        organizaciones: ["Vagos MC", "Mongols MC"],
        añosServicio: 3,
        agencia: "ATF",
        identidadEncubierta: "Charles Falco",
        casosPrincipales: ["Operación 22 Green"]
      },
      {
        id: 2,
        nombre: "Joseph Pistone",
        email: "pistone@fbi.gov",
        edad: 85,
        activo: false,
        organizaciones: ["Bonanno Crime Family", "Colombo Crime Family"],
        añosServicio: 6,
        agencia: "FBI",
        identidadEncubierta: "Donnie Brasco",
        casosPrincipales: ["Infiltración Mafia NYC"]
      },
      {
        id: 3,
        nombre: "William Queen",
        email: "queen@atf.gov",
        edad: 70,
        activo: false,
        organizaciones: ["Mongols MC"],
        añosServicio: 2,
        agencia: "ATF",
        identidadEncubierta: "Billy St. John",
        casosPrincipales: ["Operación Black Rain"]
      },
      {
        id: 4,
        nombre: "Jay Dobyns",
        email: "dobyns@atf.gov",
        edad: 60,
        activo: true,
        organizaciones: ["Hells Angels MC", "Solo Angeles"],
        añosServicio: 4,
        agencia: "ATF",
        identidadEncubierta: "Jay Bird Davis",
        casosPrincipales: ["Operación Black Biscuit"]
      },
      {
        id: 5,
        nombre: "Alex Caine",
        email: "caine@rcmp.ca",
        edad: 65,
        activo: false,
        organizaciones: ["Hells Angels MC", "Bandidos MC", "Rock Machine"],
        añosServicio: 5,
        agencia: "RCMP",
        identidadEncubierta: "Alex Atwell",
        casosPrincipales: ["Operación Springtime", "Operación Amigo"]
      }
    ]
    """

  Scenario: Comprobar que la lista tiene 5 agentes
    * match agentes == '#[5]'
    * match karate.sizeOf(agentes) == 5


  Scenario: Comprobar que la información de "Charles Falco" es correcta accediendo por el índice
    * def charly = agentes[0]
    * match charly.nombre == 'Charles Falco'
    * match charly.email == 'falco@atf.gov'


  Scenario: Buscar el agente "Joseph Pistone" por su correo
    * def pistone = agentes.find(agente => agente.email === 'pistone@fbi.gov')
    * match pistone.nombre == 'Joseph Pistone'
    * match pistone.email == 'pistone@fbi.gov'


  Scenario: Comprobar que solo queda 1 agente en activo
    * def agentesActivos = agentes.filter(ag => ag.activo)
    * match agentesActivos == '#[1]'
    * match (agentesActivos.length) == 1


  Scenario: Validar que todos los agentes tienen un identificador superior a 0
    * def agentesConIdMayor = agentes.filter(ag => ag.id > 0)
    * match agentesConIdMayor == '#[5]'


  # Scenario: Validar que existe un agente del FBI


  Scenario: Validar que cada agente tiene la estructura de datos correcta
    * match each agentes ==
      """
      {
        id: '#number',
        nombre: '#string',
        email: '#string',
        edad: '#number',
        activo: '#boolean',
        organizaciones: '#array',
        añosServicio: '#number',
        agencia: '#string',
        identidadEncubierta: '#string',
        casosPrincipales: '#array'
      }
      """


  Scenario: Validar que los emails no se repiten
    * def aparicionesEmails = {}
    * agentes.forEach(ag => aparicionesEmails[ag.email] = (aparicionesEmails[ag.email] || 0) + 1)
    * print aparicionesEmails
    * def repeticiones = Object.values(aparicionesEmails)
    * def emailsUnicos = repeticiones.filter(rep => rep === 1)
    * match emailsUnicos == '#[5]'

  Scenario: Validar que los emails no se repiten
    * def aparicionesEmails =
      """
        agentes.reduce((acc, ag) => {
          return {
            ...acc,
            [ag.email]: (acc[ag.email] || 0) + 1
          }
        }, {})
      """
    * print aparicionesEmails
    * def repeticiones = Object.values(aparicionesEmails)
    * def emailsUnicos = repeticiones.filter(rep => rep === 1)
    * match emailsUnicos == '#[5]'

  Scenario: Contar los agentes que tienen más de 60 años
    * def mayores60 =
      """
        agentes.reduce((acc, ag) => {
          if (ag.edad > 60) {
            return acc + 1
          }
          return acc
        }, 0)
      """
    * print mayores60
    * match mayores60 == 3

  # Scenario: Comprobar que no hay ningún agente menor de 50 años


  Scenario: Comprobar que todos los agentes tienen entre 50 y 100 años
    * def edades = agentes.map(ag => ag.edad)
    * match each edades == '#? _ > 50 && _ < 100'


  Scenario: Comprueba que hay 4 agentes inactivos (con JSON Path)
    * def agentesInactivos = karate.jsonPath(agentes, '$[?(@.activo == false)]')
    * match agentesInactivos == '#[4]'


  # Scenario: Comprueba que al menos todos los agentes se infiltraron en al menos una organización
  #   * def agentesInfiltrados = karate.jsonPath(agentes, '$[?(length(@.organizaciones) >= 1)]')
  #   * print agentesInfiltrados
  #   * match agentesInfiltrados == '#[5]'


  # Scenario: Comprueba que hay 2 agentes que están en activo o que han estado en servicio durante 3 o más años


  Scenario: Comprobar que los agentes pueden tener la propiedad condecoraciones o no tenerla al ser opcional
    * def agentesExtendidos =
    """
    [
      { id: 6, nombre: "Test Agent", email: "test@dea.gov", edad: 45, activo: true, organizaciones: ["Test Org"], añosServicio: 1, agencia: "DEA", identidadEncubierta: "John Doe", casosPrincipales: ["Operación Test"], condecoraciones: null },
      { id: 7, nombre: "Test Agent 2", email: "test2@atf.gov", edad: 40, activo: true, organizaciones: ["Test Org 2"], añosServicio: 2, agencia: "ATF", identidadEncubierta: "Jane Doe", casosPrincipales: ["Operación Test 2"] }
    ]
    """

    * match agentesExtendidos[0] contains { condecoraciones: '#null' }
    * match agentesExtendidos[1] contains { condecoraciones: '#notpresent' }
    * def condecoracionesOpcional = agentesExtendidos.some(ag => Object.keys(ag).includes('condecoraciones'))
    * print condecoracionesOpcional
    * assert condecoracionesOpcional == true


  Scenario: Obtener la lista de agentes pero solo con el nombre y la agencia y comprobar que ambas propiedades son strings
    * def datosAgentes = agentes.map(ag => ({nombre: ag.nombre, agencia: ag.agencia}))
    * match each datosAgentes ==
      """
      {
        nombre: '#string',
        agencia: '#string'
      }
      """


  # Scenario: Comprueba que la lista de nombres contiene a "Charles Falco" pero no a "Agente Inexistente"


  # Scenario: Comprueba que "Charles Falco" se infiltró exactamente en 2 organizaciones y "William Queen" en 1


  # Scenario: Comprueba que hay 3 agentes del ATF, 1 del FBI y 1 del RCMP
