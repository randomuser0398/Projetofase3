
document.addEventListener('DOMContentLoaded', () => {
  const saldoElement = document.getElementById('saldo') || document.getElementById('wallet-balance');
  const valorApostaInput = document.getElementById('valor-aposta');
  const botaoGirar = document.getElementById('girar-btn');
  const mensagemResultado = document.getElementById('mensagem-resultado');
  const depositBtn = document.getElementById('deposit-btn');
  const withdrawBtn = document.getElementById('withdraw-btn');

  const simbolos = ['🍒', '⭐️', '💎', '☠️', '⚓', '🏴‍☠️'];

  function getSaldo() {
    return parseInt(localStorage.getItem('saldo')) || 0;
  }

  function setSaldo(valor) {
    localStorage.setItem('saldo', valor);
    if (saldoElement) {
      saldoElement.textContent = `Saldo: R$ ${valor.toFixed(2)}`;
    }
  }

  function mostrarMensagem(texto) {
    if (mensagemResultado) {
      mensagemResultado.textContent = texto;
    }
  }

  function girarSlots() {
    const aposta = parseInt(valorApostaInput.value);

    if (isNaN(aposta) || aposta < 1) {
      mostrarMensagem("Informe um valor válido para a aposta.");
      return;
    }

    let saldo = getSaldo();
    if (aposta > saldo) {
      mostrarMensagem("Saldo insuficiente. Deposite mais moedas!");
      return;
    }

    saldo -= aposta;

    const resultado = [
      simbolos[Math.floor(Math.random() * simbolos.length)],
      simbolos[Math.floor(Math.random() * simbolos.length)],
      simbolos[Math.floor(Math.random() * simbolos.length)]
    ];

    document.getElementById('reel1').textContent = resultado[0];
    document.getElementById('reel2').textContent = resultado[1];
    document.getElementById('reel3').textContent = resultado[2];

    let ganho = 0;
    if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
      ganho = aposta * 10;
      mostrarMensagem(`Você ganhou R$ ${ganho.toFixed(2)}!`);
    } else {
      mostrarMensagem(`Não foi dessa vez, tente novamente.`);
    }

    saldo += ganho;
    setSaldo(saldo);
  }

  if (botaoGirar) {
    botaoGirar.addEventListener('click', girarSlots);
  }

  if (depositBtn) {
    depositBtn.addEventListener('click', () => {
      const valor = parseInt(document.getElementById('deposit-amount').value);
      if (!isNaN(valor) && valor > 0) {
        const novoSaldo = getSaldo() + valor;
        setSaldo(novoSaldo);
        mostrarMensagem(`Depósito de R$ ${valor} realizado com sucesso.`);
      }
    });
  }

  if (withdrawBtn) {
    withdrawBtn.addEventListener('click', () => {
      const valor = parseInt(document.getElementById('withdraw-amount').value);
      const saldo = getSaldo();
      if (!isNaN(valor) && valor > 0 && valor <= saldo) {
        const novoSaldo = saldo - valor;
        setSaldo(novoSaldo);
        mostrarMensagem(`Saque de R$ ${valor} realizado com sucesso.`);
      } else {
        mostrarMensagem("Saque inválido ou saldo insuficiente.");
      }
    });
  }

  // Inicializa saldo na tela
  setSaldo(getSaldo());
});
