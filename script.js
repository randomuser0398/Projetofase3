
const slots = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];
const simbolos = ['🍒', '⭐️', '💎', '🍋', '🔔'];
function getSaldo() {
  const saldoText = localStorage.getItem('saldo') || '0';
  return parseFloat(saldoText);
}
function setSaldo(valor) {
  localStorage.setItem('saldo', valor.toFixed(2));
  const saldoElem = document.getElementById('saldo');
  if (saldoElem) saldoElem.textContent = `Saldo: R$ ${valor.toFixed(2)}`;
}
function girarSlots() {
  const aposta = parseFloat(document.getElementById('valor-aposta').value) || 10;
  let saldoAtual = getSaldo();
  if (saldoAtual < aposta) {
    alert('Saldo insuficiente! Recarregue para continuar.');
    return;
  }
  saldoAtual -= aposta;
  const resultados = [];
  slots.forEach(slot => {
    const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];
    slot.textContent = simbolo;
    slot.classList.remove('win-animation');
    resultados.push(simbolo);
  });
  const premio = (resultados[0] === resultados[1] && resultados[1] === resultados[2]) ? aposta * 2 : 0;
  saldoAtual += premio;
  setSaldo(saldoAtual);
  if (premio > 0) {
    alert(`Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
  } else {
    alert('Tente novamente!');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setSaldo(getSaldo());
  const btn = document.getElementById('girar-btn');
  if (btn) btn.addEventListener('click', girarSlots);
});
