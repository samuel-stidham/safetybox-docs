# SafetyBox

SafetyBox is a single-user, CLI-first secrets manager for *nix. It
keeps named, versioned secrets in a SQLite vault. Every value is sealed
in an [age](https://age-encryption.org) envelope before it touches
disk.

Writing a secret never needs the private key. The vault stores the
public recipient, so `set` seals a value without a passphrase. Only
the verbs that decrypt ask for one.

## Two versions, one vault

SafetyBox exists in two versions, and both are maintained.

| Version | Command | Repository |
| --- | --- | --- |
| Go | `safetybox` | [samuel-stidham/safetybox](https://github.com/samuel-stidham/safetybox) |
| Rust | `sanctuary` | [samuel-stidham/sanctuary](https://github.com/samuel-stidham/sanctuary) |

Both read and write the same vault and the same identity file, at the
same paths. A vault created by one opens with the other. This
documentation covers both.

## How to read the examples

Every shell example has two tabs, **safetybox (Go)** and
**sanctuary (Rust)**. Pick the version you installed. The choice
applies to every example on every page, and your browser remembers it.

The two tabs differ in the command name and nothing else. The verbs,
flags, output, and exit codes are the same. Paths and variables keep
the name `safetybox` under both versions, such as
`~/.config/safetybox/identity.age` and `SAFETYBOX_VAULT`.

The prose says safetybox for the product. It means both versions
unless a sentence names one.

The two are not identical in every detail. The
[two versions](two-versions.md) page lists every difference between
the repositories and between the commands. Read the short section on
passphrases there before you use both on one vault.

## Where to start

- [Install](install.md) covers both versions.
- [Getting started](getting-started.md) takes you from install to your
  first rotated secret in a few minutes.
- [Tutorial](tutorial.md) is the full guided tour. It runs every
  command in order, from install through key rotation.
- [Command reference](commands.md) is the precise contract of every
  verb, flag, and output shape.
- [Configuration](configuration.md) covers the vault and identity
  paths, their precedence, and the global flags.
- [Security model](security.md) explains the layers, the invariants,
  and what SafetyBox does not defend against.

## Working on the code

Each repository keeps its own contributor documentation. The Go
repository holds its architecture, development, and linting pages. The
Rust repository holds its porting log and its parity ledger.

Report a bug in the repository of the version you ran.
