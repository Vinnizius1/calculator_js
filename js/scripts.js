const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

/* Regra de Negócio */
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    /* valores já impressos na tela */
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;

    /* valor que o usuário está digitando neste momento */
    this.currentOperation = "";
  }

  /* métodos */
  addDigitToScreen(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;

    this.updateScreen();
  }

  updateScreen() {
    this.currentOperationText.innerText += this.currentOperation;
  }
}
const calc = new Calculator(previousOperationText, currentOperationText);

/* Eventos de funcionamento da calculadora */
buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigitToScreen(value);
    } else {
      console.log("Operação: " + value);
    }
  });
});
