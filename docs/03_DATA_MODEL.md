# 03_DATA_MODEL

## Alpha Data Policy

α版ではlocalStorageへ保存する。
種目ログの保存キーは `trelog_records`、状態データの保存キーは `trelog_state` とする。

## ExerciseLog

1回の保存で作成する、1つの種目ログ。

| フィールド | 内容 | 例 |
| --- | --- | --- |
| id | ログを識別するID | `record-1717240000000` |
| date | 記録日 | `2026-06-01` |
| exerciseId | 種目ID | `腕立て` |
| exerciseName | 種目名 | `腕立て` |
| mode | 記録方式。時間または回数 | `time` / `reps` |
| value | 入力値 | `15` |
| unit | 単位 | `分` / `回` |
| elapsedSeconds | タイマーの経過秒数 | `180` |
| intensity | きつさ | `3` |
| score | 今日の目標用の簡易スコア | `120` |
| exp | 獲得EXP。現在は簡易スコアと同じ値 | `120` |
| musicFileName | 選択した音楽ファイル名 | `song.mp3` |
| createdAt | 作成日時 | `2026-06-01T10:00:00.000Z` |

## Daily Achievement

日ごとの達成判定は、その日付のExerciseLogが1件以上ある場合に達成扱いとする。

## TrelogState

休憩チケット、今日の目標達成、レベル報酬の状態。

| フィールド | 内容 | 初期値 |
| --- | --- | --- |
| restTickets | 所持している休憩チケット枚数 | `2` |
| restDates | 休憩チケットで守った日付 | `[]` |
| claimedGoalRewardDates | 今日の目標達成報酬を受け取った日付 | `[]` |
| claimedLevelRewards | レベル到達報酬を受け取ったレベル | `[]` |

旧形式の `freezeTickets` と `frozenDates` が保存されている場合は、読み込み時に `restTickets` と `restDates` に移行する。

## DailyGoal

今日の目標カードに表示する集計情報。

| フィールド | 内容 | 例 |
| --- | --- | --- |
| targetScore | 今日の目標スコア | `100` |
| currentScore | 今日の日付の種目ログの簡易スコア合計 | `45` |
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

## Level

全ログのEXPを合計し、以下の式でレベルを計算する。

```js
level = Math.floor(totalExp / 100) + 1
```

現在レベル内の進捗は以下で計算する。

```js
currentLevelStartExp = (currentLevel - 1) * 100
nextLevelExp = currentLevel * 100
progressExp = totalExp - currentLevelStartExp
requiredExp = nextLevelExp - totalExp
progressRate = progressExp / 100
```

5レベルごとに休憩チケットを1枚付与する。
報酬済みレベルは `claimedLevelRewards` に保存する。

## Weekly Rank

今週は月曜始まりとする。
今週の記録日数と週間スコアからランクを計算する。

| ランク | 条件 |
| --- | --- |
| S | 今週5日以上記録、または週間スコア500以上 |
| A | 今週4日以上記録、または週間スコア350以上 |
| B | 今週3日以上記録、または週間スコア200以上 |
| C | 今週1〜2日記録 |
| D | 今週記録なし |

## Streak

連続日数は記録日と休憩日をもとに計算する。
今日が記録日または休憩日なら今日から数え、そうでなければ昨日から数える。
途中に未記録かつ未休憩の日があればそこで終了する。

## Goal Reward

今日のスコアが目標スコア以上になり、今日の日付が `claimedGoalRewardDates` に含まれていない場合、今日の日付を `claimedGoalRewardDates` に追加する。
今日の目標達成では休憩チケットを付与しない。
