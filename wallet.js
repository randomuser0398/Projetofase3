
document.addEventListener('DOMContentLoaded', () => {
  const saldoEl = document.getElementById('wallet-balance');
  const depositoInput = document.getElementById('deposit-amount');
  const saqueInput = document.getElementById('withdraw-amount');
  const btnDepositar = document.getElementById('deposit-btn');
  const btnSacar = document.getElementById('withdraw-btn');
  const msg = document.getElementById('wallet-message');

  function atualizarSaldoUI() {
    const saldo = parseFloat(localStorage.getItem('saldo') || '0');
    saldoEl.textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
  }

  btnDepositar.addEventListener('click', () => {
    const valor = parseFloat(depositoInput.value);
    if (!isNaN(valor) && valor > 0) {
      const atual = parseFloat(localStorage.getItem('saldo') || '0');
      localStorage.setItem('saldo', (atual + valor).toFixed(2));
      atualizarSaldoUI();
      msg.textContent = "Depósito realizado com sucesso!";
    }
  });

  btnSacar.addEventListener('click', () => {
    const valor = parseFloat(saqueInput.value);
    const atual = parseFloat(localStorage.getItem('saldo') || '0');
    if (!isNaN(valor) && valor > 0 && valor <= atual) {
      localStorage.setItem('saldo', (atual - valor).toFixed(2));
      atualizarSaldoUI();
      msg.textContent = "Saque realizado com sucesso!";
    } else {
      msg.textContent = "Valor inválido ou saldo insuficiente.";
    }
  });

  atualizarSaldoUI();
});
