const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('que el usuario está en la página de login', async function () {
    await this.page.goto('https://the-internet.herokuapp.com/login');
    await expect(this.page).toHaveURL(/.*\/login/);
});

// Scenario login exitoso
When('el usuario ingresa el nombre de usuario "tomsmith"', async function () {
    await this.page.locator('#username').fill('tomsmith');
});

When('el usuario ingresa la contraseña "SuperSecretPassword!"', async function () {
    await this.page.locator('#password').fill('SuperSecretPassword!');
});

When('el usuario hace clic en el botón de login', async function () {
    await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('debería ver el mensaje "You logged into a secure area!"', async function () {
    await expect(this.page.locator('#flash')).toContainText("You logged into a secure area!");
});

// Scenario login fallido 1
When('ingresa usuario no valido y presiona el botón "Login"', async function () {
    await this.page.locator('#username').fill('pepito');
    await this.page.locator('[name="password"]').fill('unaContraseña');
    await this.page.getByRole('button', { name: 'Login' }).click();
});

// Scenario login fallido 2
When('ingresa usuario "pepito2" y clave "" y presiona el botón "Login"', async function () {
    await this.page.locator('#username').fill('pepito2');
    await this.page.locator('[name="password"]').fill('');
    await this.page.getByRole('button', { name: 'Login' }).click();
});

// Steps reutilizables para todos los fallidos
Then('debe permanecer en la página de login', async function () {
    await expect(this.page).toHaveURL(/.*\/login/);
});

Then('debe ver mensaje de error de credenciales inválidas', async function () {
    await expect(this.page.locator('#flash')).toContainText('invalid');
});
