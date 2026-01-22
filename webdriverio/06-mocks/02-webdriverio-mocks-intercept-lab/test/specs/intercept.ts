describe('Mocks - Intercept', () => {
  let mockTiempo: WebdriverIO.Mock

  before(async () => {
    mockTiempo = await browser.mock('/get-tiempo')
  })

  // beforeEach(async () => {
    // })

  it('debería de aparecer un 6 cuando nieva', async () => {
    mockTiempo.respond({
      tiempo: "nevado"
    })

    await browser.url('http://localhost:4002/')

    const emoji = await $('#tiempo')
    await expect(emoji).toHaveText('6')
  })

  it('debería de aparecer un 2 cuando está parcialmente nublado', async () => {
    mockTiempo.respond({
      tiempo: 'parcialmente-nublado'
    })

    await browser.url('http://localhost:4002/')

    const emoji = await $('#tiempo')
    await expect(emoji).toHaveText('2')
  })

})