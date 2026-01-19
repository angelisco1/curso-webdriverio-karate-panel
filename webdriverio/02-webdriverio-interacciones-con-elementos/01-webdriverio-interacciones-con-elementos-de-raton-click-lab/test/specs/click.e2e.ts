describe('Página del código secreto', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4001/click.html')
  })

  it('debería aparecer "CODE OK" al introducir el código correcto (6710)', async () => {
    const tecla6 = await $('#p6')
    await tecla6.click()

    await $('#p7').click()
    await $('#p1').click()
    await $('#p0').click()

    const pantallaCodigo = await $('#pantalla-codigo')
    await expect(pantallaCodigo).toHaveText('CODE OK')
  })

  it('debería eliminar los números introducidos al pulsar la tecla CLD', async () => {
    await $('#p7').click()
    await $('#p1').click()
    await $('#p0').click()

    await $('#pclear').click()

    const textoPantalla = await $('#pantalla-codigo').getText()
    await expect(textoPantalla).toEqual('')
  })
})