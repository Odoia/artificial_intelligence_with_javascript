function summation(arr=[]) {
  return arr.reduce((previous, later) => previous + later);
}

function gradientDescent(n=0) {
  return n * (1 - n);
}

function feedForward(inputs=[], target=0, epochs=1, activation='sigmoid') {
  if(target <= 0) target = 0.1;
  else if(target > 1) target = 1;

  let weights = [];
  for(let i=0; i<inputs.length; i++) {
    weights.push(Math.random());
  }

  for(let i=1; i<=epochs; i++) {
    let multiply = [];
    for(let j=0; j<inputs.length; j++) {
      if(inputs[j] <= 0) inputs[j] = 0.1;
      multiply.push(inputs[j] * weights[j]);
    }

    let sum = summation(multiply);
    let output = 0;
    switch(activation) {
      case 'tanh'       : output = parseFloat(tanh(sum)).toFixed(4); break;
      case 'sigmoid'    : output = parseFloat(sigmoid(sum)).toFixed(4); break;
      case 'leakRelu'   : output = parseFloat(leakRelu(sum)).toFixed(4); break;
      case 'relu'       : output = parseFloat(relu(sum)).toFixed(4); break;
      case 'binaryStep' : output = parseFloat(binaryStep(sum)).toFixed(4); break;
      default: output = parseFloat(sigmoid(sum)).toFixed(4); break;

    }

    let error = parseFloat(Math.abs(target - output)).toFixed(4);
    for(let j=0; j<inputs; j++) {
      if(inputs[j]<=0) inputs[j] = 0.1;
      weights[j] += inputs[j] * gradientDescent(error);
    }
    let epoch = i.toString().padStart(7,'0');
    
    console.log(`época: ${epoch} - taxa de erro: ${error} - saida ${output}`);
  }
}

function tanh(n=0) { return Math.sinh(n) / Math.cosh(n); } // hyperbolic tangent: returns values between -1 and 1
function sigmoid(n=0) { return 1 / (1 + Math.pow(Math.E, -n)); } // sigmoid function: returns values between 0 and 1
function relu(n=0) {return Math.max(n, 0); } // rectified linear unit (relu): returns only null and positive values
function leakRelu(n=0) { return Math.max(n, 0.01); } // leaky relu linear unit: returns only values greater than zero
function binaryStep(n=0) {return (n >= 0) ? 1 : 0; } // binary step: returns only 0 or 1

feedForward([0, 0], 0.1, 1000, 'relu');












