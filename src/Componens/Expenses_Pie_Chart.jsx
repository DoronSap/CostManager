import React from "react";
import { Chart } from "react-google-charts";

// pie chart that show the expenses by category
const Expenses_Pie_Chart = ({ chartData }) => (
    <div>
        <h3>Expenses By Category </h3>
        <Chart
            chartType="PieChart"
            data={chartData}
            options={{
                is3D: true,
                colors: ["#FF6384", "#c6e0f3", "#f3ead4", "#AEE8E8"],
                backgroundColor: "#d7efef",
            }}
            width={"100%"}
            height={"400px"}
        />
    </div>
);

export default Expenses_Pie_Chart;
