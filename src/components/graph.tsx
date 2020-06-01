import { FunctionalComponent, h } from "preact";
import * as d3 from "d3";
import { useEffect } from "preact/hooks";
import { Reaction } from "../models/reaction";

interface IGraph {
  data: Reaction[] | undefined;
}

const Graph: FunctionalComponent<IGraph> = ({ data }) => {
  // sort function
  const sortByDescendingOrder = (data: Reaction[]): Reaction[] => {
    return data?.sort((a: any, b: any) =>
      d3.descending(
        a[Object.keys(a)[0]] as number,
        b[Object.keys(b)[0]] as number
      )
    );
  };

  // update graph
  const updateGraph = () => {
    drawGraph(data);
  };

  const drawGraph = (data: Reaction[] | undefined) => {
    if (data) {
      // remove old graph
      d3.select(".graph").html("");

      // sorting data in correct order
      const sortedData: Reaction[] = sortByDescendingOrder(data);
      // height and width variables
      const height: number = 450;
      const width: number =
        document.body.clientWidth < 1000 ? document.body.clientWidth : 1000;
      // margin variables
      const margin: { [key: string]: number } = {
        top: 30,
        right: 0,
        bottom: 50,
        left: 40,
      };

      const x: any = d3
        .scaleBand<number>()
        .domain(d3.range(sortedData.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(sortedData, (d: any) => d[Object.keys(d)[0]])])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = (g: any) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0));

      const yAxis = (g: any) =>
        g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

      // base svg node
      const graph = d3
        .select(".graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("margin", "auto")
        .style("display", "block");

      // appending bars
      graph
        .append("g")
        .attr("class", "bars")
        .selectAll("rect")
        .data(sortedData)
        .join("rect")
        .attr("fill", (d: Reaction) => d.color)
        .attr("x", (_: any, i: number): number => x(i))
        .attr("y", (d: any) => y(d[Object.keys(d)[0]] as number))
        .attr("height", (d: any) => y(0) - y(d[Object.keys(d)[0]] as number))
        .attr("width", x.bandwidth());

      // creating axises
      graph
        .append("g")
        .attr("class", "xAxis")
        .call(xAxis);

      graph
        .append("g")
        .attr("class", "yAxis")
        .call(yAxis);

      // removing text node(supposed to be for the xAxis text)
      graph
        .select(".xAxis")
        .selectAll("text")
        .remove();

      // appending svg into xAxis
      graph
        .select(".xAxis")
        .selectAll(".tick")
        .append("svg:image")
        .attr("xlink:href", (i: any) => {
          return `/assets/img/${Object.keys(sortedData[i])[0] as string}.svg`;
        })
        .attr("width", 30)
        .attr("height", 30)
        .attr("x", -15)
        .attr("y", 10);
    }
  };

  useEffect(() => {
    drawGraph(data);
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", updateGraph);
    return () => {
      window.removeEventListener("resize", updateGraph);
    };
  });

  return <div className="graph"></div>;
};

export default Graph;
