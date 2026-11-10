# BFI Lab

An iOS-first game project that can be played and developed on Windows, macOS, Linux, and other systems with a modern browser. **Trace** is the first experiment. It uses one small bridge puzzle to exercise readable choices, reversible mistakes, and the path from a Git commit to a SideStore install.

## Play and develop

- Play [in your browser](https://sieradni.github.io/bfi/). For local play, open `site/index.html` directly from a checkout. The puzzle works offline and accepts touch, mouse, and keyboard.
- Run `node --test` from the repository root with Node.js 24. The project has no package installation step. Rules live in `site/rules.js` and browser input and rendering live in `site/play.js`.
- On macOS, open `ios/BFILab.xcodeproj` in Xcode for simulator or device development. On any development platform, a release tag lets GitHub Actions run the device build on macOS. iOS 16 is the initial minimum.

## Install on iPhone or iPad

In SideStore, open **Sources → +** and paste `https://sieradni.github.io/bfi/source.json`. Add **BFI Lab**, then install it from **Browse**. Future releases appear as updates from the same source. The [GitHub releases](https://github.com/sieradni/bfi/releases) also include the IPA for direct sideloading. SideStore handles signing on your device. [SideStore setup](https://docs.sidestore.io/docs/installation/install.html)

## Start a new session

Read [AGENTS.md](AGENTS.md) and [the current handoff](WORKBENCH.md) first. [The design and release workflow](PLAYBOOK.md) describes how to choose an experiment, judge the result, and ship it.
