const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";

document.addEventListener("DOMContentLoaded", async () => {
  const cryptoList = document.getElementById("cryptoList");
  const searchInput = document.getElementById("searchInput");
  let cryptocurrencies = []; // Almacena los datos de las criptomonedas
  let chart = null; // Referencia al gráfico actual

  try {
    // Obtén los datos iniciales de las criptomonedas
    cryptocurrencies = await fetchCryptocurrencies();
    displayCryptocurrencies(cryptocurrencies);
  } catch (error) {
    console.error("Error al cargar las criptomonedas:", error);
    cryptoList.innerHTML = `<p>Error al cargar los datos. Por favor, intenta nuevamente más tarde.</p>`;
  }

  // Filtra las criptomonedas al escribir en el campo de búsqueda
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = cryptocurrencies.filter(crypto =>
      crypto.name.toLowerCase().includes(query) ||
      crypto.symbol.toLowerCase().includes(query)
    );
    displayCryptocurrencies(filtered);
  });

  // Muestra la información de la criptomoneda al hacer clic
  cryptoList.addEventListener("click", async (event) => {
    const card = event.target.closest(".crypto-card");
    if (card) {
      const coinId = card.dataset.coinId;

      // Elimina cualquier información desplegada previamente
      const existingInfo = card.nextElementSibling;
      if (existingInfo && existingInfo.classList.contains("crypto-info")) {
        existingInfo.remove();
        if (chart) {
          chart.destroy(); // Destruye el gráfico actual
        }
        return; // Si ya estaba desplegado, lo cerramos
      }

      try {
        await showCryptoInfo(card, coinId);
      } catch (error) {
        console.error("Error al mostrar la información de la criptomoneda:", error);
      }
    }
  });

  // Función para obtener las criptomonedas desde la API
  async function fetchCryptocurrencies() {
    const response = await fetch(
      `${API_URL}&per_page=50&page=1&sparkline=false`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener datos de la API: ${response.status}`);
    }
    return await response.json();
  }

  // Función para mostrar las criptomonedas en la lista
  function displayCryptocurrencies(cryptos) {
    cryptoList.innerHTML = ""; // Limpia la lista
    if (cryptos.length === 0) {
      cryptoList.innerHTML = `<p>No se encontraron criptomonedas.</p>`;
      return;
    }

    cryptos.forEach(crypto => {
      const card = document.createElement("div");
      card.className = "crypto-card";
      card.dataset.coinId = crypto.id;
      card.innerHTML = `
        <img src="${crypto.image}" alt="${crypto.name} Logo" class="crypto-logo" />
        <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
        <p>Precio: $${crypto.current_price.toLocaleString()} USD</p>
        <p>Cambio 24h: ${crypto.price_change_percentage_24h?.toFixed(2) || "N/A"}%</p>
      `;
      cryptoList.appendChild(card);
    });
  }

  // Función para mostrar la información detallada y el gráfico de una criptomoneda
  async function showCryptoInfo(card, coinId) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    if (!response.ok) {
      throw new Error(`Error al obtener información de la API: ${response.status}`);
    }

    const coin = await response.json();

    // Obtén datos históricos para el gráfico
    let historicalData = [];
    try {
      historicalData = await fetchHistoricalData(coinId);
    } catch (error) {
      console.warn(`No se pudieron obtener datos históricos para ${coinId}:`, error);
    }

    // Crea la sección de información
    const infoSection = document.createElement("div");
    infoSection.className = "crypto-info";
    infoSection.innerHTML = `
      <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
      <p>Precio actual: $${coin.market_data.current_price.usd?.toLocaleString() || "N/A"} USD</p>
      <p>Capitalización de mercado: $${coin.market_data.market_cap.usd?.toLocaleString() || "N/A"} USD</p>
      <p>Volumen 24h: $${coin.market_data.total_volume.usd?.toLocaleString() || "N/A"} USD</p>
      <canvas id="priceChart"></canvas>
      <button id="closeInfo">Cerrar</button>
    `;
    card.insertAdjacentElement("afterend", infoSection);

    // Renderiza el gráfico, incluso si no hay datos históricos
    if (historicalData.length > 0) {
      renderChart(historicalData);
    } else {
      renderStaticChart(); // Renderiza un gráfico estático si no hay datos
    }

    // Cierra la información al hacer clic en el botón "Cerrar"
    document.getElementById("closeInfo").addEventListener("click", () => {
      infoSection.remove();
      if (chart) {
        chart.destroy(); // Destruye el gráfico actual
      }
    });
  }

  // Función para obtener datos históricos de una criptomoneda
  async function fetchHistoricalData(coinId) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener datos históricos: ${response.status}`);
    }
    const data = await response.json();
    return data.prices; // Devuelve un array de [timestamp, price]
  }

  // Función para renderizar el gráfico con datos históricos
  function renderChart(data) {
    const ctx = document.getElementById("priceChart").getContext("2d");
    const labels = data.map(item => new Date(item[0]).toLocaleDateString());
    const prices = data.map(item => item[1]);

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Precio (USD)",
          data: prices,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Fecha"
            }
          },
          y: {
            title: {
              display: true,
              text: "Precio (USD)"
            }
          }
        }
      }
    });
  }

  // Función para renderizar un gráfico estático
  function renderStaticChart() {
    const ctx = document.getElementById("priceChart").getContext("2d");
    const labels = ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5", "Día 6", "Día 7"];
    const prices = [100, 105, 102, 110, 108, 115, 120]; // Valores estáticos

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Precio (USD) - Estático",
          data: prices,
          borderColor: "rgba(192, 75, 75, 1)",
          backgroundColor: "rgba(192, 75, 75, 0.2)",
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Días"
            }
          },
          y: {
            title: {
              display: true,
              text: "Precio (USD)"
            }
          }
        }
      }
    });
  }
});