const{test, expect}=require ('@playwright/test')
test.describe("pruebas port validation",()=>{
    test("login", async({page})=>{
        await page.goto("https://the-internet.herokuapp.com/login");
        await expect(page.locator('#username')).toBeVisible();
        await expect(page.locator('[name="password"]')).toBeVisible();
        await expect(page.getByRole('button', {name:"login"})).toBeVisible();
       await page.locator('#username').fill('tomsmith');
        await page.locator('[name="password"]').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/.*secure/);
    })
  test("login invalido", async({page})=>{
        await page.goto("https://the-internet.herokuapp.com/login");
        await expect(page.locator('#username')).toBeVisible();
        await expect(page.locator('[name="password"]')).toBeVisible();
        await expect(page.getByRole('button', {name:"login"})).toBeVisible();
       await page.locator('#username').fill('pepito4');
        await page.locator('[name="password"]').fill('unaContraseña');
        await page.getByRole('button', { name: 'Login' }).click();
       await expect(page.locator('#flash')).toContainText('invalid');
    })
  
    

})