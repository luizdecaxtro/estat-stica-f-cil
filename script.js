function calcular() {
  // Amplitude
const amplitude = Math.max(...numeros) - Math.min(...numeros);

// Quartis
function calcularQuartil(q) {
  const pos = (q * (n + 1)) / 4;
  const i = Math.floor(pos) - 1;
  const f = pos - Math.floor(pos);
  if (i < 0) return ordenados[0];
  if (i >= n - 1) return ordenados[n - 1];
  return ordenados[i] + f * (ordenados[i + 1] - ordenados[i]);
}
const Q1 = calcularQuartil(1);
const Q3 = calcularQuartil(3);

// Variância amostral
const varianciaAmostral = numeros.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / (n - 1);

// Adiciona ao HTML
document.getElementById("saida").innerHTML += `
  <p><strong>Amplitude:</strong> ${amplitude}</p>
  <p><strong>Quartil 1 (Q1):</strong> ${Q1.toFixed(2)}</p>
  <p><strong>Quartil 3 (Q3):</strong> ${Q3.toFixed(2)}</p>
  <p><strong>Variância Amostral:</strong> ${varianciaAmostral.toFixed(2)}</p>
`;

// Gráfico de barras
const ctx = document.getElementById("grafico").getContext("2d");
const contagem = {};
numeros.forEach(num => contagem[num] = (contagem[num] || 0) + 1);
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(contagem),
    datasets: [{
      label: 'Frequência',
      data: Object.values(contagem),
      backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

  const entrada = document.getElementById("dados").value;
  const numeros = entrada.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
  if (numeros.length === 0) return alert("Insira números válidos!");

  const n = numeros.length;
  const soma = numeros.reduce((a, b) => a + b, 0);
  const media = soma / n;

  const ordenados = [...numeros].sort((a, b) => a - b);
  const mediana = n % 2 === 0 ? (ordenados[n/2 - 1] + ordenados[n/2]) / 2 : ordenados[Math.floor(n/2)];

  const freq = {};
  numeros.forEach(num => freq[num] = (freq[num] || 0) + 1);
  const maxFreq = Math.max(...Object.values(freq));
  const moda = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);

  const variancia = numeros.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / n;
  const desvio = Math.sqrt(variancia);

  const saida = `
    <h3>Resultados:</h3>
    <p><strong>Média:</strong> ${media.toFixed(2)}</p>
    <p><strong>Mediana:</strong> ${mediana}</p>
    <p><strong>Moda:</strong> ${moda.join(", ")}</p>
    <p><strong>Desvio Padrão:</strong> ${desvio.toFixed(2)}</p>
    <hr>
    <p><strong>Fórmulas:</strong></p>
    <ul>
      <li>Média: soma dos valores ÷ quantidade</li>
      <li>Mediana: valor central (ou média dos centrais)</li>
      <li>Moda: valor(es) mais frequente(s)</li>
      <li>Desvio padrão: raiz da variância</li>
    </ul>
  `;
  document.getElementById("saida").innerHTML = saida;
}

function lerExplicacao() {
  const texto = `
    A média é a soma dos valores dividida pela quantidade.
    A mediana é o valor central dos dados ordenados.
    A moda é o valor que mais se repete.
    O desvio padrão mede a dispersão dos dados.
    A amplitude é a diferença entre o maior e o menor valor.
    Os quartis dividem os dados em quatro partes iguais.
    A variância amostral é a média dos quadrados das diferenças em relação à média, dividida por n menos 1.
  `;
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  speechSynthesis.speak(fala);
}

