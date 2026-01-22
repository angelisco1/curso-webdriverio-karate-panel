describe('Mocks - Intercept', () => {


  it('debería de mostrar que estoy en Harlan', async () => {
    const coords = {latitude: 36.848044, longitude: -83.320589}

    const restaurarUbicacion = await browser.emulate('geolocation', coords)

    await browser.url('http://localhost:4003/')
    await $('#btn-ubicacion').click()

    const ciudad = $('#ciudad')
    await expect(ciudad).toHaveText('Harlan')

    await restaurarUbicacion()
  })

  // it('debería de aparecer un 6 cuando nieva', async () => {
  //   await browser.url('http://localhost:4003/')
  //   await $('#btn-ubicacion').click()

  //   const ciudad = $('#ciudad')
  //   await expect(ciudad).toHaveText('Una ciudad cualquiera...')
  // })
})