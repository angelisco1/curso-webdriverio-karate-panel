describe('Selectores de CSS', () => {

  beforeEach(async () => {
    await browser.url('http://localhost:3002/tienda3000-v2.html')
  })

  it.skip('debería tener el texto "Tienda 3000" como título de la página', async () => {
    // await browser.url('http://localhost:3002/tienda3000-v1.html')

    // Selector de etiqueta
    const tituloElemento = await $('h1')

    const titulo = await tituloElemento.getText()
    await expect(titulo).toEqual('Tienda 3000')

    await expect(tituloElemento).toHaveText('Tienda 3000')
  })

  it.skip('debería tener el texto "Cesta" encima de la cesta de productos', async () => {
    // await browser.url('http://localhost:3002/tienda3000-v1.html')

    // Selector de etiqueta
    const titulosSecciones = await $$('h3')
    await expect(titulosSecciones[1]).toHaveText('Cesta')
  })

  it.skip('debería estar mostrándose la tarjeta del producto "Nothing Phone 3"', async () => {
    // await browser.url('http://localhost:3002/tienda3000-v1.html')

    // Selector de id (#identificador)
    const cajaNothingPhone3 = $('#prod_gen_847382')
    await expect(cajaNothingPhone3).toBeDisplayed()
  })

  it('debería haber 4 productos en la tienda', async () => {
    const productos = await $$('[data-test="articulo-producto"]')
    await expect(productos).toHaveLength(4)
  })

  it('debería encontrar el botón de Añadir al carrito del Macbook mini', async () => {
    // Selector de atributo ([nombreAtributo="valorAtributo"])
    const botones = await $$('[data-test="boton-agregar-al-carrito"]')
    await expect(botones[1]).toBeDisplayed()
  })

  it.skip('debería encontrar el botón de Añadir al carrito de Auriculares Sony', async () => {
    // Selectores múltiples (selector1 selector2.clase1)
    // nth-of-type(n): busca el elemento en la posición "n" de los elementos a los que aplica
    const boton = await $('div.caja-producto:nth-of-type(3) [data-id="3003"]')
    await expect(boton).toBeClickable()
  })
})