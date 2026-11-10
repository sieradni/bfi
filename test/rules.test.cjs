const assert = require("node:assert/strict");
const test = require("node:test");
const Trace = require("../site/rules.js");

test("a route can finish after crossing all six bridges", () => {
  const path = ["A", "D", "E", "B", "C", "F"].reduce(Trace.move, [Trace.start]);
  assert.equal(Trace.state(path), "complete");
  assert.deepEqual([...Trace.used(path)].sort(), [...Trace.bridges].sort());
  assert.deepEqual(Trace.available(path), []);
});

test("a crossed bridge cannot be reused from either end", () => {
  const path = Trace.move([Trace.start], "A");
  assert.strictEqual(Trace.move(path, Trace.start), path);
  assert.strictEqual(Trace.move(path, "F"), path);
});

test("reaching the diamond early is a dead end and undo reopens crossed bridges", () => {
  const path = ["C", Trace.finish].reduce(Trace.move, [Trace.start]);
  assert.equal(Trace.current(path), Trace.finish);
  assert.equal(Trace.state(path), "stuck");
  assert.equal(Trace.state(path.slice(0, -1)), "open");
  assert.deepEqual(Trace.available(path.slice(0, -2)), ["A", "C", "E"]);
});
