import * as Usuarios from '../fixtures/usuarios.json'

describe('Fixtures', () => {

  beforeEach(async () => {
    await browser.url('http://localhost:4001/login')
  })

  it('debería ir a la pagina de transacciones al loguearse con las credenciales correctas', async () => {
    const usuario = Usuarios.usuarioCorrecto
    await $('[name="email"]').setValue(usuario.email)
    await $('[name="password"]').setValue(usuario.password)
    await $('[type="submit"]').click()

    await expect(browser).toHaveUrl('http://localhost:4001/')
    const h1 = await $('h1')
    await expect(h1).toHaveText('Historial de transacciones')
  })

  it('debería de quedarse en el login al loguearse con las credenciales incorrectas', async () => {
    const usuario = Usuarios.usuarioIncorrecto
    await $('[name="email"]').setValue(usuario.email)
    await $('[name="password"]').setValue(usuario.password)
    await $('[type="submit"]').click()

    await expect(browser).toHaveUrl('http://localhost:4001/login')
    const h1 = await $('h1')
    await expect(h1).toHaveText('Iniciar sesión')
  })
})