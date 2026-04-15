const { test, expect } = require('@playwright/test');

/**
 * Regression test suite that reproduces the login feature scenarios
 * defined in features/login.feature.
 *
 * Feature: Funcionalidad de Login
 *   - Scenario 1: Login exitoso con credenciales validas
 *   - Scenario 2: Login fallido con credenciales invalidas
 *   - Scenario 3: Login fallido con alguna credencial vacia
 */

test.describe('Funcionalidad de Login - Regression', () => {

    // Background: el usuario esta en la pagina de login
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await expect(page).toHaveURL(/.*\/login/);
    });

    test('Login exitoso con credenciales validas', async ({ page }) => {
        // Verify login page elements are visible before interacting
        await expect(page.locator('#username')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

        // When el usuario ingresa el nombre de usuario "tomsmith"
        await page.locator('#username').fill('tomsmith');

        // And el usuario ingresa la contrasena "SuperSecretPassword!"
        await page.locator('#password').fill('SuperSecretPassword!');

        // And el usuario hace clic en el boton de login
        await page.getByRole('button', { name: 'Login' }).click();

        // Then deberia ver el mensaje "You logged into a secure area!"
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

        // Verify navigation: user is redirected to the secure area
        await expect(page).toHaveURL(/.*\/secure/);

        // Verify secure page elements are present
        await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

        // Verify logout navigates back to login page
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL(/.*\/login/);
        await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
    });

    test('Login fallido con credenciales invalidas', async ({ page }) => {
        // Verify login page elements are visible before interacting
        await expect(page.locator('#username')).toBeVisible();
        await expect(page.locator('[name="password"]')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

        // When ingresa usuario no valido y presiona el boton "Login"
        await page.locator('#username').fill('pepito');
        await page.locator('[name="password"]').fill('unaContrasena');
        await page.getByRole('button', { name: 'Login' }).click();

        // Then debe permanecer en la pagina de login
        await expect(page).toHaveURL(/.*\/login/);

        // And debe ver mensaje de error de credenciales invalidas
        await expect(page.locator('#flash')).toContainText('invalid');
    });

    test('Login fallido con alguna credencial vacia', async ({ page }) => {
        // Verify login page elements are visible before interacting
        await expect(page.locator('#username')).toBeVisible();
        await expect(page.locator('[name="password"]')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

        // When ingresa usuario "pepito2" y clave "" y presiona el boton "Login"
        await page.locator('#username').fill('pepito2');
        await page.locator('[name="password"]').fill('');
        await page.getByRole('button', { name: 'Login' }).click();

        // Then debe permanecer en la pagina de login
        await expect(page).toHaveURL(/.*\/login/);

        // And debe ver mensaje de error de credenciales invalidas
        await expect(page.locator('#flash')).toContainText('invalid');
    });
});
