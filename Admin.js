function formatar(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function atualizarPainel() {
  const arrecadado = Number(localStorage.getItem("totalArrecadado") || 0);
  const pago = Number(localStorage.getItem("totalPago") || 0);
  const jackpot = Number(localStorage.getItem("jackpot") || 0);

  document.getElementById("total-arrecadado").textContent = formatar(arrecadado);
  document.getElementById("total-pago").textContent = formatar(pago);
  document.getElementById("jackpot-acumulado").textContent = formatar(jackpot);
}

document.getElementById("reset-stats").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja apagar as estatísticas?")) {
    localStorage.setItem("totalArrecadado", 0);
    localStorage.setItem("totalPago", 0);
    localStorage.setItem("jackpot", 0);
    atualizarPainel();
  }
});

atualizarPainel();
