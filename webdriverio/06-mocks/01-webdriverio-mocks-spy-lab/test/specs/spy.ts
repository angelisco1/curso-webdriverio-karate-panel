describe('Mocks - Spy', () => {
  let espiaPosts: WebdriverIO.Mock, espiaUsers: WebdriverIO.Mock, espiaCrearPost: WebdriverIO.Mock;

  before(async () => {
    espiaPosts = await browser.mock('https://jsonplaceholder.typicode.com/posts', { method: 'get' })
    espiaUsers = await browser.mock('https://**/users', { method: 'get' })

    // espiaCrearPost = await browser.mock(new URLPattern({
    //   pathname: '/posts',
    //   hostname: '**',
    //   protocol: 'https'
    // }), { method: 'post' })
    espiaCrearPost = await browser.mock('https://jsonplaceholder.typicode.com/posts', { method: 'post' })
  })

  beforeEach(async () => {
    await browser.url('http://localhost:4001/')
  })

  it('debería de pedir una vez los posts al entrar en al web', async () => {
    await expect(espiaPosts).toBeRequestedTimes(2)
  })

  // it('debería de pedir una vez los posts al entrar en al web', async () => {
  //   await expect(espiaPosts).toBeRequestedTimes(1)
  // })

  it('debería de pedir una vez los users al pulsar el botón de cargar usuarios', async () => {
    await $('#btn-cargar-usuarios').click()
    await expect(espiaUsers).toBeRequestedTimes(3)
  })

  it('debería de llamar a los posts con el id del usuario 6 al cargar los posts de Leopoldo', async () => {
    await $('#btn-cargar-usuarios').click()

    await $('[data-user-id="6"]').click()

    // const a: ExpectWebdriverIO.RequestedWith;

    // const params: ExpectWebdriverIO.RequestedWith = {
    //   query: {
    //     userId: 6
    //   }
    // }
    // await expect(espiaPosts).toBeRequestedWith(params)
  })

  it('debería de llamar a crear el nuevo posts con los datos correctos', async () => {
    const nuevoPost = {
      "title": "asdaksd",
      "body": "adasjkjdlkas",
      "userId": 2,
    }

    await $('#btn-crear-post').click()

    await expect(espiaCrearPost).toBeRequestedWith({
      body: nuevoPost
    })
  })

})