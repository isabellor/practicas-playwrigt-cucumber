const { Before } = require("@cucumber/cucumber");

Before(async function () {
    console.log('Hook Before');

    await this.init();
});