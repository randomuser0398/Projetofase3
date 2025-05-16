// Responsável por salvar e recuperar saldo local

export function getSaldo() {
  return parseFloat(localStorage.getItem("saldo")) || 0;
}

export function setSaldo(valor) {
  localStorage.setItem("saldo", valor.toFixed(2));
}
