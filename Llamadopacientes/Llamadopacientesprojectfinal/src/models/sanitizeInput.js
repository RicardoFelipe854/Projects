
export const sanitizeInput = (inputElement) => { //Limpia caracteres especiales
  let inputValue= inputElement.value;

  inputValue = inputValue.replace(/[<>\[\]{}\\\-\/&%$#/~]+/g, '');
  inputElement.value = inputValue;
}

export const sanitizeInputLetter = (inputElement) => { //Limpia letras y punto
  let inputValue= inputElement.value;

  inputValue = inputValue.replace(/[^0-9]+/g, ''); //Solo mantiene numeros del 0 al 9
  inputElement.value = inputValue;
}

export const sanitizeInputNumbers = (inputElement) => {
  let inputValue= inputElement.value;

  inputValue = inputValue.replace(/[^a-zA-Z\s]+/g, '');
  inputElement.value = inputValue;
}
//export default sanitizeInput;