import { Page } from "./page";

class TodoMvcPage extends Page {
  get inputNuevaTarea() {
    return $('input.new-todo')
  }

  get totalItemsLeft() {
    return $('footer span.todo-count')
  }

  get itemsTareas() {
    return $$('.todo-list li')
  }

  get toggleAllCheckbox() {
    // return $('[type="checkbox"].toggle-all-label')
    return $('label.toggle-all-label')
  }

  open() {
    return super.open('https://todomvc.com/examples/javascript-es6/dist/')
  }

  async crearTarea(texto: string) {
    await this.inputNuevaTarea.setValue(texto)
    await browser.keys('Enter')
  }

  async getTareaPorPosicion(posicion: number) {
    return this.itemsTareas[posicion]
  }

  async marcarTarea(posicion: number) {
    const tarea = await this.getTareaPorPosicion(posicion)
    await tarea.$('[type="checkbox"]').click()
  }

  async marcarTodasLasTareas() {
    await this.toggleAllCheckbox.click()
  }


}

export default new TodoMvcPage()