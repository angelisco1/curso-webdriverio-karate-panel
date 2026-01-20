describe('Tabla w3schools', () => {
  beforeEach(async () => {
    await browser.url('https://www.w3schools.com/html/html_tables.asp')
  })

  it('debería de tener 7 filas la primera tabla', async () => {
    const tabla = await $('#customers')
    const filas = await tabla.$$('tr')
    await expect(filas).toHaveLength(7)
  })

  it('deberían de tener contenido todas las celdas de la tabla', async () => {
    const celdasTabla = await $$('#customers td')

    // TODO: revisar
    // for (let celda of celdasTabla) {
    //   const textoCelda = await celda.getText()
    //   console.log('textoCelda', textoCelda)
    //   await expect(textoCelda).not.toBe('')
    // }

    celdasTabla.forEach(async (celda) => {
      const textoCelda = await celda.getText()
      console.log('textoCelda', textoCelda)
      await expect(textoCelda).not.toBe('')
      await expect(textoCelda).toBeDefined()
    })
  })
})