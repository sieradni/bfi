const Trace = (() => {
  const stations = {
    A: [66, 63], B: [180, 63], C: [294, 63],
    D: [66, 169], E: [180, 169], F: [294, 169],
  };
  const bridges = ["AB", "BC", "AD", "BE", "CF", "DE"];
  const start = "B";
  const finish = "F";
  const current = (path) => path[path.length - 1];
  const bridgeBetween = (a, b) => [a, b].sort().join("");
  const used = (path) => path.slice(1).map((station, index) => bridgeBetween(path[index], station));

  function available(path) {
    const crossed = used(path);
    return bridges
      .filter((bridge) => bridge.includes(current(path)) && !crossed.includes(bridge))
      .map((bridge) => bridge.replace(current(path), ""));
  }

  function move(path, destination) {
    return available(path).includes(destination) ? [...path, destination] : path;
  }

  function state(path) {
    if (path.length === bridges.length + 1 && current(path) === finish) return "complete";
    return available(path).length ? "open" : "stuck";
  }

  return { stations, bridges, start, finish, current, used, available, move, state };
})();

if (typeof module !== "undefined") module.exports = Trace;
