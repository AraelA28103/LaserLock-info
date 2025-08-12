document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const datasets = {
    robos_violentos: {
      label: 'Robos con violencia (RM)',
      years: [2019, 2020, 2021, 2022, 2023, 2024],
      data: [42000, 40000, 41000, 43000, 46000, 47536]
    },
    robos_lugar_habitado: {
      label: 'Robos en lugar habitado (RM)',
      years: [2019, 2020, 2021, 2022, 2023, 2024],
      data: [3200, 3300, 3500, 3600, 3604, 4383]
    },
    ensuc_robos_hogares: {
      label: 'ENUSC — % hogares',
      years: [2019, 2020, 2021, 2022, 2023, 2024],
      data: [4.1, 4.0, 3.8, 3.7, 3.6, 3.5]
    }
  };

  const ctx = document.getElementById('crimeChart');
  let currentKey = 'robos_violentos';

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: datasets[currentKey].years,
      datasets: [{
        label: datasets[currentKey].label,
        data: datasets[currentKey].data,
        borderWidth: 3,
        pointRadius: 5,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14,165,233,0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  document.getElementById('datasetSelect').addEventListener('change', e => {
    currentKey = e.target.value;
    chart.data.labels = datasets[currentKey].years;
    chart.data.datasets[0].data = datasets[currentKey].data;
    chart.data.datasets[0].label = datasets[currentKey].label;
    chart.update();
  });

  document.getElementById('playTrend').addEventListener('click', async () => {
    const fullData = datasets[currentKey].data;
    const tempData = new Array(fullData.length).fill(null);
    chart.data.datasets[0].data = tempData;
    chart.update();
    for (let i = 0; i < fullData.length; i++) {
      tempData[i] = fullData[i];
      chart.update();
      await new Promise(res => setTimeout(res, 400));
    }
  });

  document.getElementById('downloadChart').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = chart.toBase64Image();
    link.download = `estadisticas_${currentKey}.png`;
    link.click();
  });
});
