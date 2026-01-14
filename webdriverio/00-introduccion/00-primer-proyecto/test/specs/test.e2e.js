const { expect, browser, $ } = require('@wdio/globals')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')

        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})


describe('Calculadora', () => {

    it('debería dar como resultado 4 si sumamos 2 y 2', async () => {
        expect(2+2).toBe(4)
    })

    it('debería dar como resultado -1 si sumamos 2 y -3', async () => {
        expect(2-3).toBe(-1)
    })
})