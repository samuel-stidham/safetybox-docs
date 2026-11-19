# Install

Install either version, or both. The two commands have different
names, so both can sit on one `PATH` and share one vault.

## The Go version: safetybox

Install with Go 1.27 or later.

```sh
go install github.com/samuel-stidham/safetybox/v4@latest
```

That puts `safetybox` in `$GOPATH/bin`, which is `~/go/bin` by
default. Make sure that directory is on your `PATH`.

Prebuilt binaries for Linux and macOS ship with each
[GitHub release](https://github.com/samuel-stidham/safetybox/releases),
so you can download one instead of building.

To build from a clone, use the Makefile.

```sh,one-version
git clone https://github.com/samuel-stidham/safetybox.git
cd safetybox
make install
```

## The Rust version: sanctuary

Install from [crates.io](https://crates.io/crates/sanctuary) with a
current stable Rust toolchain.

```sh
cargo install sanctuary
```

That puts `sanctuary` in `~/.cargo/bin`. Make sure that directory is
on your `PATH`. The build compiles SQLite from source, so it needs a C
compiler.

## Confirm the install

```sh,one-version
safetybox --version
sanctuary --version
```

The Go version prints its own version. sanctuary prints its own
version and the Go release it behaves like.

```console
$ sanctuary --version
sanctuary 0.1.0 (Rust, compatible with safetybox v4.0.2)
```
