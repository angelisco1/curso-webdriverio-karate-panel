describe('Login', () => {

  beforeEach(async () => {
    await browser.url('http://localhost:4200/')
  })

  afterEach(async () => {
    await browser.execute(() => {
      localStorage.clear()
    })
  })

  it('debería de mostrar el error "Invalid credentials" al loguearte con un usuario invalido', async () => {
    const username = 'no-existe'
    const password = 'no-existe'
    const mensajeError = 'INVALID CREDENTIALS'

    await $('[formcontrolname="username"]').setValue(username)

    const inputPw = await $('[formcontrolname="password"]')
    await inputPw.setValue(password)

    await $('button[type="submit"]').click()

    const error = await $('div.badge-danger')
    await expect(error).toHaveText(mensajeError)
  })

  it('debería de mostrar el error "Usuario requerido" al pulsar en Iniciar sesión sin introducir el usuario', async () => {
    const username = ''
    const mensajeError = 'Usuario requerido'

    await $('[formcontrolname="username"]').setValue(username)

    await $('button[type="submit"]').click()

    const errorUsuario = await $('form div:first-child span').getText()
    await expect(errorUsuario).toBe(mensajeError)
  })

  it('debería de mostrar el error "Contraseña requerida" al pulsar en Iniciar sesión sin introducir la contraseña o siendo esta de menos de 6 caracteres', async () => {
    const username = 'un usuario'
    const password = '1234'
    const mensajeError = 'Contraseña requerida'

    await $('[formcontrolname="username"]').setValue(username)
    await $('[formcontrolname="password"]').setValue(password)

    await $('button[type="submit"]').click()

    const errorUsuario = await $('form div:nth-of-type(2) span').getText()
    await expect(errorUsuario).toBe(mensajeError)

  })

  it('debería mostrar la etiqueta "Admin" al loguearte con el usuario cfalco', async () => {
    const username = 'cfalco'
    const password = 'cfalco'
    const rol = 'ADMIN'

    await $('[formcontrolname="username"]').setValue(username)
    await $('[formcontrolname="password"]').setValue(password)

    await $('button[type="submit"]').click()

    const badgeRol = await $('.user-info .badge')
    await expect(badgeRol).toHaveText(rol)
  })

  it('debería mostrar la etiqueta "User" al loguearte con el usuario kozinski', async () => {
    const username = 'kozinski'
    const password = 'kozinski'
    const rol = 'USER'

    await $('[formcontrolname="username"]').setValue(username)
    await $('[formcontrolname="password"]').setValue(password)

    await $('button[type="submit"]').click()

    const badgeRol = await $('.user-info .badge')
    await expect(badgeRol).toHaveText(rol)
  })

})