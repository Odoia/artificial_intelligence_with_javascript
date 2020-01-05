let inputs = [];
let classes = [];

function eliminateDuplicates(arr=[]) {
  arr = [...new Set(arr)];
  return arr;
}

function returnClasses() {
  let arr = classes;
  arr = eliminateDuplicates(arr);
  return arr;
}

function countText(text='', search='') {
  return text.split(search).length - 1;
}

function organize() {
  let params = {};

  for(let i=0; i<inputs.length; i++) {
    let carac = '';
    if(i<(inputs.length - 1)) carac = '-';

    if(params[classes[i]]) {
      params[classes[i]] += inputs[i] + carac;
    }else {
      params[classes[i]] = inputs[i] + carac; 
    }
  }

  let str = JSON.stringify(params);
  str = str.replace(/-"/g, '"');
  str = str.replace(/-/g, ',');
  params = JSON.parse(str);

  return params;
}

function frequency() {
  let categories = [];
  let params = {};
  const object = organize();
  const labels = returnClasses();

  for(let i=0; i<inputs.length; i++){
    params['Inputs'] = inputs[i]

    for(let j=0; j<labels.length; j++) {
      params[labels[j]] = countText(object[labels[j]], inputs[i]);
    }

    categories[i] = JSON.stringify(params);
  }
  categories = eliminateDuplicates(categories);

  for(let i=0; i<categories.length; i++) {
    categories[i] = JSON.parse(categories[i]);
  }
  return categories;
}

function quantitityClasses() {
  const categories = frequency();
  return parseInt(Object.keys(categories[0]).length - 1 )
}

function sumClasses(arr=[]) {
  let sum = 0;

  for(let i=1; i<arr.length; i++) {
    sum += parseInt(arr[i]);
  }
  return sum;
}

function totalForClass() {
  let totalClass = [];
  const nameClasses = returnClasses();
  const str_classes = JSON.stringify(classes);

  for(let i=0; i<nameClasses.length; i++) {
    totalClass[nameClasses[i]] = countText(str_classes, nameClasses[i]);
  }
  return totalClass;
}

function sumTotalClasses() {
  const vetTemp = Object.values(totalForClass());
  let sum = 0;
  for(let i=0; i<vetTemp.length; i++) {
    sum += parseFloat(vetTemp[i]);
  }
  return sum;
}

function occurrenceClassesForInput(_input='', _class='') {
  const categories = frequency();
  let result = 0;
  categories.forEach((item) => {
    if(item['input'] == _input){
      result = parseFloat(item[_class]);
    }
  });
  return result;
}

function naiveBayes(_input='') {
  const nameClasses = returnClasses();
  const totalClass = totalForClass();

  const categories = frequency();
  let sum = 0;
  categories.forEach((item) => {
    if(item['input'] == _input) {
      for(let i=0; i<nameClasses.length; i++) {
        sum += parseFloat(item[nameClasses[i]]);
      }
    }
  });

  let probability = []

  for(let i=0; i<nameClasses.length; i++) {
    probability[nameClasses[i]] = 
      (occurrenceClassesForInput(_input, nameClasses[i]) / totalClass[nameClasses[i]])
      *
       (totalClass[nameClasses[i]] / sumTotalClasses())
      /
      (sum / sumTotalClasses());
  }
  return probability;
}

function train(_inputs=[], _classes=[]) {
  inputs = _inputs;
  classes = _classes;
}

function predict(selInput='') {
  const nameClasses = returnClasses();
  let odds = [];
  if (selInput.toString().trim().length > 0) {
    const naive = naiveBayes(selInput);

    for(let i=0; i<nameClasses.length; i++) {
      const percent = Number(parseFloat(naive[nameClasses[i]] * 100).toFixed(2));
      odds.push({class: nameClasses[i], probability: percent});
    }
  } else {
    odds.push({class: '', probability: 0});
  }
  return odds;
}
