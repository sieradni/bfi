# Current handoff

**Scope.** Trace is the first playable experiment and release fixture. The project’s genre, setting, business model, and final engine are open. BFI Lab is a working app name.

**Question.** Can a first-time player read what can move, tell which bridges have been used, and recover after taking the exit too early?

**Prediction and disconfirming result.** Give the player the build without coaching. On a phone, they should be able to point out their current station and an available move, explain what happened after a dead end, and use Undo. If they reach the exit early, ask what they think happened before explaining it. If they interpret the dead end as a win or need coaching to recover, revise the feedback and run the same test again.

**Observed.** Enumerating terminal paths in the first board gave six wins and zero dead ends. Removing one bridge and moving the finish gave two wins and one dead end. A 390 × 844 Chrome viewport on Windows rendered the board and controls without horizontal overflow. Clicks reached the dead end, Undo and Restart recovered, and a desktop keyboard run completed the route. The tested game files are at `09fefe9`. Windows and Linux CI passed all three rule tests. Human playtest evidence is pending.

**Decision and next step.** Keep one board while validating delivery. On the first iPhone install, watch someone play cold and record where they hesitate and what they thought would happen. Use that evidence to pick the next question before expanding the game.

**Platform decision.** Plain browser files give Windows and other platforms a fast local loop. A small WKWebView shell bundles those exact files for offline iPhone play. This choice is provisional. Revisit it if a measured iOS limitation prevents a player experience worth keeping.
