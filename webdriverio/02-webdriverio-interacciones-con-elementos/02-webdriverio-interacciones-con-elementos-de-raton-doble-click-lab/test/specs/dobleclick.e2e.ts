describe('Página del doble click', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4002/doble-click.html')
  })

  it('debería cambiar de azul a amarillo al hacer doble click en la caja', async () => {
    const caja = await $('#caja-doble-click')
    await expect(caja).toHaveStyle({ 'background-color': 'rgba(0,0,255,1)' })

    caja.doubleClick()

    await expect(caja).toHaveStyle({ 'background-color': 'rgba(255,255,0,1)' })
  })

})