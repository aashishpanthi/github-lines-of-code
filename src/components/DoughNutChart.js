import { Doughnut } from "react-chartjs-2";
import { chart as ChartJs } from "chart.js/auto";

const DoughNutChart = ({ data }) => {
  return (
    <Doughnut
      data={{
        labels: ["Public Repos", "Private Repos"],
        datasets: [
          {
            data: data,
            backgroundColor: ["#fe3533", "#bc4500"],
            hoverOffset: 1,
          },
        ],
      }}
      options={{
        cutout: "55%",
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || "";

                if (label) {
                  label += ": ";
                }

                let formatter = Intl.NumberFormat("en", {
                  notation: "compact",
                });

                label += formatter.format(
                  context.formattedValue.replace(/,/g, "")
                );

                console.log(label);
                return label;
              },
            },
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughNutChart;
