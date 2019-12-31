function product(x=[], y=[]) {
  let temp = []
  for(let i=0; i<x.length; i++)
    temp.push(parseFloat(x[i]) * parseFloat(y[i]));
  return temp;
}

function squares(x=[]) {
  let temp = [];
  for(let i=0; i<x.length; i++)
    temp.push(parseFloat(x[i] * parseFloat(x[i])));
  return temp;
}

function summation(x=[]) {
  let temp = 0;
  for(let i=0; i<x.length; i++)
    temp += parseFloat(x[i]);
  return temp;
}

function average(x=[]) {
  return summation(x) / x.length;
}

function results(x=[], y=[], predictive_input) {
  const result1 = (summation(x) * summation(y)) / x.length;
  const result2 = (summation(x) * summation(x)) / x.length;
  const result3 = summation(product(x, y)) - result1;
  const result4 = result3 / (summation(squares(x)) - result2);
  const result5 = average(y) - (result4 * average(x));

  return ((result4 * predictive_input) + result5).toFixed(0);
}


function linearRegression(axis_x=[], axis_y=[]) {
  const size_x = axis_x.length;
  const size_y = axis_y.length;

  const temp_x = axis_x.slice(0, size_y);
  const temp_y = axis_y;

  const dif = size_x - size_y;

  if(dif > 0) {
    let regressions = [];
    for(let i=0; i<dif; i++) {
      const temp = results(temp_x, temp_y, axis_x[size_y+i]);
      regressions.push(temp);
    }
    const new_y = temp_y.concat(regressions);

    console.log(`eixo x : ${axis_x}\n eixo y: ${new_y}`)
  }
}


linearRegression(
  [1,2,3,4,5],
  [10,20,30,40]
);
