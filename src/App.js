import { useEffect, useRef } from "react";
import "./App.css";
import * as Heatmap from "heatmap.js";

import data from "./log.json";

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

const keyStyle = {
	width: KEY_WIDTH,
	height: KEY_WIDTH,
	border: "1px solid black",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const rowStyle = {
	height: KEY_WIDTH,
	display: "flex",
	flexDirection: "row",
	width: "1200",
};

function App() {
	const heatmapElmtRef = useRef();
	const heatmap = useRef();

	useEffect(() => {
		if (heatmapElmtRef.current) {
			for (let child of heatmapElmtRef.current.children) {
				if (child.tagName.toLowerCase() === "canvas") {
					child.remove();
				}
			}
			heatmap.current = Heatmap.create({
				container: heatmapElmtRef.current,
				radius: KEY_WIDTH,
			});

			heatmap.current.setData(formatData(data.matrix));
		}
	}, []);
	return (
		<div className="App">
			<div
				id="heatmap"
				style={{ width: "1200px", height: "400px" }}
				ref={heatmapElmtRef}
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
					<div style={rowStyle}>
						<div className="key">⇥</div>
						<div className="key">
							<span>Q</span>
							<span>&</span>
						</div>
						<div className="key">
							<span>C</span>
							<span>{"<"}</span>
						</div>
						<div className="key">
							<span>L</span>
							<span>[</span>
						</div>
						<div className="key">
							<span>P</span>
							<span>]</span>
						</div>
						<div className="key">
							<span>B</span>
							<span>/</span>
						</div>
						<div className="key">
							<span>K</span>
						</div>
						<div className="key">
							<span>F</span>
							<span>"</span>
						</div>
						<div className="key">
							<span>O</span>
							<span>'</span>
						</div>
						<div className="key">
							<span>Y</span>
						</div>
						<div className="key">
							<span>-</span>
							<span>_</span>
						</div>
						<div className="key">
							<span>←</span>
						</div>
					</div>
					<div style={rowStyle}>
						<div className="key">
							<span>␛</span>
						</div>
						<div className="key">
							<span>A</span>
							<span>`</span>
						</div>
						<div className="key">
							<span>S</span>
							<span>=</span>
						</div>
						<div className="key">
							<span>R</span>
							<span>(</span>
						</div>
						<div className="key">
							<span>T</span>
							<span>)</span>
						</div>
						<div className="key">
							<span>G</span>
							<span>!</span>
						</div>
						<div className="key">
							<span>M</span>
							<span>^</span>
						</div>
						<div className="key">
							<span>N</span>
							<span>:</span>
						</div>
						<div className="key">
							<span>E</span>
							<span>;</span>
						</div>
						<div className="key">
							<span>I</span>
						</div>
						<div className="key">
							<span>U</span>
							<span>@</span>
						</div>
						<div className="key">
							<span>r</span>
							<span>$</span>
						</div>
					</div>
					<div style={rowStyle}>
						<div className="key">
							<span></span>
						</div>
						<div className="key">
							<span>Z</span>
							<span>|</span>
						</div>
						<div className="key">
							<span>V</span>
							<span>{">"}</span>
						</div>
						<div className="key">
							<span>J</span>
							<span>{"{"}</span>
						</div>
						<div className="key">
							<span>D</span>
							<span>{"}"}</span>
						</div>
						<div className="key">
							<span>W</span>
							<span>%</span>
						</div>
						<div className="key">
							<span>X</span>
							<span>+</span>
						</div>
						<div className="key">
							<span>H</span>
							<span>-</span>
						</div>
						<div className="key">
							<span>,</span>
							<span>#</span>
						</div>
						<div className="key">
							<span>.</span>
							<span>…</span>
						</div>
						<div className="key">
							<span>/</span>
							<span>\</span>
						</div>
						<div className="key">
							<span></span>
						</div>
					</div>
					<div style={rowStyle}>
						<div className="key"></div>
						<div className="key"></div>
						<div className="key"></div>
						<div className="key"></div>
						<div className="key">⇧</div>
						<div className="key">⎵</div>
						<div className="key">↲</div>
						<div className="key">⇧</div>
						<div className="key"></div>
						<div className="key"></div>
						<div className="key"></div>
						<div className="key"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
