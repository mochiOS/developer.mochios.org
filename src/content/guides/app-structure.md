---
update: 2026-06-10
---
# アプリ構成

mochiOSアプリは、単体の実行ファイルだけではなく、メタデータとアセットを含むディレクトリとして扱います。

```text
Example.app/
  about.toml
  entry.elf
  assets/
    icon.png
```

## about.toml

アプリ名、Bundle ID、バージョン、開発者名、エントリポイントなどを記述します。
