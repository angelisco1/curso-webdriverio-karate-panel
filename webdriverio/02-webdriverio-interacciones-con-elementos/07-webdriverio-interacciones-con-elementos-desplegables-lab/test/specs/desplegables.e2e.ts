describe('Página de desplegables', () => {
  beforeEach(async () => {
    await browser.url('http://127.0.0.1:4007/desplegables.html')
  })

  it('debería de seleccionarse la opción de Nio', async () => {
    const desplegable = await $('#select-coches-electricos')
    await desplegable.selectByAttribute('value', 'nio-et7')

    const opcionNio = await desplegable.$('option[value="nio-et7"]')
    await expect(opcionNio).toBeSelected()

    await desplegable.selectByAttribute('value', 'tesla-model-3')
    await expect(desplegable).toHaveValue('tesla-model-3')
  })

})