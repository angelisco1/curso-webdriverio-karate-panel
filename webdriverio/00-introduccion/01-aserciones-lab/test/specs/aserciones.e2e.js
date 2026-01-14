describe('Aserciones', () => {

  before(async () => {
    console.log('---- Se ejecuta una vez al principio')
  })

  beforeEach(async () => {
    console.log('---- Se ejecuta una vez justo antes de cada "it"')
  })

  after(async () => {
    console.log('---- Se ejecuta una vez al final')
  })

  afterEach(async () => {
    console.log('---- Se ejecuta una vez justo después de cada "it"')
  })

  describe('de valores primitivos', () => {

    beforeEach(async () => {
      console.log('---- [valores primitivos] Se ejecuta una vez justo antes de cada "it"')
    })

    it('igualdad de numeros', async () => {
      // toBe -> string, numeros, booleanos
      expect(2).toBe(2)
    })

    it('un string con un nombre debería de tener valor', async () => {
      const nombre = 'Charly';
      let apellido;

      expect(nombre).toBeDefined()

      expect(apellido).not.toBeDefined()
      expect(apellido).toBeUndefined()

      expect(nombre).toBeTruthy()

      // Los valores falsy: null, undefined, false, '', 0
      expect(apellido).toBeFalsy()
    })

  })

  describe('de valores no primitivos', () => {
    it('igualdad de arrays', async () => {
      expect([1, 2]).toEqual([1, 2])
    })

    it('tamaño de los arrays', async () => {
      const colores = ['rojo', 'verde', 'amarillo', 'azul', 'blanco']
      expect(colores).toHaveLength(5)
      expect(colores).toContain('amarillo')

      expect(colores).not.toContain('morado')
    })
  })

  describe('de WDIO', () => {
    it('debería de tener el título "Lab de aserciones" la página', async () => {
      await browser.url('http://localhost:4001')

      await expect(browser).toHaveTitle('Lab de aserciones')
      await expect(browser).toHaveUrl('http://localhost:4001/')
    })
  })

})