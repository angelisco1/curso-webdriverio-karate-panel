describe('Búsquedas por texto', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:3003/tienda3000-v1.html')
  })

  it('debería encontrar el título', async () => {
    const titulo = await $('=Tienda 3000')
    await expect(titulo).toHaveText('Tienda 3000')
  })

  it('debería encontrar el título', async () => {
    const tituloAuriculares = await $('*=Auriculares Sony')
    await expect(tituloAuriculares).toHaveText('Auriculares Sony WH-1000XM5')
  })
})