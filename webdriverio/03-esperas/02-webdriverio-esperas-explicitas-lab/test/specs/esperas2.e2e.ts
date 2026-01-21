describe('Esperas explicitas', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4002/esperas-explicitas.html')
  })

  it('debería de aparecer el texto "Encontrado" al pulsar sobre el objetivo', async () => {
    await $('[data-test="boton-aparecer-perezoso"]').click()

    const divPerezoso = await $('[data-test="texto-perezoso"]')

    await browser.waitUntil(async () => {
      return await divPerezoso.isDisplayed()
    }, { timeout: 6000 })

    await expect(divPerezoso).toBeDisplayed()
    await expect(divPerezoso).toHaveText('Aparecí después de 5 segundos!')
  })

  it('debería pasar por los estados "Procesando..." y "Proceso completado" en un tiempo de unos 3 segundos por estado', async () => {
    await $('[data-test="boton-cambiar-texto"]').click()

    const estadoDiv = await $('[data-test="estado-proceso"]')

    await browser.waitUntil(async () => {
      const texto = await estadoDiv.getText()
      return texto !== 'En espera...'
    }, { timeout: 3500 })

    await expect(estadoDiv).toHaveText('Procesando...')

    await browser.waitUntil(async () => {
      const texto = await estadoDiv.getText()
      return texto !== 'Procesando...'
    }, { timeout: 3500 })

    await expect(estadoDiv).toHaveText('Proceso completado')
  })

  it('debería habilitarse el botón en unos 3 segundos después de pulsar el otro botón', async () => {
    await $('[data-test="boton-activar"]').click()
    const botonAccion = await $('[data-test="boton-accion"]')

    await browser.waitUntil(async () => {
      return botonAccion.isEnabled()
    }, { timeout: 3500 })

    await expect(botonAccion).toBeEnabled()
    await expect(botonAccion).toHaveText('Acción disponible!')
  })

})