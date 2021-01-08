// Chart.js
const GLOBAL_MEAN_TEMPERATURE = 14;
const context = document.getElementById("chart-js").getContext("2d");

// Getting and rendering data
fetchTemperatures()
  .then(parseTemperatures)
  .then(prepareTemperatures)
  .then(drawTemperatures);

// Fetching temperatures data from CSV file
function fetchTemperatures() {
  return fetch("./nasa-temperatures-data.csv").then((response) =>
    response.text()
  );
}

// Parsing CSV string into array of objects
function parseTemperatures(data) {
  return Papa.parse(data, { header: true }).data;
}

// Preparing data for rendering
function prepareTemperatures(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.global.push(+entry.Glob + GLOBAL_MEAN_TEMPERATURE);
      acc.northen.push(+entry.NHem + GLOBAL_MEAN_TEMPERATURE);
      acc.southern.push(+entry.SHem + GLOBAL_MEAN_TEMPERATURE);
      return acc;
    },
    { years: [], global: [], northen: [], southern: [] }
  );
}

// Rendering data
function drawTemperatures({ years, global, northen, southern }) {
  const tempChart = new Chart(context, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Global Mean Temperatures",
          data: global,
          backgroundColor: "rgba(0, 102, 0, 0.1)",
          borderColor: "rgba(0, 102, 0, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Northen Hemisphere Mean Temperatures",
          data: northen,
          backgroundColor: "rgba(0, 0, 204, 0.1)",
          borderColor: "rgba(0, 0, 204, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Southern Hemisphere Mean Temperatures",
          data: southern,
          backgroundColor: "rgba(255, 204, 102, 0.1)",
          borderColor: "rgba(255, 204, 102, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              callback(value) {
                return value + "°";
              },
            },
          },
        ],
      },
    },
  });
}
