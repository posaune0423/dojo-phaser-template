# react-2d-game

## Getting Started
2. Check versions of Scarb and Dojo and Cairo

```zsh
sozo --verison
sozo 0.7.0-alpha.5
scarb: 2.6.3
cairo: 2.6.3
sierra: 1.5.0

scarb --version
scarb 2.6.3 (e6f921dfd 2024-03-13)
cairo: 2.6.3 (https://crates.io/crates/cairo-lang-compiler/2.6.3)
sierra: 1.5.0
```


1. Build contracts
```zsh
cd contracts
sozo build
```
2. Run Katana on http://0.0.0.0:5050

```zsh
katana --disable-fee
```

3. Apply migrations
```zsh
sozo migrate apply
```

4. Run indexer on http://0.0.0.0:8080

```zsh
torii --world 0x009f1c624eea5ad97ea4bee805b2c46d4db96c8bee88a061a1905e67e5683cc1 --allowed-origins "*"
```
