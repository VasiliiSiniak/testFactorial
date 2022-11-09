exports.Factorial = class Factorial {
    constructor(page) {
        this.page = page;
        this.inputForm = page.locator('.form-control.input-lg');
        this.submitButton = page.locator('[class="btn btn-success btn-lg"]');
        this.resultText = page.locator('[class="text-center top-space-20"]');
        this.termAndConditionsButton = page.locator('//*[@class="margin-base-vertical text-center wor_copyright"]/a[contains(text(),"Terms and Conditions")]');
        this.privacyButton = page.locator('//*[@class="margin-base-vertical text-center wor_copyright"]/a[contains(text(),"Privacy")]');
        this.termAndPrivacyPages = page.locator('//body');
    }

    async inputInInputForm(data) {
        await this.inputForm.fill(data)
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async getResultValue() {
        let result = await this.resultText.textContent()
        return +result.split(': ').pop()
    }

    async getBorderColorOfElement(element){
        return  await element.evaluate((el) => getComputedStyle(el).borderColor)
    }

    async clickPrivacyButton() {
        await this.privacyButton.click();
    }

    async clickTermAndConditionsButton() {
        await this.termAndConditionsButton.click();
    }



}