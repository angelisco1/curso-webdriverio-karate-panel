describe('Mocks - Spy', () => {
  let espiaPosts, espiaUsers, espiaCrearPost;

  beforeEach(async () => {
    espiaPosts = await browser.mock('https://jsonplaceholder.typicode.com/posts', { method: 'get' })

    espiaUsers = await browser.mock('https://**/users', { method: 'get' })


    espiaCrearPost = await browser.mock('**/posts', { method: 'post' })

    await browser.url('http://localhost:4001/')
  })

  afterEach(async () => {
    await espiaPosts.restore()
    await espiaUsers.restore()
    await espiaCrearPost.restore()
  })

  it('debería de pedir una vez los posts al entrar en al web', async () => {
    await expect(espiaPosts).toBeRequestedTimes(1)
  })

  it('debería de pedir una vez los users al pulsar el botón de cargar usuarios', async () => {
    await $('#btn-cargar-usuarios').click()
    await expect(espiaUsers).toBeRequestedTimes(1)
  })

  it('debería de llamar a los posts con el id del usuario 6 al cargar los posts de Leopoldo (waitForResponse)', async () => {
    await espiaPosts.waitForResponse()
    await espiaPosts.clear()
    await $('#btn-cargar-usuarios').click()

    await espiaUsers.waitForResponse()

    await $('[data-user-id="6"]').click()
    await espiaPosts.waitForResponse()

    await expect(espiaPosts.calls[0].request.url).toContain('userId=6')
  })

  it('debería de llamar a los posts con el id del usuario 6 al cargar los posts de Leopoldo (waitUntil)', async () => {
    await espiaPosts.waitForResponse()
    await $('#btn-cargar-usuarios').click()

    await espiaUsers.waitForResponse()

    await $('[data-user-id="6"]').click()

    await browser.waitUntil(
      async () => espiaPosts.calls.length >= 2,
      { timeout: 6000, timeoutMsg: 'No se recibieron 2 llamadas a posts' }
    )

    await expect(espiaPosts.calls[1].request.url).toContain('userId=6')
  })

  it('debería de llamar a crear el nuevo posts con los datos correctos', async () => {
    const nuevoPost = {
      title: 'Aumenta la venta de pitos y flautas',
      body: 'La demanda de instrumentos musicales de viento ha experimentado un crecimiento sin precedentes en el último trimestre.',
      userId: 1
    }

    await $('#btn-crear-post').click()
    await espiaCrearPost.waitForResponse()

    const postData = JSON.parse(espiaCrearPost.calls[0].request['goog:postData']);

    await expect(postData).toEqual(nuevoPost);
  })

})