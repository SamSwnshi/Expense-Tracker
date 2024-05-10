import React from "react";

import { PieChart, Pie, Cell, Legend } from "recharts";

const RoundChart = ( data ) => {
  const categories = {};
  data.forEach((item) => {
    if (categories[item.category]) {
      categories[item.category] += parseInt(item.price, 10);
    } else {
      categories[item.category] = parseInt(item.price, 10);
    }
  });
  return Object.keys(categories).map((category) => ({
    name: category,
    value: categories[category],
  }));
};
const Graph = ({ data }) => {
  const process = RoundChart(data);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  return (
    <PieChart width={400} height={400}>
      <Pie
        cx={200}
        cy={200}
        outerRadius={150}
        fill="#8884d8"
     
        dataKey="value"
      >
 
        {process.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend/>
    </PieChart>
  );
};

export default Graph;
