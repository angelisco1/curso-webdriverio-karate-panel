describe('Página de desplegables', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4011/scroll.html')
  })

  it('debería de aparecer el texto "Encontrado" al pulsar sobre el objetivo', async () => {
    const target = await $('#target')

    await expect(target).toBeDisplayed()
    await expect(target).not.toBeDisplayedInViewport()

    await target.scrollIntoView()

    await target.click()
    await expect(target).toBeDisplayedInViewport()

    const textoBuscado = await $('#mensaje')
    await expect(textoBuscado).toHaveText('Encontrado!')
  })

})