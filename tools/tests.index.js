/* eslint-disable no-var,no-console */
var testsContext = require.context("../src", true, /^(?!.*controls.*).*(\.spec\.js)$/ );
testsContext.keys().forEach(function(path) {
    try {
        // console.log(path);
        testsContext(path);
    } catch(err) {
        console.error('[ERROR] WITH SPEC FILE: ', path);
        console.error(err);
    }
});