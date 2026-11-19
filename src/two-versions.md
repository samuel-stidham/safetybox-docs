# Two versions

SafetyBox has two versions in two repositories. The Go version came
first and is the reference. sanctuary is a rewrite of it in idiomatic
Rust, held to the same features and the same behavior. Neither version
replaces the other.

## The two repositories

| | Go version | Rust version |
| --- | --- | --- |
| Repository | [samuel-stidham/safetybox](https://github.com/samuel-stidham/safetybox) | [samuel-stidham/sanctuary](https://github.com/samuel-stidham/sanctuary) |
| Command | `safetybox` | `sanctuary` |
| Language | Go | Rust |
| Role | the reference | held to the reference by a shared test suite |
| Install | `go install`, or a prebuilt binary from a GitHub release | `cargo install sanctuary`, from crates.io |
| Prebuilt binaries | Linux and macOS | none, it builds from source |
| Tested on | Linux and macOS | Linux |
| Version numbers | its own, such as v4.0.3 | its own, such as 0.1.0 |
| Releases | cut from `main`, with a changelog | a `v*` tag publishes to crates.io |
| Contributor pages | architecture, development, linting | porting log, parity ledger |

Each version carries its own version number. sanctuary names the Go
release it is held to in its version line.

```console
$ sanctuary --version
sanctuary 0.1.0 (Rust, compatible with safetybox v4.0.2)
```

Report a bug in the repository of the version you ran. A bug in
behavior that both share belongs in the Go repository.

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

## One difference that can lock you out

sanctuary refuses a passphrase that is not valid UTF-8. The Go version
accepts one. An identity sealed by the Go version under such a
passphrase does not open with sanctuary.

A passphrase typed on a normal keyboard layout is UTF-8, so this
affects almost nobody. It matters for a passphrase file that holds raw
bytes. Keep the passphrase to text if you plan to use both versions.

## Differences in presentation

| What | Go version | Rust version |
| --- | --- | --- |
| Command name, in help and in hints | `safetybox` | `sanctuary` |
| Version line | `safetybox version v4.0.3` | `sanctuary 0.1.0 (Rust, compatible with safetybox v4.0.2)` |
| Help layout | cobra | laid out by sanctuary, in clap's vocabulary |
| Usage error wording | its own | its own. Both count a stray argument and never repeat it. |
| Completion scripts | cobra | `clap_complete` |

A script should never match on help text or on the wording of a usage
error. Match on the exit code and on the JSON result.

## Differences in error detail

Both versions print the same leading message for these errors. The
detail after it comes from each language's own library, so it reads
differently.

| Error | What differs |
| --- | --- |
| A refused `--expires` value | Both print `use RFC3339 or YYYY-MM-DD`. The Go version adds its time parser's complaint. |
| A corrupt stored timestamp | Both print `stored timestamp is not valid, the vault may have been edited`. The Go version adds its time parser's complaint. |
| A file that is not an age file | Both print `identity decrypt failed:` or `envelope decrypt failed:`. The reason after it comes from each `age` library. A wrong passphrase reads the same in both. |
| A stored recipient that does not parse | Both print `malformed recipient "...":`. The reason after it comes from each `age` library. |
| A stored secret name that is not UTF-8 | Quoted in an error, the bad byte shows as `\xff` in the Go version and as `�` in sanctuary. |

## Differences in behavior

These are the only places the two act differently. Neither changes
what is stored in the vault.

| Case | Go version | Rust version |
| --- | --- | --- |
| A passphrase that is not UTF-8 | accepted | refused with `passphrase is not valid UTF-8` |
| The kernel refuses to lock the decrypted identity in memory | the command stops | the command goes on with the bytes unlocked, and still wipes them |
| The order of variables `exec` gives the child | inherited order, with each injected variable last | sorted by name. The variables and their values are the same. |

## How parity is held

One conformance suite runs against both binaries. It drives each
binary as a black box, so it tests behavior and never the code behind
it. The Go binary must pass every test before a result from the Rust
binary counts.

A behavior change lands in both versions. The Go release is tagged
first, then sanctuary moves its reference to that tag.

The sanctuary repository records every difference and its test in the
[parity ledger](https://github.com/samuel-stidham/sanctuary/blob/main/tests/PARITY.md).
