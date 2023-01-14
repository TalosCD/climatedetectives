




  const charData = "dataSheet.csv";

d3.csv(charData).then(function(datapoints){

  console.log(datapoints)
  const date = [];
  //const hour = [];
  const value = [];

  let suitability_control = 0;
  for (i =0; i <datapoints.length; i++){

    if (datapoints[i].Date == "Third"){
      for (j =i+1; j <datapoints.length; j++){

        if (datapoints[j].Date == "ok"){
          break;
        }
        else{
          date.push(datapoints[j].Date);
          //hour.push(datapoints[j].Hour);
          value.push(datapoints[j].Value);
        }
      }
      break;
    }
    
  }
  
  console.log(value)
// setup 
const data = {
  labels: date,
  datasets: [{
    label: 'Weekly Sales',
    data: value,
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  }]
};

// config 
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

});
