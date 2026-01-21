describe('Esperas implicitas', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4001/esperas-implicitas.html')
  })

  it('debería de aparecer el texto "Encontrado" al pulsar sobre el objetivo', async () => {
    await $('[data-test="boton-aparecer-perezoso"]').click()

    const divPerezoso = await $('[data-test="texto-perezoso"]')

    await expect(divPerezoso).toBeDisplayed()
    await expect(divPerezoso).toHaveText('Aparecí después de 5 segundos!')
  })

})