# Two versions

The Go version came first and is the reference. sanctuary is a rewrite
of it in idiomatic Rust, held to the same features and the same
behavior. Neither version replaces the other.

## What is the same

Everything a script or a vault depends on is the same:

- the vault format and the identity format
- the default paths and the `SAFETYBOX_*` environment variables
- every verb and flag
- result output on stdout
- log records and prompts on stderr
- exit codes

The directory keeps the name `safetybox` under both versions, so both
commands open one vault.

## What differs

sanctuary differs from the Go version in presentation only.

| What | Go version | Rust version |
| --- | --- | --- |
| Command name, in help and in hints | `safetybox` | `sanctuary` |
| Version line | `safetybox version v4.0.2` | `sanctuary 0.1.0 (Rust, compatible with safetybox v4.0.2)` |
| Help layout | cobra | laid out by sanctuary, in clap's vocabulary |
| Usage error wording | cobra | clap, cut to one line |
| Completion scripts | cobra | `clap_complete` |

A script should never match on help text or on the wording of a usage
error. Match on the exit code and on the JSON result.

## How parity is held

One conformance suite runs against both binaries. It drives each
binary as a black box, so it tests behavior and never the code behind
it. The Go binary must pass every test before a result from the Rust
binary counts.

A behavior change lands in both versions. The Go release is tagged
first, then sanctuary moves its reference to that tag. The version
line of sanctuary names the Go release it is held to.

The sanctuary repository records the detail in its
[parity ledger](https://github.com/samuel-stidham/sanctuary/blob/main/tests/PARITY.md).
