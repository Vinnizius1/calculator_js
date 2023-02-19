const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

/* Regra de Negócio */
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    // valores já impressos na tela
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;

    // valor que o usuário está digitando neste momento
    this.currentOperation = "";
  }

  /* métodos */
  addDigitToScreen(digit) {
    // check if current operation already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // process all calculator operations
  processOperations(operation) {
    // get current and previous values
    let operationValue;
    let previous = +this.previousOperationText.innerText;
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        break;
      default:
        return;
    }
  }

  // change values of the calculator screen
  updateScreen() {
    this.currentOperationText.innerText += this.currentOperation;
  }
}

/* Instância da classe */
const calc = new Calculator(previousOperationText, currentOperationText);

/* Eventos de funcionamento da calculadora */
buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigitToScreen(value);
    } else {
      calc.processOperations(value);
    }
  });
});
