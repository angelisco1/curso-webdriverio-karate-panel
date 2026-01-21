describe('Shadow DOM', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4002/shadow-dom.html')
  })

  it('debería de mostrar "Te la acabo de enviar. ¿Necesitas algo más?" cuando pedimos la factura por email', async () => {
    const texto1 = 'No he recibido en el email la última factura'
    const texto2 = 'Email'

    await $('aplicacion-soporte').$('chats-soporte').$('[data-test="elemento-chat-3"]').click()


    const input = await $('aplicacion-soporte').$('conversacion-chat').$('input-mensaje').$('input')
    await input.setValue(texto1)

    const boton = await $('aplicacion-soporte').$('conversacion-chat').$('input-mensaje').$('button')
    await boton.click()

    await browser.waitUntil(async () => {
      const mensajes = await $('aplicacion-soporte').$('conversacion-chat').$$('mensaje-chat')
      return await mensajes.length > 2
    })

    await input.setValue('Email')
    await boton.click()

    await browser.waitUntil(async () => {
      const mensajes = await $('aplicacion-soporte').$('conversacion-chat').$$('mensaje-chat')
      return await mensajes.length > 4
    })

    const mensajes = await $('aplicacion-soporte').$('conversacion-chat').$$('mensaje-chat')
    const ultimoMensaje = mensajes[await mensajes.length - 1]
    const textoMensaje = await ultimoMensaje.$('[data-test="texto-mensaje"]')
    await expect(textoMensaje).toHaveText('Te la acabo de enviar. ¿Necesitas algo más?')
  })

})