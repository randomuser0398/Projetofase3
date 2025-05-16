import { getSaldo, setSaldo } from './storageService.js';

document.addEventListener("DOMContentLoaded", () => {
  const saldoElemento = document.getElementById("saldo");
  const valorApostaInput = document.getElementById("valor-aposta");
  const mensagemResultado = document.getElementById("mensagem-resultado");

  let saldo = getSaldo();
  atualizarSaldoNaTela(saldo);

  document.getElementById("girar-btn").addEventListener("click", () => {
    const aposta = parseFloat(valorApostaInput.value);
    if (aposta > saldo) {
      mensagemResultado.textContent = "Saldo insuficiente. Deposite!";
      return;
    }

    // lógica do slot
    const resultado = Math.random() < 0.3 ? aposta * 2 : 0;
    saldo = saldo - aposta + resultado;
    setSaldo(saldo);
    atualizarSaldoNaTela(saldo);

    mensagemResultado.textContent = resultado > 0
      ? `Você ganhou R$ ${resultado.toFixed(2)}!`
      : "Não foi dessa vez!";
  });

  function atualizarSaldoNaTela(s) {
    saldoElemento.textContent = `Saldo: R$ ${s.toFixed(2)}`;
  }
});
