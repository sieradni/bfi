# Current handoff

**Scope.** Trace is the first playable experiment and release fixture. The project’s genre, setting, business model, and final engine are open. BFI Lab is a working app name.

**Question.** Can a first-time player read what can move, tell which bridges have been used, and recover after taking the exit too early?

**Prediction and disconfirming result.** Give the player the build without coaching. On a phone, they should be able to point out their current station and an available move, explain what happened after a dead end, and use Undo. If they reach the exit early, ask what they think happened before explaining it. If they interpret the dead end as a win or need coaching to recover, revise the feedback and run the same test again.

**Observed.** The first board had two outer paths and a center bridge. From its start, every legal route used all seven bridges. It exercised neither the failure message nor recovery. Removing one bridge created an early-exit branch and a loop to complete before leaving. The rule tests cover both endings and reject bridge reuse. Human playtest evidence is pending.

**Decision and next step.** Keep one board while validating delivery. On the first iPhone install, watch someone play cold and record where they hesitate and what they thought would happen. Use that evidence to pick the next question before expanding the game.

**Platform decision.** Plain browser files give Windows and other platforms a fast local loop. A small WKWebView shell bundles those exact files for offline iPhone play. This choice is provisional. Revisit it if a measured iOS limitation prevents a player experience worth keeping.
