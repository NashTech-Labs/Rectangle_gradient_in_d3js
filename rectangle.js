// Rectangle chart data (example data for five categories)
const data = [
    { category: "Category 1", value: 0.8 },
    { category: "Category 2", value: 0.6 },
    { category: "Category 3", value: 0.9 },
    { category: "Category 4", value: 0.7 },
    { category: "Category 5", value: 0.5 },
  ];
  
  // SVG dimensions
  const width = 600;
  const height = 600;
  
  // Create an SVG container
  const svg = d3.select("#rectangle-chart").append("svg")
    .attr("width", width)
    .attr("height", height);
  
  // Define the gradient
  const gradient = svg.append("defs").append("linearGradient")
    .attr("id", "rectangle-gradient")
    .attr("x1", "50%")
    .attr("y1", "50%")
    .attr("x2", "100%")
    .attr("y2", "100%");
  
  // Define color stops
  gradient.append("stop")
    .attr("offset", "13.02%")
    .style("stop-color", "#D6001C");
  
  gradient.append("stop")
    .attr("offset", "98.28%")
    .style("stop-color", "#6A1F7A");
  
  // rectangle chart parameters
  const centerX = width ;
  const centerY = height ;
  const radius = Math.min(centerX, centerY) - 20;
  
  // Create a radial scale for the categories
  const scale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 1000]);
  
  // Create a function to generate the points of the rectangle chart
  const rectangleLine = d3.radialLine()
    .curve(d3.curveCardinalClosed)
    .angle((d, i) => (i * 2 * Math.PI) / data.length)
    .radius(d => scale(d.value));
  
  // Create the rectangle path
  svg.append("path")
    .datum(data)
    .attr("d", rectangleLine)
    .attr("fill", "url(#rectangle-gradient)")
    .attr("stroke", "#000")
    .attr("stroke-width", 2)
    .attr("fill-opacity", 0.6);
  
  // Add data points
  svg.selectAll(".data-point")
    .enter().append("circle")
    .attr("class", "data-point")
    .attr("r", 5)
    .attr("cx", (d, i) => centerX + scale(d.value) * Math.cos((i * 2 * Math.PI) / data.length))
    .attr("cy", (d, i) => centerY + scale(d.value) * Math.sin((i * 2 * Math.PI) / data.length))
    .attr("fill", "#000");
  
  // Add labels for categories
  svg.selectAll(".label")
    .enter().append("text")
    .attr("class", "label")
    .attr("x", (d, i) => centerX + (scale(d.value) + 10) * Math.cos((i * 2 * Math.PI) / data.length))
    .attr("y", (d, i) => centerY + (scale(d.value) + 10) * Math.sin((i * 2 * Math.PI) / data.length))
    .text(d => d.category);
  