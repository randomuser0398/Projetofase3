import { getSaldo, setSaldo } from './storageService.js';

document.addEventListener('DOMContentLoaded', () => {
  const saldoElemento = document.getElementById('saldo') || document.getElementById('wallet-balance');
  const mensagem = document.getElementById('mensagem-resultado') || document.getElementById('wallet-message');

  function atualizarSaldo() {
    const saldo = getSaldo();
    if (saldoElemento) saldoElemento.textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
  }

  if (document.getElementById('girar-btn')) {
    document.getElementById('girar-btn').addEventListener('click', () => {
      const valorAposta = parseFloat(document.getElementById('valor-aposta').value);
      const saldoAtual = getSaldo();

      if (valorAposta > saldoAtual) {
        mensagem.textContent = "Saldo insuficiente. Deposite mais créditos.";
        return;
      }

      const simbolos = ['🍒', '⭐️', '💎'];
      const resultado = [0, 0, 0].map(() => simbolos[Math.floor(Math.random() * simbolos.length)]);

      document.getElementById('reel1').textContent = resultado[0];
      document.getElementById('reel2').textContent = resultado[1];
      document.getElementById('reel3').textContent = resultado[2];

      setSaldo(saldoAtual - valorAposta);

      if (resultado.every(s => s === resultado[0])) {
        const ganho = valorAposta * 3;
        setSaldo(getSaldo() + ganho);
        mensagem.textContent = `Você ganhou R$ ${ganho.toFixed(2)}!`;
      } else {
        mensagem.textContent = "";
      }

      atualizarSaldo();
    });
  }

  if (document.getElementById('deposit-btn')) {
    document.getElementById('deposit-btn').addEventListener('click', () => {
      const valor = parseFloat(document.getElementById('deposit-amount').value);
      setSaldo(getSaldo() + valor);
      mensagem.textContent = "Depósito realizado com sucesso!";
      atualizarSaldo();
    });
  }

  if (document.getElementById('withdraw-btn')) {
    document.getElementById('withdraw-btn').addEventListener('click', () => {
      const valor = parseFloat(document.getElementById('withdraw-amount').value);
      const saldoAtual = getSaldo();
      if (valor <= saldoAtual) {
        setSaldo(saldoAtual - valor);
        mensagem.textContent = "Saque realizado com sucesso!";
      } else {
        mensagem.textContent = "Saldo insuficiente para saque.";
      }
      atualizarSaldo();
    });
  }

  atualizarSaldo();
});