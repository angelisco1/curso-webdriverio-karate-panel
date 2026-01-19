describe('Página de modales', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:4010/modales.html')
  })

  it('debería de dejar de mostrarse el modal al pulsar sobre el backdrop', async () => {
    const botonAbrirModal = await $('#btn-modal')
    await botonAbrirModal.click()

    const modal = await $('#modal')
    await expect(modal).toBeDisplayed()

    await browser.action('pointer').move({x: 0, y: 350}).down().perform()
    // await browser.keys('Escape')

    await expect(modal).not.toBeDisplayed()
    await expect(botonAbrirModal).toBeEnabled()
  })

  it('debería de dejar de mostrarse el modal al pulsar en "Guardar" y aparecer un toast con el texto "Cambios guardados correctamente"', async () => {
    const notificacion = $('#notificacion')

    await expect(notificacion).not.toBeDisplayed()

    const botonAbrirModal = await $('#btn-modal')
    await botonAbrirModal.click()

    await $('#btn-guardar-modal').click()

    await expect(notificacion).toBeDisplayed()
  })

})