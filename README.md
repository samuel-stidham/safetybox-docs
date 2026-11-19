# SafetyBox documentation

This repository is the documentation for SafetyBox, a single-user
secrets manager for *nix. It covers both versions:

| Version | Command | Repository |
| --- | --- | --- |
| Go | `safetybox` | [samuel-stidham/safetybox](https://github.com/samuel-stidham/safetybox) |
| Rust | `sanctuary` | [samuel-stidham/sanctuary](https://github.com/samuel-stidham/sanctuary) |

Read it at <https://samuel-stidham.github.io/safetybox-docs/>.

## Layout

The pages are Markdown files under `src/`. `src/SUMMARY.md` is the
table of contents. [mdBook](https://rust-lang.github.io/mdBook/) builds
them into the site.

## Build it locally

```sh
cargo install mdbook --locked --version 0.5.4
mdbook serve --open
```

`mdbook serve` rebuilds on every save.

## How a change lands

A behavior change lands in the Go version first, then in sanctuary.
Change the page here in step with the Go release.

A push to `main` builds the site and publishes it to GitHub Pages. A
pull request builds the site and publishes nothing.

Write every example with `safetybox`, in a `sh` or `fish` block.
`theme/command-tabs.js` adds a tab for each version to such a block
and swaps the command name. It leaves paths, variables, and URLs
alone.

Mark a block that must not get tabs with `one-version`, as in
` ```sh,one-version `. The install page uses it for steps that belong
to one version.

## License

MIT. See `LICENSE`.
