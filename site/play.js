const board = document.querySelector("#board");
const bridges = document.querySelector("#bridges");
const ticks = document.querySelector("#ticks");
const statusLine = document.querySelector("#status");
const count = document.querySelector("#count");
const undo = document.querySelector("#undo");
const restart = document.querySelector("#restart");
const stationButtons = new Map();
const bridgeLines = new Map();
let path = [Trace.start];

function select(station, followFocus) {
  const next = Trace.move(path, station);
  if (next === path) return;
  path = next;
  render();
  if (followFocus) stationButtons.get(station).focus();
}

for (const bridge of Trace.bridges) {
  const [from, to] = bridge;
  const [x1, y1] = Trace.stations[from];
  const [x2, y2] = Trace.stations[to];
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  for (const [name, value] of Object.entries({ x1, y1, x2, y2 })) {
    line.setAttribute(name, value);
  }
  line.classList.add("bridge");
  bridgeLines.set(bridge, line);
  bridges.append(line);

  const tick = document.createElement("span");
  tick.classList.add("tick");
  ticks.append(tick);
}

for (const [station, [x, y]] of Object.entries(Trace.stations)) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("station");
  button.classList.toggle("finish", station === Trace.finish);
  button.style.left = `${x / 360 * 100}%`;
  button.style.top = `${y / 232 * 100}%`;
  const label = document.createElement("span");
  label.textContent = station;
  button.append(label);
  button.addEventListener("click", (event) => select(station, event.detail === 0));
  stationButtons.set(station, button);
  board.append(button);
}

function render() {
  const current = Trace.current(path);
  const used = Trace.used(path);
  const available = Trace.available(path);
  for (const [bridge, line] of bridgeLines) {
    line.classList.toggle("used", used.includes(bridge));
    line.classList.toggle("available", bridge.includes(current) && !used.includes(bridge));
  }
  for (const [station, button] of stationButtons) {
    const isAvailable = available.includes(station);
    const name = station === Trace.finish ? `Station ${station}, finish` : `Station ${station}`;
    button.classList.toggle("current", station === current);
    button.classList.toggle("available", isAvailable);
    button.setAttribute("aria-current", String(station === current));
    button.setAttribute("aria-disabled", String(!isAvailable));
    button.setAttribute("aria-label", isAvailable ? `Move to ${name}` : name);
  }

  Array.from(ticks.children).forEach((tick, index) => {
    tick.classList.toggle("used", index < used.length);
  });
  count.textContent = `${used.length} / ${Trace.bridges.length}`;
  undo.setAttribute("aria-disabled", String(path.length === 1));

  const progress = `${used.length} of ${Trace.bridges.length} bridges crossed.`;
  const state = Trace.state(path);
  if (state === "complete") {
    statusLine.textContent = `Route complete. ${progress}`;
  } else if (state === "stuck") {
    statusLine.textContent = `${progress} No open bridges here. Undo to try another route.`;
  } else {
    statusLine.textContent = `${progress} At ${current}. Open bridges to ${available.join(", ")}.`;
  }
}

undo.addEventListener("click", () => {
  if (path.length === 1) return;
  path = path.slice(0, -1);
  render();
});
restart.addEventListener("click", () => {
  path = [Trace.start];
  render();
});

const directions = {
  ArrowLeft: [-1, 0], ArrowRight: [1, 0],
  ArrowUp: [0, -1], ArrowDown: [0, 1],
};
document.addEventListener("keydown", (event) => {
  const direction = directions[event.key];
  if (!direction || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  const [x, y] = Trace.stations[Trace.current(path)];
  const [dx, dy] = direction;
  const destination = Trace.available(path).find((station) => {
    const [nextX, nextY] = Trace.stations[station];
    return Math.sign(nextX - x) === dx && Math.sign(nextY - y) === dy;
  });
  if (!destination) return;
  event.preventDefault();
  if (!event.repeat) select(destination, board.contains(document.activeElement));
});

render();
