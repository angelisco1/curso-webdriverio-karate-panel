describe('iFrames', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4001/tienda3000.html')
  })

  it('debería de mostrar un mensaje "Pago completado!" si introduces los datos de pago correctos', async () => {
    await $('[name="nombre"]').setValue('Charly Falco')
    await $('[name="direccion"]').setValue('C/ Inventada, Nº 29')
    await $('form button[type="submit"]').click()

    const iframePagalo = await $('iframe')
    await browser.switchFrame(iframePagalo)

    await $('#numero-tarjeta').setValue('1234 1234 0987 0987')
    await $('#caducidad').setValue('23/39')
    await $('#cvc').setValue('123')

    await $('#boton-enviar').click()

    await browser.switchToParentFrame()

    const mensaje = await $('#mensaje-pago-completo h2')
    await expect(mensaje).toHaveText('Pago completado!')
  })

  it('debería de mostrar un mensaje "El pago ha sido rechazado por su entidad bancaria." si introduces los datos de pago erroneos', async () => {
    await $('[name="nombre"]').setValue('Charly Falco')
    await $('[name="direccion"]').setValue('C/ Inventada, Nº 29')
    await $('form button[type="submit"]').click()

    const iframePagalo = await $('iframe')
    await browser.switchFrame(iframePagalo)

    await $('#numero-tarjeta').setValue('1234 1234 0987 0987')
    await $('#caducidad').setValue('23/12')
    await $('#cvc').setValue('123')

    await $('#boton-enviar').click()

    await browser.switchToParentFrame()

    const mensaje = await $('#texto-error')
    await expect(mensaje).toHaveText('El pago ha sido rechazado por su entidad bancaria.')
  })

})