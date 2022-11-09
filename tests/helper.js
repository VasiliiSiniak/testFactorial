const { expect } = require('chai');
class Helper {

    //  factorial(number) {
    //   return  (number != 1 && number != 0) ? number * this.factorial(number - 1) : 1;
    //   }

    factorial(number) {
        let result = 1;
        for (let count = number; count > 1; count--) {
            result *= count;
        }
        return result;
    };




    async checkApi(number) {
        await fetch("https://qainterview.pythonanywhere.com/factorial", {
            "headers": {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "body": `number=${number}`,
            "method": "POST"
        })
            .then(response => response.json())
            .then(result => {
                expect(result.answer).to.eq(this.factorial(number))
            })
    }

}

module.exports = new Helper();