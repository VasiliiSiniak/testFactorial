const { Factorial } = require('../pageObject/factorial')
const helper = require('../helper');
const { test, expect } = require('@playwright/test');
const { errorText, redColor, termAndConditionsText, privacyText, pageTitle } = require('../valueData');

test.describe('API tests', () => {
    test('check the correctness of the calculation through api', async () => {
        await helper.checkApi(0);
        await helper.checkApi(1);
        await helper.checkApi(2);
        await helper.checkApi(60);
        await helper.checkApi(200);
    });
});


test.describe('UI tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://qainterview.pythonanywhere.com/');
    });



    test('check of the correctness of factorial calculation 0', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('0');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        expect(await factorial.getResultValue()).toBe(helper.factorial(0));
    });

    test('check of the correctness of factorial calculation 1', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('1');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        expect(await factorial.getResultValue()).toBe(helper.factorial(1));
    });

    test('check of the correctness of factorial calculation 2', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('2');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        expect(await factorial.getResultValue()).toBe(helper.factorial(2));
    });

    test('check of the correctness of factorial calculation 70', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('70');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        expect(await factorial.getResultValue()).toBe(helper.factorial(70));
    });

    test('check of the correctness of factorial calculation 200', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('200');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        expect(await factorial.getResultValue()).toBe(helper.factorial(200));
    });

    test.only('check of the correctness of factorial calculation with space before number', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('     3');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        expect(await factorial.getResultValue()).toBe(helper.factorial(3));
    });

    test('check error message when input is empty', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        await expect(factorial.resultText).toHaveText(errorText)
    });

    test('check page title', async ({ page }) => {
        await expect(page).toHaveTitle(pageTitle);
    });

    test('check error message when enter string in input', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('f');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        await expect(factorial.resultText).toHaveText(errorText)
    });

    test('check error message when enter symbol in input', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('*');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        await expect(factorial.resultText).toHaveText(errorText)
    });

    // skip because error is not visible
    test.skip('check error message when enter -1 in input', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('-1');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        await expect(factorial.resultText).toHaveText(errorText)
    });


    test('ckeck that border color is red when have error', async ({ page }) => {
        const factorial = new Factorial(page);

        await factorial.inputInInputForm('*');
        await factorial.clickSubmitButton();
        await page.waitForTimeout(1000)
        const styledColor = await factorial.inputForm.evaluate((el) => getComputedStyle(el).borderColor);
        expect(styledColor).toBe(redColor)

    });

    test('ckeck transition on Term And Conditions page', async ({ page }) => {
        const factorial = new Factorial(page);

       await factorial.clickTermAndConditionsButton();
       await expect(factorial.termAndPrivacyPages).toHaveText(termAndConditionsText)

    });

    test('ckeck transition on Pryvacy page', async ({ page }) => {
        const factorial = new Factorial(page);

       await factorial.clickPrivacyButton();
       await expect(factorial.termAndPrivacyPages).toHaveText(privacyText)

    });


});