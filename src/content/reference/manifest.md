---
update: 2026-06-10
---
# about.tomlリファレンス

about.tomlは、mochiOSアプリの基本情報を記述するファイルです。

```toml
name = "Example"
bundle_id = "org.mochios.example"
version = "0.1.0"
developer = "example"
entry = "entry.elf"
description = "Example app for mochiOS"
icon = "assets/icon.png"
```

## 主な項目

- name: 表示名
- bundle_id: アプリを識別するID
- version: バージョン
- developer: 開発者名
- entry: 起動する実行ファイル
- description: 説明文
- icon: アイコンへのパス
