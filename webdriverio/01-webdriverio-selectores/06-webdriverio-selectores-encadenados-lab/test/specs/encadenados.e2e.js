describe('Búsquedas encadenadas', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:3006/tienda3000-v1.html')
  })

  it('debería haber 2 elementos en la cesta', async () => {
    const contenedorCesta = await $('#contenedor_carrito')
    const productosEnCesta = await contenedorCesta.$$('.caja-producto')
    await expect(productosEnCesta).toHaveLength(2)

    const productosEnCesta2 = await $('#contenedor_carrito').$$('.caja-producto')
    await expect(productosEnCesta2).toHaveLength(2)
  })
})