const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

/* Regra de Negócio */
class Calculator {}

/* Eventos de funcionamento da calculadora */
buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log("Número ou ponto: " + value);
    } else {
      console.log("Operação: " + value);
    }
  });
});
