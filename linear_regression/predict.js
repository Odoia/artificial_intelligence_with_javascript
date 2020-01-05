const linearRegression = require('./linear_regression');

const regression = new  linearRegression();
regression.loadModel('./model/model_regression.json');

const result = regression.predict([5,6,7,8,9]);
console.log(result);
