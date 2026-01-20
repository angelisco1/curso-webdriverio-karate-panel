describe('Tablas dinámicas', () => {
  beforeEach(async () => {
    await browser.url('http://127.0.0.1:4014/tablas-dinamicas.html')
  })

  it('debería ordenar la tabla por nombre al pulsar en la cabecera de "Nombre acción"', async () => {
    const celdasPrimeraColumna = await $$('#tablaTransacciones tbody tr td:first-child')
    const nombresAcciones = await celdasPrimeraColumna.map((celda) => celda.getText())

    await $('[data-sort="nombre"]').click()

    const celdasPrimeraColumnaOrdenadas = await $$('#tablaTransacciones tbody tr td:first-child')
    const nombresOrdenados = await celdasPrimeraColumnaOrdenadas.map((celda) => celda.getText())

    await expect(nombresAcciones.sort()).toEqual(nombresOrdenados)
  })

  it('debería tener la clase "positivo" si el resultado es positivo', async () => {
    const filasTabla = await $$('#tablaTransacciones tbody tr')

    const filaAmazon: WebdriverIO.Element = await filasTabla.find(async (fila) => {
      const textoFila = await fila.getText()
      return textoFila.includes('Amazon')
    })

    const celdaGanancias = await filaAmazon.$('td:nth-child(6)')
    // console.log('---------')
    // console.log('---------')
    // console.log('---------')
    // console.log('---------')
    // const celdaGananciasTexto = await celdaGanancias.getText()
    // console.log(celdaGananciasTexto)
    // console.log('---------')
    // console.log('---------')
    // console.log('---------')
    // console.log('---------')
    // await browser.pause(3000)

    await expect(celdaGanancias).toHaveElementClass('positivo')
  })

  it('debería mostrar el total en verde si es positivo y en rojo si es negativo', async () => {
    const filas = await $$('#tablaTransacciones tbody tr')

    for (const fila of filas) {

      const columnas = await fila.$$('td')
      const celda = await columnas[5]
      const total = await celda.getText()
      // '$100.00' -> '100.00'
      const totalNum = Number(total.replace('$', ''))
      if (totalNum >= 0) {
        await expect(celda).toHaveElementClass('positivo')
      } else {
        await expect(celda).toHaveElementClass('negativo')
      }

    }
  })

  it('debería tener las cuentas de perdidas/ganancias bien hechas', async () => {
    const filas = await $$('#tablaTransacciones tbody tr')

    for (const fila of filas) {
      const columnas = await fila.$$('td')

      const celdaCantidad = await columnas[2]
      const cantidad = await celdaCantidad.getText()
      const cantidadNum = Number(cantidad)

      const celdaCompra = await columnas[3]
      const precioCompra = await celdaCompra.getText()
      const precioCompraNum = Number(precioCompra.replace('$', ''))

      const celdaVenta = await columnas[4]
      const precioVenta = await celdaVenta.getText()
      const precioVentaNum = Number(precioVenta.replace('$', ''))

      const celdaTotal = await columnas[5]
      const total = await celdaTotal.getText()
      // '$100.00' -> '100.00'
      const totalNum = Number(total.replace('$', ''))


      const calculoGananciasPerdidas =  (precioVentaNum - precioCompraNum) * cantidadNum

      await expect(calculoGananciasPerdidas).toBe(totalNum)

    }
  })

})