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
    const previous = +this.previousOperationText.innerText;
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      default:
        return;
    }
  }

  // change values of the calculator screen // 36:44
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    }

    // check if value is zero, if it is just add current value
    if (previous === 0) {
      operationValue = current;
    }
  }
}

/* Instância da classe */
const calc = new Calculator(previousOperationText, currentOperationText);

/* Eventos no DOM para funcionamento da calculadora */
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
