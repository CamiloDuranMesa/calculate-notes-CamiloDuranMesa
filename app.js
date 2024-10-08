const username = document.getElementById('nombre');
const data1 = document.getElementById('nota1');
const data2 = document.getElementById('nota2');
const data3 = document.getElementById('nota3');
const btnCalculate = document.getElementById('btn-calculate');
const btnCalculatePredict = document.getElementById('btn-predict');
const response = document.getElementById('resultado');

btnCalculate.addEventListener('click', calculateNote);
btnCalculatePredict.addEventListener('click', predictNote);

function calculateNote(event) {
  event.preventDefault();

  let note1 = parseFloat(data1.value);
  let note2 = parseFloat(data2.value);
  let note3 = parseFloat(data3.value);

  
  if (!isValidNote(note1) || !isValidNote(note2) || !isValidNote(note3)) {
    response.textContent = `Usuario ${username.value}, ingrese valores entre 0 y 5`;
    response.style.color = 'black'; 
    return; 
  }

  let result = ((note1 * 0.3) + (note2 * 0.3) + (note3 * 0.4)).toFixed(2);

  if (result < 3.5) {
    response.style.color = 'black';
    response.textContent = `Usuario ${username.value} perdió la materia, su nota definitiva es: ${result}`;
  } else if (result >= 3.5 && result < 4.5) {
    response.style.color = 'orange';
    response.textContent = `Usuario ${username.value} ganó la materia, su nota definitiva es: ${result}`;
  } else if (result >= 4.5) {
    response.style.color = 'green';
    response.textContent = `Usuario ${username.value} ganó la materia de forma sobresaliente, su nota definitiva es: ${result}`;
  }
}

function predictNote(event) {
  event.preventDefault();

  let note1 = parseFloat(data1.value);
  let note2 = parseFloat(data2.value);

 
  if (!isValidNote(note1) || !isValidNote(note2)) {
    response.textContent = `Usuario ${username.value}, ingrese valores entre 0 y 5`;
    response.style.color = 'black'; 
    data3.placeholder = ""; 
    return; 
  }

  
  let weightedSum = (note1 * 0.3) + (note2 * 0.3);
  let resultPredict = ((3.5 - weightedSum) / 0.4).toFixed(2);

  if (resultPredict <= 5.0 && resultPredict >= 0) {
    data3.placeholder = `Necesita la nota ${resultPredict}, para llegar a 3.5`;
    response.textContent= "";
  } else {
    data3.placeholder = `Usted necesita ${resultPredict}, por lo tanto ya no puede ganar`;
  }
}


function isValidNote(note) {
  return !isNaN(note) && note >= 0 && note <= 5;
}
