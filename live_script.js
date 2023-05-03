let API_KEY = 'zcohruuzqcb2s7nldlhhw2yl05hflden';
let API_SECRET = 'prvvpnyjv0ygmbflx2uxh6vjzpek0gqk';
let STATION_ID = '147952'
let t = Math.floor(Date.now() / 1000);

let apiHashCur = `api-key${API_KEY}station-id${STATION_ID}t${t}`;

var apiSignatureCur = CryptoJS.HmacSHA256(apiHashCur, API_SECRET).toString();
let FULL_URL_CUR = (`https://api.weatherlink.com/v2/current/${STATION_ID}?api-key=${API_KEY}&t=${t}&api-signature=${apiSignatureCur}`);

fetch(FULL_URL_CUR).then(rep => rep.json()).then(
    data => {
        console.log(data)
        data = data.sensors[1].data[0];
        let humidity = data.hum;
        let aqi = data.aqi_val.toFixed(2);
        let heatIndex = toCelcius(data.heat_index);
        let temp = toCelcius(data.temp);
        let dewPoint = toCelcius(data.dew_point);
        let pm1 = data.pm_1.toFixed(2);
        let pm2p5 = data.pm_2p5.toFixed(2);
        let pm10 = data.pm_10.toFixed(2);
        let wetBulb = data.wet_bulb.toFixed(2);

        let table = `<table><caption>Current Weather Data from ${STATION_ID}</caption><tr><th>AQI</th><th>PM1</th><th>PM2.5</th><th>PM10</th><th>Temperature</th><th>Humidity</th><th>Heat Index</th><th>Dew Point</th><th>Wet Bulb</th></tr>`;
        table += `<tr><td>${aqi}</td><td>${pm1}</td><td>${pm2p5}</td><td>${pm10}</td><td>${temp}</td><td>${humidity}</td><td>${heatIndex}</td><td>${dewPoint}</td><td>${wetBulb}</td></tr></table>`;

        //document.getElementById('tableContainerCur').innerHTML = table;
        var gaugeOptions = {
          // other options
          textColor: "red"
        };

        var gauge1 = new JustGage({
            id: "gauge1",
            value:humidity,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });
        var gauge2 = new JustGage({
            id: "gauge2",
            value:aqi,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });
        var gauge3 = new JustGage({
            id: "gauge3",
            value:heatIndex,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });
        var gauge4 = new JustGage({
            id: "gauge4",
            value:temp,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });
        var gauge5 = new JustGage({
            id: "gauge5",
            value:dewPoint,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });
        var gauge6 = new JustGage({
            id: "gauge6",
            value:pm1,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });
        var gauge7 = new JustGage({
            id: "gauge7",
            value:pm2p5,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });
        var gauge8 = new JustGage({
            id: "gauge8",
            value:wetBulb,
            min: -10,
            max: 50,
            title: "Example Gauge",
            gaugeOptions: gaugeOptions
          });

      });

function toCelcius(num) {
    return ((num - 32) / 1.8).toFixed(2);
}
