describe('Comandos waitFor', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4003/comandos-wait.html')
  })

  it('debería de crear dos elementos al pulsar el botón', async () => {
    await $('[data-test="boton-agregar-dom"]').click()

    const divDinamico = await $('[data-test="elemento-dinamico"]')
    const divOculto = await $('[data-test="elemento-oculto"]')

    await divDinamico.waitForDisplayed({ timeout: 3300 })
    await divOculto.waitForExist({ timeout: 3300 })

    await expect(divDinamico).toHaveText('He sido inyectado en el DOM!')

    const texto = await divOculto.getProperty('innerText')
    await expect(texto).toBe('Estoy en el DOM pero oculto!')
  })

})