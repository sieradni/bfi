# Working on BFI Lab

Start with `WORKBENCH.md` for the current question and evidence. Use `PLAYBOOK.md` for the experiment and release workflow. Check Git status and recent history before editing. The repository carries context across chats.

- Keep iPhone play and Windows development viable. Exercise any interaction change at a narrow viewport and with a keyboard. Record a physical-device check separately.
- For design changes, state the player behavior you expect, the uncertainty you are testing, and what would make you change course. Build the smallest playable test of that claim.
- Keep rules independent of rendering, input, clocks, and platform APIs. Put platform behavior at the boundary. Keep the browser and iOS shell on the same game files.
- Preserve existing work and stable release identity. Use a focused branch for experiments. Release to SideStore only when the user has authorized publishing.
- Before handing off, run the relevant checks and record the outcome, the exact build or commit tested, unresolved gaps, and one next experiment. Distinguish measurements, observations, and hypotheses. Record a recurring failure as a rule or check only after you understand what caused it.
