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
| elapsedSeconds | タイマーの経過秒数 | `180` |
| effort | きつさ | `3` |
| score | 今日の目標用の簡易スコア | `120` |
| exp | 獲得EXP。今後実装 | `0` |

## Daily Achievement

日ごとの達成判定は、その日付のExerciseLogが1件以上ある場合に達成扱いとする。

## DailyGoal

今日の目標カードに表示する集計情報。

| フィールド | 内容 | 例 |
| --- | --- | --- |
| targetScore | 今日の目標スコア | `100` |
| currentScore | 今日保存した種目ログの簡易スコア合計 | `45` |
| achievementRate | 達成率 | `45%` |
| recommendation | おすすめ目安 | `腕立て10回 + ストレッチ5分` |

## TimerState

タイマーの状態。

| 値 | 内容 |
| --- | --- |
| stopped | 開始前 |
| running | 実行中 |
| paused | 一時停止中 |

## Exercise Coefficients

簡易スコア計算に使う種目係数。

| 種目 | 時間係数 | 回数係数 |
| --- | ---: | ---: |
| 腕立て | 10 | 2 |
| 腹筋 | 8 | 1.5 |
| スクワット | 8 | 1.5 |
| プランク | 12 | 0 |
| ストレッチ | 3 | 0 |
| 自由種目 | 5 | 1 |

## Effort Multipliers

| きつさ | 補正 |
| --- | ---: |
| 1 | 0.8 |
| 2 | 0.9 |
| 3 | 1.0 |
| 4 | 1.1 |
| 5 | 1.2 |
