export function getSaldo() {
  return parseFloat(localStorage.getItem('saldo')) || 0;
}

export function setSaldo(valor) {
  localStorage.setItem('saldo', valor);
}