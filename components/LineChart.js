import React from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';


const LineChart = ({ coinHistory }) => {
	const coinPrice = []
	const coinTimestamp = []


  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); 
    t.setMilliseconds(secs)
    return t.toLocaleString('en-IN', {dateStyle : "short",timeStyle : "short"});
}


  for(let i = 0; i < coinHistory?.prices?.length; i++){
    coinPrice.push(coinHistory?.prices[i][1]);
    coinTimestamp.push(toDateTime(coinHistory?.prices[i][0]))
  }


	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: 'Price In INR',
				data: coinPrice,
				backgroundColor: '#25b8d5',
				borderColor: '#25b8d5',
        lineTension: 0.5,
			},
		],
	}

	const options = {
    responsive: true,
		scales: {
			yAxes: 
				{
					grid : {
						borderColor : "#fff",
						tickColor: "#fff",
						tickLength: 4
				 	},
					ticks : {
						color: "#fff"
					}
				},
				xAxes: 
				{
					grid : {
						borderColor : "#fff",
						tickColor: "#fff",
						tickLength: 4
				 	},
					 ticks : {
						color: "#fff"
					}
				}			
		},
		plugins: {
			tooltip : {
				callbacks : {
					label : (ctx) => {
						return ctx.parsed.y;
					}
				}
			}
		}
	}

	const colorPlugin = {
		id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#293044';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
	}

	return (
		<div className="mt-8">
		<Line data={data} options={options} plugins= {[colorPlugin]}/>
		</div>
	)
}

export default LineChart
