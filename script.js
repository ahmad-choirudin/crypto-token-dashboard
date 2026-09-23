const holdings = [
  { name: 'Ethereum', symbol: 'ETH', price: 3420.80, change: 4.2, amount: '4.2 ETH' },
  { name: 'Bitcoin', symbol: 'BTC', price: 63150.00, change: 1.8, amount: '0.15 BTC' },
  { name: 'Solana', symbol: 'SOL', price: 142.50, change: -2.1, amount: '18 SOL' },
  { name: 'Arbitrum', symbol: 'ARB', price: 1.12, change: 8.5, amount: '1200 ARB' }
];

function renderHoldings() {
  const container = document.getElementById('assetList');
  if (!container) return;

  container.innerHTML = holdings.map(item => {
    const isUp = item.change >= 0;
    const changeClass = isUp ? 'up' : 'down';
    const sign = isUp ? '+' : '';

    return `
      <li class="asset-row">
        <div class="asset-meta">
          <span class="asset-sym">${item.symbol}</span>
          <span class="asset-name">${item.name}</span>
        </div>
        <div class="asset-data">
          <div class="asset-price">$${item.price.toLocaleString()}</div>
          <div class="asset-change ${changeClass}">${sign}${item.change}%</div>
        </div>
      </li>
    `;
  }).join('');
}

function initChart() {
  const canvas = document.getElementById('mainChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
      datasets: [{
        data: [3280, 3310, 3290, 3350, 3380, 3395, 3420.80],
        borderColor: '#6366f1',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.1,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          displayColors: false,
          callbacks: {
            label: (ctx) => ` Price: $${ctx.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#64748b', font: { size: 11 } }
        },
        y: {
          grid: { color: '#1e293b' },
          ticks: { color: '#64748b', font: { size: 11 } }
        }
      }
    }
  });
}

function setupWalletButton() {
  const btn = document.getElementById('walletBtn');
  let isConnected = false;

  btn.addEventListener('click', () => {
    isConnected = !isConnected;
    if (isConnected) {
      btn.innerText = '0x71C...39A';
      btn.style.backgroundColor = '#10b981';
      btn.style.color = '#ffffff';
    } else {
      btn.innerText = 'Connect Wallet';
      btn.style.backgroundColor = 'var(--text)';
      btn.style.color = 'var(--bg)';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHoldings();
  initChart();
  setupWalletButton();
});
