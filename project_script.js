let API_KEY = "zcohruuzqcb2s7nldlhhw2yl05hflden";
let API_SECRET = "prvvpnyjv0ygmbflx2uxh6vjzpek0gqk";
let STATION_ID = "147952";
let t = Math.floor(Date.now() / 1000);
const select = document.getElementById('station');

let firstDateString = "2023-02-11T14:45:00";
let secondDateString = "2023-02-11T16:00:00";
let firstDate = new Date(firstDateString);
let secondDate = new Date(secondDateString);

const unixTimeFirst = firstDate.getTime();
const unixTimeSecond = secondDate.getTime();

const unixTimeInSecondsFirst = unixTimeFirst / 1000;
const unixTimeInSecondsSecond = unixTimeSecond / 1000;

let apiHashHis = `api-key${API_KEY}end-timestamp${unixTimeInSecondsSecond}start-timestamp${unixTimeInSecondsFirst}station-id${STATION_ID}t${t}`;
var apiSignatureHis = CryptoJS.HmacSHA256(apiHashHis, API_SECRET).toString();

let FULL_URL_HIS = `https://api.weatherlink.com/v2/historic/${STATION_ID}?api-key=${API_KEY}&t=${t}&start-timestamp=${unixTimeInSecondsFirst}&end-timestamp=${unixTimeInSecondsSecond}&api-signature=${apiSignatureHis}`;
var myChart = null;

fetch(FULL_URL_HIS)
  .then((rep) => rep.json())
  .then((data) => {
    data = data.sensors[1].data;
    console.log(data);
    firstDate = new Date(firstDate.getTime() + 15 * 60 * 1000);

    var date = [];
    var value = [];

    data.forEach(function (measurement) {
      date.push(date.length + 1);
      value.push(parseFloat(toCelcius(measurement.temp_avg)));
    });

    console.log(value);
    console.log(date);
    // setup
    const ctx = document.getElementById("myChart").getContext("2d");

    if(myChart == null){
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              label: "Temperature",
              data: value,
              backgroundColor: "#12674a",
              borderColor: "#12674a",
              borderWidth: 3, // <-- increase line width to 3
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "white", // <-- set legend label color to white
              },
            },
          },
          scales: {
            y: {
              ticks: {
                color: "white", // <-- set axis values to white
              },
            },
            x: {
              ticks: {
                color: "white", // <-- set axis values to white
              },
            },
          },
        },
      });
    } else {
      myChart.options.plugins.legend.labels.color = "white";
      myChart.options.scales.y.ticks.color = "white";
      myChart.options.scales.x.ticks.color = "white";
      myChart.data.datasets[0].borderColor = "#12674a"; // <-- set line color
      myChart.data.datasets[0].pointBackgroundColor = "#12674a"; // <-- set point color

      myChart.update();
    }
    
    
    
  });

select.addEventListener('change', function handleChange(event) {
  console.log(event.target.value); // 👉️ get selected VALUE
  STATION_ID = event.target.value;
  t = Math.floor(Date.now() / 1000);
  apiHashHis = `api-key${API_KEY}end-timestamp${unixTimeInSecondsSecond}start-timestamp${unixTimeInSecondsFirst}station-id${STATION_ID}t${t}`;
  apiSignatureHis = CryptoJS.HmacSHA256(apiHashHis, API_SECRET).toString();
  FULL_URL_HIS = `https://api.weatherlink.com/v2/historic/${STATION_ID}?api-key=${API_KEY}&t=${t}&start-timestamp=${unixTimeInSecondsFirst}&end-timestamp=${unixTimeInSecondsSecond}&api-signature=${apiSignatureHis}`;

  fetch(FULL_URL_HIS)
  .then((rep) => rep.json())
  .then((data) => {
    data = data.sensors[1].data;
    console.log(data);
    firstDate = new Date(firstDate.getTime() + 15 * 60 * 1000);

    var date = [];
    var value = [];

    data.forEach(function (measurement) {
      date.push(date.length + 1);
      value.push(parseFloat(toCelcius(measurement.temp_avg)));
    });

    console.log(value);
    console.log(date);
    // setup
    const ctx = document.getElementById("myChart").getContext("2d");

    if(myChart != null){
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: date,
        datasets: [
          {
            label: "Temperature",
            data: value,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    });
  });
});



// document.getElementById("tableContainerHis").innerHTML = table;

function toCelcius(num) {
  return ((num - 32) / 1.8).toFixed(2);
}
