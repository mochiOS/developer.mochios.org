# UI Design Guidelines

## Overview

このガイドラインは、Web UIにおける視覚設計、レイアウト、コンポーネント、アイコン、状態表現の基準を定義します。

UIは、余白、階層、丸み、控えめな色、読みやすい文字組みによって構成します。装飾よりも明瞭さを優先し、操作可能な要素、情報のまとまり、現在位置が自然に理解できる画面を目指します。

管理系の画面では、入力、確認、一覧、状態表示を中心に構成します。閲覧系の画面では、カード、リスト、特集領域、検索、カテゴリ選択を使い、情報を見つけやすくします。

## Visual Principles

### Clarity

すべての要素は、役割が見た目から分かる必要があります。

主要な操作は明確に見せ、補助的な操作は控えめにします。情報の優先度は、文字サイズ、余白、色、配置で表現します。

### Calmness

色、影、アニメーションは控えめにします。

画面全体の印象は、静かで軽く、長時間見ても疲れにくいものにします。強い色や濃い影で注意を引くのではなく、必要な場所だけに視線が集まるようにします。

### Consistency

同じ役割の要素は、同じ見た目にします。

ボタン、カード、入力欄、リスト、空状態、アイコンの寸法や角丸を揃えることで、画面全体に一貫性を持たせます。

### Depth

奥行きは境界線、薄い影、背景差で表現します。

影を主役にしないでください。面の重なりは、薄い境界線とごく弱い影で示します。

## Color

### Base Colors

* Primary Text: #0A0A0A
* Primary Background: #FAFAFA
* Secondary Background: #F7F7F7
* Elevated Surface: #FAFAFA
* Subtle Surface: #F2F2F2
* Separator: #E4E4E4
* Weak Separator: #C8C8C8
* Tertiary Text: #A0A0A0
* Secondary Text: #606060
* Hover Dark: #303030
* Accent: #0A84FF
* Destructive: #E53935
* Success: #1A8A35

### Color Usage

Primary Textは、本文、見出し、選択中の項目、主要操作に使います。

Secondary Textは、説明、補足、カテゴリ、メタ情報に使います。

Tertiary Textは、未入力状態、弱いラベル、空状態、順位など、主張を弱めたい情報に使います。

Accentは、閲覧系画面における行動可能な要素、リンク、強調ラベル、選択可能な補助操作に使います。画面全体をAccentで支配しないでください。

Destructiveは、破壊的または取り消しにくい操作に使います。文字、境界、薄い警告面に限定します。

Successは、完了、承認、有効状態などに使います。常時目立たせるのではなく、状態を確認する場面で使います。

## Typography

### Font Families

通常UIには、指定された通常UI向けフォントを使います。

識別子、数値、価格、バージョン、状態値、コード的な値には、指定された等幅フォントを使います。

### Type Scale

Large Title:

* Size: 30px
* Weight: 600
* Letter Spacing: -0.03em

Page Title:

* Size: 26pxから28px
* Weight: 500から600
* Letter Spacing: -0.03em

Section Title:

* Size: 20px
* Weight: 600
* Letter Spacing: -0.025em

Subsection Title:

* Size: 15pxから17px
* Weight: 600

Item Title:

* Size: 13.5pxから14px
* Weight: 500から600

Body:

* Size: 13pxから14px
* Weight: 400
* Line Height: 1.5から1.6

Caption:

* Size: 11.5pxから13px
* Weight: 400から500

Label:

* Size: 10.5pxから11.5px
* Weight: 500から600
* Letter Spacing: 0.04emから0.09em

### Text Behavior

見出しは太さだけでなく、余白とサイズで階層を作ります。

説明文は長くしすぎず、1行あたりの情報量を抑えます。

識別子や数値は等幅フォントにして、値の比較や確認をしやすくします。

## Layout

### Page Structure

基本構造は、上部ナビゲーション、左サイドバー、メイン領域で構成します。

上部ナビゲーションは固定配置にします。高さは54pxから56pxです。

左サイドバーは固定配置にします。管理系画面では210px、閲覧系画面では220pxを基準にします。

メイン領域は、左サイドバーの幅を避けて配置します。管理系画面では最大幅860px、閲覧系画面では最大幅1040pxを基準にします。

### Spacing

* Page Horizontal Padding: 44px
* Management Main Top Padding: 40px
* Browsing Main Top Padding: 36px
* Navigation Horizontal Padding: 24pxから28px
* Sidebar Horizontal Padding: 12pxから14px
* Card Padding: 22pxから24px
* Compact Card Padding: 16pxから18px
* Section Gap: 40px
* Section Header Bottom Gap: 18px
* Form Field Gap: 14px
* Inline Field Gap: 12px
* List Row Vertical Padding: 13px
* Chip Gap: 8px
* Grid Gap: 14px

## Radius

角丸は、要素の大きさと役割に応じて使い分けます。

* Small Icon Container: 7px
* Input Field: 10px
* Sidebar Item: 10px
* Information Cell: 10px
* Compact Icon: 12px
* Standard Icon: 13px
* Standard Card: 16px
* Content Card: 18px
* Feature Card: 20px
* Hero Banner: 20px
* Button: 20px
* Chip: 20px
* Toast: 24px
* Large Icon: 26px
* Avatar: 50%

標準カードは16pxを基準にします。閲覧系のカードや特集領域では18pxから20pxを使います。入力欄とサイドバー項目は10pxにして、カードより小さく見せます。

## Elevation

影は控えめに使います。

Standard Surface:

* 境界線を中心に面を分ける
* 影はごく薄くする

Content Surface:

* 標準面より少しだけ浮かせる
* hover時は軽く上に移動してよい

Hero Surface:

* 大きなビジュアル領域や大きいアイコンだけ、やや強い影を使える

Toast:

* 背景を濃くし、影は中程度にする
* 画面上の一時的な通知として認識できるようにする

## Navigation

ナビゲーションは、画面全体の現在位置と補助操作を示します。

### Dimensions

* Height: 54pxから56px
* Horizontal Padding: 24pxから28px
* Logo Size: 20pxから30px
* Brand Text Size: 15px
* Avatar Size: 28pxから30px

### Appearance

* Background: #FAFAFA
* Text: #0A0A0A
* Secondary Text: #606060
* Separator: #E4E4E4

背景は半透明表現とぼかしを使ってよいです。下部には薄い境界線を置き、メイン領域と分離します。

## Sidebar

サイドバーは、画面内の主要な移動と分類を担います。

### Dimensions

* Width: 210pxから220px
* Padding: 12pxから14px
* Section Gap: 24pxから28px
* Item Height: 34pxから44px
* Icon Container: 28px

### Section Label

* Size: 10pxから10.5px
* Weight: 500から600
* Letter Spacing: 0.07emから0.08em
* Color: #A0A0A0 または #C8C8C8

### Item

* Text Size: 13.5px
* Normal Text: #606060
* Hover Background: #F2F2F2
* Active Background: #0A0A0A
* Active Text: #FAFAFA
* Radius: 10px

アイコンを使う場合は、線を細くし、色はテキスト色と連動させます。

## Buttons

### Primary Button

主要操作に使います。

* Background: #0A0A0A
* Text: #FAFAFA
* Hover Background: #303030
* Radius: 20px
* Height: 32pxから40px
* Horizontal Padding: 14pxから26px
* Text Size: 13pxから14px
* Weight: 500から600

### Secondary Button

補助操作に使います。

* Background: transparent
* Text: #0A0A0A
* Border: #E4E4E4
* Hover Background: #F2F2F2
* Radius: 20px
* Height: 30pxから36px
* Horizontal Padding: 12pxから14px

### Destructive Button

破壊的な操作に使います。

* Background: transparent
* Text: #E53935
* Border: #E53935
* Hover Background: 薄い赤
* Radius: 20px

### Accent Action Button

閲覧系画面の行動可能な要素に使います。

* Text: #0A84FF
* Background: 薄い青
* Hover Background: #0A84FF
* Hover Text: #FAFAFA
* Radius: 20px
* Height: 32pxから36px

## Forms

フォームは、入力と確認のための構造です。

### Field

* Height: 36pxから40px
* Padding: 上下9px、左右12px
* Radius: 10px
* Background: #F2F2F2
* Text: #0A0A0A
* Placeholder: #A0A0A0
* Border: #E4E4E4
* Focus Background: #FAFAFA
* Focus Border: #0A0A0A

### Field Label

* Size: 11.5px
* Weight: 500
* Color: #606060
* Bottom Gap: 5px

### Multiline Field

* Radius: 10px
* Minimum Height: 3行から4行
* Resize: 縦方向のみ

### Inline Fields

横並びの入力欄は、同じ高さ、同じ角丸、同じラベル構造にします。要素間のgapは12pxです。

## Cards

### Standard Card

管理系画面の情報整理に使います。

* Background: #FAFAFA
* Border: #E4E4E4
* Radius: 16px
* Padding: 22pxから24px
* Bottom Gap: 14px
* Shadow: ごく薄い影

カードタイトルは小さく扱います。

* Size: 12px
* Weight: 500
* Letter Spacing: 0.05em
* Color: #A0A0A0

### Content Card

閲覧系画面の情報表示に使います。

* Background: #FAFAFA
* Border: #E4E4E4
* Radius: 18pxから20px
* Padding: 16pxから22px
* Shadow: 標準カードより少し強い影
* Hover: 軽く上に移動してよい

### Feature Card

大きく見せたいコンテンツに使います。

* Radius: 20px
* Visual Area Height: 200px
* Body Padding: 18pxから22px
* Label Size: 10.5px
* Title Size: 19px
* Description Size: 13px
* Footer Icon: 36px
* Footer Icon Radius: 9px

### Hero Banner

画面上部の大きな訴求領域に使います。

* Radius: 20px
* Minimum Height: 260px
* Padding: 32pxから36px
* Title Size: 30px
* Description Size: 14px
* Large Icon Size: 110px
* Large Icon Radius: 26px
* Background: 暗い背景または落ち着いたグラデーション
* Text: #FAFAFA

## Lists

### Horizontal List Row

一覧やランキングに使います。

* Row Padding: 上下13px
* Gap: 14px
* Separator: #E4E4E4
* Icon Size: 56px
* Icon Radius: 13px
* Title Size: 14px
* Subtitle Size: 12px
* Metadata Font: 等幅フォント
* Metadata Color: #A0A0A0

### Compact List Row

小さい一覧や候補表示に使います。

* Row Padding: 上下12px
* Gap: 12px
* Icon Size: 36px
* Icon Radius: 9px
* Title Size: 13.5px
* Subtitle Size: 12px

### Data List Row

管理系の登録済みデータや履歴に使います。

* Row Padding: 上下13px
* Gap: 12px
* Title Size: 13.5px
* Subtitle Size: 11.5px
* Metadata Size: 11px
* Subtitle Font: 等幅フォント
* Long Text: 省略表示

## Chips

チップは、カテゴリ、フィルタ、短い選択肢に使います。

* Height: 約32px
* Radius: 20px
* Horizontal Padding: 16px
* Gap: 6px
* Text Size: 13px
* Normal Background: #FAFAFA
* Normal Text: #606060
* Border: #E4E4E4
* Active Background: #0A0A0A
* Active Text: #FAFAFA
* Hover Text: #0A0A0A

## Badges

バッジは、短い状態を示します。

### Neutral Badge

* Background: #F2F2F2
* Text: #606060
* Radius: 20px
* Padding: 上下2px、左右8px
* Text Size: 11px

### Success Badge

* Text: #1A8A35
* Background: 薄い緑
* Radius: 20px
* Padding: 上下2px、左右8px
* Text Size: 11px

### Destructive Badge

* Text: #E53935
* Background: 薄い赤
* Radius: 20px
* Padding: 上下2px、左右8px
* Text Size: 11px

## Empty State

空状態は、中央揃えで静かに表示します。

* Padding: 上下32px、左右20px
* Icon Size: 28px
* Icon Stroke: #E4E4E4
* Text Size: 13px
* Text Color: #A0A0A0
* Icon Bottom Gap: 10px

文言は短くします。説明を増やしすぎず、必要な場合だけ次の操作を近くに置きます。

## Search

検索欄は、入力欄より少し大きく、独立した面として見せます。

* Radius: 14px
* Padding: 上下12px、左右18px
* Gap: 10px
* Border: #E4E4E4
* Background: #FAFAFA
* Icon Size: 18px
* Text Size: 15px
* Placeholder: #C8C8C8

検索欄はページ上部に置き、結果や候補との距離を近くします。

## Toast

一時的な通知に使います。

* Position: 画面下部中央
* Background: #0A0A0A
* Text: #FAFAFA
* Radius: 24px
* Padding: 上下11px、左右22px
* Text Size: 13px
* Weight: 500
* Shadow: 中程度
* Motion: 下からわずかに上がりながら表示

Toastは短時間で消える前提にします。重要な状態や長文の説明には使いません。

## Iconography

アイコンは、線の細いシンプルな形を基本にします。

### General Rules

* Stroke Width: 1.5pxから2px
* Line Cap: round
* Line Join: round
* Fill: 原則なし
* Color: 現在のテキスト色に合わせる
* Decorative Fill: 小さい面や状態アイコンのみ許可
* Size: 14pxから28pxを中心にする

### Icon Sizes

* Navigation Icon: 14pxから15px
* Sidebar Icon: 14pxから16px
* Sidebar Icon Container: 28px
* Empty State Icon: 28px
* Compact Item Icon: 36px
* Standard Item Icon: 52pxから56px
* Large Feature Icon: 110px

## Motion

動きは短く、静かにします。

### Duration

* Small Interaction: 0.12sから0.15s
* Page Transition: 0.18sから0.22s
* Toast: 0.22s
* Card Hover: 0.15sから0.18s

### Movement

* Page Enter: 下から6pxから8px
* Card Hover: 上へ1pxから2px
* Button Hover: 背景色の変化を中心にする
* Toast Enter: 下から10px

大きな移動、過剰な拡大、跳ねる動きは使いません。

## Accessibility

### Contrast

本文と主要操作は、背景に対して十分なコントラストを確保します。

補助テキストは #606060 を基準にします。#A0A0A0 は弱い情報や空状態に限定します。

### Focus

キーボード操作に対応する要素は、focus状態を持つ必要があります。

* Focus Border: #0A0A0A
* Focus Background: #FAFAFA
* Focus Ring: 薄い黒

### Hit Area

クリックまたはタップ可能な要素は、視覚上のサイズが小さい場合でも、十分な操作領域を確保します。

* 推奨最小高さ: 32px
* 主要操作: 36pxから40px
* サイドバー項目: 34pxから44px

### Labels

入力欄には、視覚的なラベルを付けます。

プレースホルダーだけで入力内容を説明しないでください。状態値や識別子は、値だけでなくラベルと一緒に表示します。

## Writing

文言は短く、直接的にします。

### Labels

ラベルは名詞を中心にします。

例:

* 名前
* 説明
* 状態
* バージョン
* 識別子
* 更新日

### Empty State

空状態の文は短くします。

例:

* 項目がありません
* データがありません
* 結果がありません
* まだ作成されていません

### Status

状態値は短くします。

例:

* 有効
* 無効
* 保留中
* 完了
* 失敗
* 下書き

UI上で同じ意味を持つ文言は、常に同じ語を使います。
