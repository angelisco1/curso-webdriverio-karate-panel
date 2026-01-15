describe('Búsquedas por xpath', () => {
  beforeEach(async () => {
    await browser.url('http://localhost:3004/tienda3000-v1.html')
  })

  it('debería encontrar el precio del Nothing Phone 3', async () => {
    const elementoPrecio = await $('//div[contains(text(), "Nothing")]/following-sibling::span')
    await expect(elementoPrecio).toHaveText('699.00')

    // const precio = await elementoPrecio.getText()
    // expect(precio).toHaveText('699.00')
  })
})