import { Doughnut } from "react-chartjs-2";
import { chart as ChartJs } from "chart.js/auto";

const DoughNutChart = ({ data }) => {
  return (
    <Doughnut
      data={{
        labels: ["LOC in Public Repos", "LOC in Private Repos"],
        datasets: [
          {
            data: data,
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 1,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughNutChart;
