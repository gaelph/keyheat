import { useEffect, useRef } from "react";
import "./App.css";
import * as Heatmap from "heatmap.js";

import data from "./log.json";
import Layers from "./layers";

function formatData(matrix) {
  let entries = [];
  let max = 0;

  Object.entries(matrix).forEach(([r, row]) => {
    Object.entries(row).forEach(([c, col]) => {
      const entry = {
        x: (c + 1) * 6 + 40,
        y: (r + 1) * 6 + 40,
        value: col,
      };
      if (entry.value > max) max = entry.value;

      entries.push(entry);
    });
  });

  entries = entries.map((e) => {
    e.value = e.value > 0 ? e.value / max : 0.001;
    e.value = 1 + Math.log(e.value / 4 + 0.01);
    return e;
  });
  max = entries.map((e) => e.value).reduce((m, e) => (e > m ? e : m), 0);
  let min = entries.map((e) => e.value).reduce((m, e) => (e < m ? e : m), 0);
  // max = 1;
  // console.log(entries);

  return {
    max,
    min,
    data: entries,
  };
}

const KEY_WIDTH = 59;

const rowStyle = {
  height: KEY_WIDTH,
  display: "flex",
  flexDirection: "row",
  width: "1200",
};

function HeatmapComponent({ layerId, matrix }) {
  const canvasRef = useRef();
  const heatmap = useRef();
  useEffect(() => {
    if (canvasRef.current) {
      for (let child of canvasRef.current.children) {
        if (child.tagName.toLowerCase() === "canvas") {
          child.remove();
        }
      }
      heatmap.current = Heatmap.create({
        container: canvasRef.current,
        radius: KEY_WIDTH,
      });

      heatmap.current.setData(formatData(matrix));
    }
  }, [matrix]);

  return (
    <>
      <h3>Layer #{layerId}</h3>
      <div
        id="heatmap"
        style={{ width: "1200px", height: "400px" }}
        ref={canvasRef}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: 17,
            left: 17,
            width: "100%",
            height: "100%",
          }}
        >
          {Layers[layerId].map((layerRow) => (
            <div style={rowStyle}>
              {layerRow.map((char) => (
                <div className="key">
                  <span>{char}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ul>
        {data.layers.map((matrix, layerId) => {
          if (matrix === null || matrix === undefined) return null;
          return (
            <li key={layerId}>
              <HeatmapComponent matrix={matrix} layerId={layerId} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
