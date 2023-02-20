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
    // check if current is empty:
    if (currentOperationText.innerText === "") {
      // change operation:
      if (previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      // este 'return' impedirá a mudança de operação quando não tiver nenhum número na tela
      return;
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      default:
        return;
    }
  }

  // change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // check if value is "zero", if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }

      // add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
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
