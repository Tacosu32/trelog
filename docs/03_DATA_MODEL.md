# 03_DATA_MODEL

## Alpha Data Policy

α版では最終的にlocalStorageへ保存する予定だが、現在の段階では画面上の仮表示だけを行う。

## ExerciseLog

1回の保存で作成する、1つの種目ログ。

| フィールド | 内容 | 例 |
| --- | --- | --- |
| id | ログを識別するID | `log-1` |
| date | 記録日 | `2026-05-31` |
| exercise | 種目名 | `腕立て` |
| recordType | 記録方式。時間または回数 | `time` / `count` |
| amount | 入力値 | `15` |
| unit | 単位 | `分` / `回` |
| effort | きつさ | `3` |
| exp | 獲得EXP。今後実装 | `0` |

## Daily Achievement

日ごとの達成判定は、その日付のExerciseLogが1件以上ある場合に達成扱いとする。

## Quest Candidates

チェックボックス式のメニューは、保存対象そのものではなく、今日のクエスト候補または達成済み表示として扱う。
