const{test, expect}=require ('@playwright/test')

test.describe("Mi primer test en playwright",()=>{
    test("Debe validar elementos de Google",async({page})=>{
        await page.goto("https://www.google.com/ncr");
        await expect(page).toHaveTitle('Google');
        const btnBuscar=page.getByRole('button',{name: 'Google Search'});
        await expect(btnBuscar.first()).toBeVisible();
    })  
})