import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import "../App.css";

const SeverityChart = ({ incidents }) => {
  
  const severityCounts = incidents.reduce((acc, incident) => {
    acc[incident.severity] = (acc[incident.severity] || 0) + 1;
    return acc;
  }, {});

  const totalIncidents = incidents.length;
  const data = Object.entries(severityCounts).map(([severity, count]) => ({
    name: severity,
    value: (count / totalIncidents) * 100,
    count: count
  }));

  const COLORS = {
    Low: "#34A853",
    Medium: "#FBBC05",
    High: "#EA4335"
  };

  return (
    <div className="severity-chart-container">
      <h2 className="severity-heading">Severity</h2>
      <div className="charts">
        {data.map((entry) => (
          <div key={entry.name} className="chart">
            <PieChart width={150} height={150}>
              <Pie
                data={[
                  { name: entry.name, value: entry.value },
                  { name: "Remaining", value: 100 - entry.value },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={35}
                innerRadius={18}
                dataKey="value"
                startAngle={180}
                endAngle={-360}
              >
                <Cell fill={COLORS[entry.name]} />
                <Cell fill="#E0E0E0" />
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  fill: COLORS[entry.name],
                }}
              >
                {entry.value.toFixed(1)}%
              </text>
              <Tooltip />
            </PieChart>
            <p>{entry.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeverityChart;
