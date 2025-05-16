// efiService.js (futuro conector com o banco Efi)

const API_BASE = "https://api.seubanco.com.br"; // Placeholder

export async function consultarSaldo(userId) {
  try {
    const response = await fetch(`${API_BASE}/saldo/${userId}`);
    return await response.json();
  } catch (error) {
    console.warn("API OFFLINE, usando localStorage");
    return localStorage.getItem('saldo') || 0;
  }
}

export async function depositar(userId, valor) {
  try {
    const response = await fetch(`${API_BASE}/deposito`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, valor }),
    });
    return await response.json();
  } catch (error) {
    console.warn("Depósito offline");
    let saldoAtual = parseFloat(localStorage.getItem('saldo') || 0);
    saldoAtual += valor;
    localStorage.setItem('saldo', saldoAtual);
    return { sucesso: true, saldo: saldoAtual };
  }
}
