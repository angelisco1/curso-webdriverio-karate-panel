import todomvcPage from "../pageobjects/todomvc.page"

describe('Todomvc POM', () => {
  beforeEach(async () => {
    await todomvcPage.open()
  })

  it('debería de mostrar "2 items left" al crear 2 tareas', async () => {
    // await todomvcPage.inputNuevaTarea.setValue('Tarea 1')
    await todomvcPage.crearTarea('Tarea 1')
    await todomvcPage.crearTarea('Tarea 2')

    await expect(todomvcPage.totalItemsLeft).toHaveText('2 items left')
  })

  it('debería de mostrar "1 item left" al crear 2 tareas y marcar 1', async () => {
    // await todomvcPage.inputNuevaTarea.setValue('Tarea 1')
    await todomvcPage.crearTarea('Tarea 1')
    await todomvcPage.crearTarea('Tarea 2')

    await todomvcPage.marcarTarea(1)

    await expect(todomvcPage.totalItemsLeft).toHaveText('1 item left')
  })

  it('debería de mostrar "0 items left" al crear 2 tareas y marcar las 2 tareas', async () => {
    // await todomvcPage.inputNuevaTarea.setValue('Tarea 1')
    await todomvcPage.crearTarea('Tarea 1')
    await todomvcPage.crearTarea('Tarea 2')

    await todomvcPage.marcarTodasLasTareas()

    await expect(todomvcPage.totalItemsLeft).toHaveText('0 items left')
  })

})