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
    if (currentOperationText.innerText === "" && operation !== "C") {
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
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "=":
        this.processEqualOperator();
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

  // change math operations
  changeOperation(operation) {
    const mathOperations = ["+", "-", "/", "*"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    // método slice para pegar e remover o último caractere - operador - e colocar um novo operador
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // clear current operation
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  // clear all operations
  processClearOperation() {
    this.previousOperationText.innerText = "";
    this.currentOperationText.innerText = "";
  }

  // process "final" operation
  processEqualOperator() {
    let finalValue;
    const operation = previousOperationText.innerText.split(" ")[1];
    const previousNumber = +previousOperationText.innerText.split(" ")[0];
    const currentNumber = +currentOperationText.innerText;

    if (operation === "+") {
      finalValue = previousNumber + currentNumber;
    } else if (operation === "-") {
      finalValue = previousNumber - currentNumber;
    } else if (operation === "*") {
      finalValue = previousNumber * currentNumber;
    } else {
      finalValue = previousNumber / currentNumber;
    }

    // set final value as 'current' value (final value)
    this.currentOperationText.innerText = finalValue;
    // clear previous number
    this.previousOperationText.innerText = "";

    /* Utilizando o método EVAL é mais fácil, porém não é recomendado pela Documentação */
    // const processedFinalValue = `${previousNumber} ${operation} ${currentNumber}`;
    // this.currentOperationText.innerText = eval(processedFinalValue);
    // this.previousOperationText.innerText = "";

    /* Código final da aula: */
    // envio o "sinal da operação" como argumento para ser executado na função:
    // this.processOperations(operation);
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
