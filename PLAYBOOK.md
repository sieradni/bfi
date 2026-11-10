# How BFI Lab works

## Derive design from what the player can do

Start with a moment of play. Write down what the player sees, what they can choose, what changes, and what they can infer afterward. If two choices have indistinguishable consequences, combine them or change the rule. If a player misses a rule, test whether the board or feedback can teach it before adding an explanation.

Judge a proposal by four questions.

1. **Can I read it?** The current state, goal, and possible actions are distinguishable at phone size. Redundant shape, text, or pattern carries information that color alone would hide.
2. **Does my decision matter?** Show two legal actions and how they lead to different situations. Teach consequences through play. Use undo or a short restart when replay helps the player reason.
3. **Does each part earn its place?** For each mechanic, asset, or system, name the experience it enables and what a simpler version loses. Try deleting a part before adding a workaround for it.
4. **Can we check it?** State what a first-time player would do or say if the design works. Specify the observation that would cause a revision.

These are working principles. When two conflict, write down the concrete tradeoff and try it in play. A first-time player’s behavior has more weight than an agent’s prediction. An agent can inspect consistency, verify behavior, and find counterexamples. It cannot supply independent player reactions.

## Run one experiment per session

1. **Reconstruct the baseline.** Read the handoff, inspect the current diff and recent history, run the smallest relevant check, and play the current build. Take prior session claims as leads until you can tie them to a result.
2. **Pick an uncertainty.** Choose the unanswered question that would change the next decision. Write a prediction, a comparison or baseline, and the result that would change your mind. Keep the original route playable while testing alternatives on a branch.
3. **Make it playable.** Change one consequential variable at a time when possible. Use placeholder art, audio, or content where the question permits. If a change needs a new dependency, explain the capability it buys and how to reverse it.
4. **Separate the kinds of evidence.** Rule tests verify outcomes. A browser smoke check verifies interaction and layout. An iPhone check verifies touch, safe areas, suspend/resume, and SideStore. A first-time playtest answers whether a person understands or enjoys the interaction. Record platform, input, build, and exact observation.
5. **Keep, revise, or discard.** If evidence is mixed, name the competing explanations and the cheapest test that distinguishes them. Keep a short record in `WORKBENCH.md`. A failed experiment can be discarded while its finding stays. Promote repeated mistakes into a check or a standing rule with a reason.

An experiment record needs four lines: **Question**, **Prediction and disconfirming result**, **Observed (build and conditions)**, and **Decision and next step**. Prefer a replayable example to a transcript. Keep hypotheses and open issues clearly marked. When the handoff gets long, move superseded records to Git history and link the relevant commit.

## Add complexity when the experiment needs it

| Area | When it earns a test |
| --- | --- |
| Content and progression | A single interaction earns repeat play. Test a second situation that teaches or challenges a distinct skill before building a level system. |
| Art and sound | The player needs a clearer state, response, or tone. Check readability and touch comfort on iPhone. Test play with sound off and respect motion preferences if animation is added. |
| Performance and platform | A measured load, frame, input, or memory problem has a reproducible case. If the browser cannot meet a real game requirement, compare engines against that case and keep Windows iteration in the evaluation. |
| Saves and lifecycle | A session has value worth resuming. Define what survives a quit or update, use a versioned format, and test old saves before shipping a migration. |
| Online features and analytics | A specific player need requires them. Decide what data is collected and how failure behaves before adding a service. Use observed play sessions for early feedback. |
| Assets and maintenance | Track asset provenance when importing it. Treat build or library upgrades as focused changes with platform checks, especially WebKit and the Xcode runner. |

## Release and maintain

1. Review the change and test touch-sized and keyboard play. Run `node --test`. For candidate device builds, run `bash scripts/package-ios.sh` on a Mac or use the tag workflow. Test new permissions and save changes with the previous installed version when they apply.
2. On the approved release commit, bump `MARKETING_VERSION` and `CURRENT_PROJECT_VERSION` in `ios/Lab.xcconfig` and push the matching `vX.Y.Z` tag. GitHub Actions tests and builds an arm64 device IPA. The packager checks the bundle ID, version, architecture, and bundled web files. The release uploads the IPA and its SHA-256 checksum. The initial commit already has version `0.1.0` and build `1`.
3. Download the published assets, verify the SHA-256, and check the app's `Info.plist` in the IPA. Prepend the verified version to `distribution/source.json` with the published release date, version, direct IPA URL, exact byte count, and minimum iOS version. Keep earlier entries. Update the permissions in the feed if the IPA adds any. Omit `marketplaceID` and `buildVersion` in this SideStore feed per [SideStore’s source guidance](https://docs.sidestore.io/docs/advanced/app-sources). Use the legacy latest-version fields only if maintained in sync with the first entry.
4. Push the feed change to `main`. GitHub Pages publishes it at the stable source URL. Fetch it without logging in and verify that its first IPA URL downloads the expected bytes. On an iPhone or iPad, add the source, install or update, launch in airplane mode, complete or undo a route, and note the device and OS. Use the previous release to verify the update path once two builds exist.

Keep `io.github.sieradni.bfilab` and the feed URL stable. Keep published assets tied to their release tags. If upload fails with a draft release left behind, inspect and complete that draft before advertising it. If a published build is faulty, restore the previous feed entry as the first listing to protect new installs. For devices already on the faulty version, ship a forward fix with a higher version and test the update. If a build claim is unverified, write down the missing check and the conditions needed to run it.
