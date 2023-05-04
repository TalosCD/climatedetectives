let API_KEY = 'zcohruuzqcb2s7nldlhhw2yl05hflden';
let API_SECRET = 'prvvpnyjv0ygmbflx2uxh6vjzpek0gqk';
let STATION_ID = '147952'
let t = Math.floor(Date.now() / 1000);
const select = document.getElementById('station');
var gaugeOptions = {
  // other options
  textColor: "red"
};
var gauge1 = new JustGage({
  id: "gauge1",
  value:0,
  min: 0,
  max: 100,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});
var gauge2 = new JustGage({
  id: "gauge2",
  value:0,
  min: 0,
  max: 150,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});
var gauge3 = new JustGage({
  id: "gauge3",
  value:-10,
  min: -10,
  max: 50,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});
var gauge4 = new JustGage({
  id: "gauge4",
  value:-10,
  min: -10,
  max: 50,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});
var gauge5 = new JustGage({
  id: "gauge5",
  value:-10,
  min: -10,
  max: 50,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});
var gauge6 = new JustGage({
  id: "gauge6",
  value:-10,
  min: 0,
  max: 50,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});
var gauge7 = new JustGage({
  id: "gauge7",
  value:-10,
  min: -10,
  max: 50,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});
var gauge8 = new JustGage({
  id: "gauge8",
  value:40,
  min: 40,
  max: 120,
  title: "Example Gauge",
  gaugeOptions: gaugeOptions
});

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

     
      
      console.log(gauge1);
      gauge1.refresh(humidity);
      console.log(gauge1);
      gauge2.refresh(aqi);
      gauge3.refresh(heatIndex);
      gauge4.refresh(temp);
      gauge5.refresh(dewPoint);
      gauge6.refresh(pm10);
      gauge7.refresh(pm2p5);
      gauge8.refresh(wetBulb);
    });

select.addEventListener('change', function handleChange(event) {
  console.log(event.target.value); // 👉️ get selected VALUE
  STATION_ID = event.target.value;
  t = Math.floor(Date.now() / 1000);

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

         
          
          console.log(gauge1);
          gauge1.refresh(humidity);
          console.log(gauge1);
          gauge2.refresh(aqi);
          gauge3.refresh(heatIndex);
          gauge4.refresh(temp);
          gauge5.refresh(dewPoint);
          gauge6.refresh(pm10);
          gauge7.refresh(pm2p5);
          gauge8.refresh(wetBulb);
        });
});

function toCelcius(num) {
    return ((num - 32) / 1.8).toFixed(2);
}
