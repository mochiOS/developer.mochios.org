---
update: 2026-06-10
---
# Capabilityリファレンス

Capabilityは、アプリやサービスが実行時に扱える操作範囲を表します。

## 例

- ipc.server
- process.spawn
- system.info.read
- device.storage
- device.net
- device.input
- device.gpu

## 基本方針

アプリには、必要なCapabilityだけを宣言させます。実行時には、宣言と署名情報をもとに許可された操作だけを通します。
