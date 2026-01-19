describe('Página del todomvc', () => {
  beforeEach(async () => {
    await browser.url('https://todomvc.com/examples/react/dist/')

    const inputTarea = await $('.new-todo')
    await inputTarea.setValue('Tarea 1')
    await browser.keys('Enter')
    await inputTarea.setValue('Tarea 2')
    await browser.keys('Enter')
  })

  it('debería de aparecer una lista con 2 tareas al añadir 2 tareas', async () => {
    const tareasAgregadas = await $$('.todo-list li')
    await expect(tareasAgregadas).toHaveLength(2)
  })

  it('debería de haber 2 checkboxes sin marcar al añadir 2 tareas y se tiene que mostrar el texto "2 items left"', async () => {
    const checkboxes = await $$('ul [type="checkbox"]')
    await expect(checkboxes).toHaveLength(2)

    // ⚠ Esta no deberíamos de usarla porque si mañana ponemos 20 tareas, tendríamos 20 lineas haciendo lo mismo
    // await expect(checkboxes[0]).not.toBeChecked()
    // await expect(checkboxes[1]).not.toBeChecked()

    // for (let check of checkboxes) {
    //   await expect(check).not.toBeChecked()
    // }

    // <lista>.forEach(<fn>)
    checkboxes.forEach(async (check) => {
      await expect(check).not.toBeChecked()
    })

    const itemCuenta = await $('footer .todo-count')
    await expect(itemCuenta).toHaveText('2 items left!')
  })

  it('debería de mostrar el texto "0 items left" al marcar las 2 tareas creadas', async () => {
    const checkboxes: ChainablePromiseArray = $$('ul [type="checkbox"]')
    await expect(checkboxes).toHaveLength(2)

    // <lista>.forEach(<fn>)
    checkboxes.forEach(async (check) => {
      await check.click()
      await expect(check).toBeChecked()
    })

    const itemCuenta = await $('footer .todo-count')
    await expect(itemCuenta).toHaveText('0 items left!')
  })

})