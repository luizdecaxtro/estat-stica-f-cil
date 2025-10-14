function calcular() {
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
    O desvio padrão mede a dispersão dos dados em relação à média.
  `;
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  speechSynthesis.speak(fala);
}
