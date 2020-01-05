module.exports = class multivariateRegression {
  
  train(config={}) {
    this._config = {};
    
    if(config.input) {
      const tempX = config.input;
      let concatX = [];
      for(let i=0; i<tempX.length; i++){
        const temp = tempX[i].reduce((a, b) => a+''+b);
        concatX.push(Number(temp));
      }
      this.X = concatX;
    } else this.X = [[0, 0]]

    if(config.output) this.Y = config.output; else this.Y = [0]
    this._config.input = this.X; 
    this._config.output = this.Y;
  }

  saveModel(path='./model.json') {
    const fs = require('fs');
    fs.writeFileSync(path, JSON.stringify(this._config));
  }

  loadModel(path='./model.json') {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf8' );
    const json = JSON.parse(data);
    this.X = json.input;
    this.Y = json.output;
  }

  product(x=[], y=[]) {
    let temp = []
    for(let i=0; i<x.length; i++)
      temp.push(parseFloat(x[i]) * parseFloat(y[i]));
    return temp;
  }

  squares(x=[]) {
    let temp = [];
    for(let i=0; i<x.length; i++)
      temp.push(parseFloat(x[i] * parseFloat(x[i])));
    return temp;
  }

  summation(x=[]) {
    let temp = 0;
    for(let i=0; i<x.length; i++)
      temp += parseFloat(x[i]);
    return temp;
  }

  average(x=[]) {
    return this.summation(x) / x.length;
  }

  results(x=[], y=[], predictive_input) {
    const result1 = (this.summation(x) * this.summation(y)) / x.length;
    const result2 = (this.summation(x) * this.summation(x)) / x.length;
    const result3 = this.summation(this.product(x, y)) - result1;
    const result4 = result3 / (this.summation(this.squares(x)) - result2);
    const result5 = this.average(y) - (result4 * this.average(x));

    return ((result4 * predictive_input) + result5).toFixed(0);
  }


  predict(p=[]) {
    const tempX = p;
    let concatX = [];
    for(let i=0; i<tempX.length; i++){
      const temp = tempX[i].reduce((a, b) => a+''+b);
      concatX.push(Number(temp));
    }
    p = concatX;

    let regressions = [];
    for(let i=0; i<p.length; i++) {
      const temp = Number(this.results(this.X, this.Y, p[i]));
      regressions.push(temp);
    }
    return regressions; 
  }
}
