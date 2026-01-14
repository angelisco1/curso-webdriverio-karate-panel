describe('Selectores de CSS', () => {


  it('debería tener el texto "Tienda 3000" como título de la página', async () => {
    await browser.url('http://localhost:3002/tienda3000-v1.html')

    // Selector de etiqueta
    const tituloElemento = await $('h1')

    const titulo = await tituloElemento.getText()
    await expect(titulo).toEqual('Tienda 3000')

    await expect(tituloElemento).toHaveText('Tienda 3000')
  })

  it('debería tener el texto "Cesta" encima de la cesta de productos', async () => {
    await browser.url('http://localhost:3002/tienda3000-v1.html')

    // Selector de etiqueta
    const titulosSecciones = await $$('h3')
    await expect(titulosSecciones[1]).toHaveText('Cesta')
  })

  it('', async () => {

  })


})