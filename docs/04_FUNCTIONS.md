# 04_FUNCTIONS

## app.js

### getSelectedExercise()

保存対象として選択された1つの種目を返す。
「その他 / 新規追加」が選択されている場合は、新しい種目名入力欄の値を返す。

### getExerciseId()

保存用の種目IDを返す。
自由種目の場合は `custom-種目名` の形式にする。

### getTodayText()

画面表示に使う今日の日付を返す。

### getTodayDateString()

保存・集計に使う今日の日付を `YYYY-MM-DD` 形式で返す。

### formatDateString(date)

Dateオブジェクトを `YYYY-MM-DD` 形式に変換する。

### addDays(dateText, days)

`YYYY-MM-DD` 形式の日付に日数を足し引きした日付を返す。
継続日数の計算に使う。

### handleExerciseChange()

種目プルダウンの変更に応じて、新しい種目名入力欄の表示・非表示を切り替え、目標到達目安を更新する。

### getRecordType()

記録方式として選択されている値を返す。
値は時間式の `time` または回数式の `reps`。

### getRecordAmount()

分または回の入力値を返す。
時間式でタイマーが動いていた場合は、タイマーの経過分を記録値として返す。
回数式でセッションオーバーレイが開いている場合は、セッション内の回数入力値を返す。

### getSelectedEffort()

きつさのラジオボタンで選択されている値を返す。

### showMessage(message, isSuccess)

画面下部のメッセージ欄に、成功メッセージまたはエラーメッセージを表示する。

### updateTrainerComment(message)

トレーナーコメントを指定された文言に変更する。
開始、一時停止、再開、保存、目標達成、休憩チケット自動使用、入力エラーの分岐で使う。

### validateRecord(exercise, amount, recordType)

保存前に、種目が選択されているか、分または回が入力されているかを確認する。
問題がある場合はエラーメッセージを返す。

### getRecordUnit(recordType)

記録方式に応じて、時間式なら `分`、回数式なら `回` を返す。

### updateRecordUnit()

記録方式が切り替わったときに、入力欄のラベル、プレースホルダー、単位を更新する。

### formatElapsedTime(totalSeconds)

タイマーの経過秒数を `mm:ss` 形式の文字列に変換する。

### getElapsedMinutes()

タイマーの経過秒数を分に変換し、時間式の記録値に使える形で返す。
小数1桁に丸める。

### updateTimerDisplay()

タイマー表示を現在の経過秒数で更新する。
時間式の場合は、経過分を入力欄にも反映する。
セッションオーバーレイの経過時間表示も同時に更新する。

### startTimer()

タイマーを開始する。

### pauseTimer()

タイマーを一時停止する。

### resetTimer()

タイマーを停止し、経過時間と開始ボタン表示を初期状態に戻す。
状態は `idle` に戻す。

### handleWorkoutButtonClick()

`idle` の場合はセッションを開始する。
既に `running` または `paused` の場合は、開始、一時停止、再開を切り替える。

### openSessionOverlay()

セッションオーバーレイを表示し、現在の種目、記録方式、経過時間、今日のスコア、目標到達目安を反映する。

### closeSessionOverlay()

セッションオーバーレイを非表示にする。

### isSessionOpen()

セッションオーバーレイが表示中かどうかを返す。

### getRecordTypeText(recordType)

記録方式の表示用テキストを返す。
`time` は「時間」、`reps` は「回数」とする。

### getGoalRecommendationText(exercise, recordType, effort, projectedScore)

セッション画面と今日の目標カードで使う、目標到達までの目安文言を返す。
セッション見込みスコアを受け取り、今日の保存済みスコアと合算して残り目安を計算する。

### calculateSessionAmount(recordType)

セッション中の入力量を返す。
時間式では経過分、回数式ではセッション内の回数入力値を返す。

### calculateSessionProjectedScore(exercise, recordType, effort)

セッションを保存した場合に増える見込みスコアを計算する。

### calculateRemainingAmountFromScore(remainingScore, exercise, recordType, effort)

残りスコア、種目係数、きつさ補正から、目標到達までに必要な分または回数を計算する。

### updateSessionRecordControls()

記録方式に応じて、セッション内の回数入力欄の表示・非表示を切り替える。
回数式でメイン画面に入力済みの回数があれば、セッション入力欄へ引き継ぐ。

### updateSessionDisplay()

セッションオーバーレイ内の状態表示、種目名、記録方式、経過時間、見込み込みの今日のスコア、セッション見込みスコア、目標到達目安、音楽ファイル名を更新する。

### startSession()

種目が選択されていることを確認し、セッションオーバーレイを表示してタイマーを開始する。

### handleSessionPauseButtonClick()

セッション画面の一時停止 / 再開ボタンから、`running` と `paused` を切り替える。

### handleSessionSaveButtonClick()

セッション画面から現在の種目ログを保存する。
保存に成功した場合はセッションオーバーレイを閉じる。

### cancelSession()

保存せずにタイマーをリセットし、セッションオーバーレイを閉じる。

### getExerciseCoefficient(exercise, recordType)

種目と記録方式に応じて、簡易スコア計算用の種目係数を返す。

### getEffortMultiplier(effort)

きつさに応じた補正値を返す。

### calculateScore(exercise, recordType, amount, effort)

簡易スコア仕様に従って、1つの種目ログのスコアを計算する。

### calculateNeededAmount(exercise, recordType, effort)

今日の目標到達までに必要な分または回数を計算する。
残りスコア ÷ 種目係数 ÷ きつさ補正を切り上げる。

### markGoalRewardIfNeeded()

今日のスコアが目標スコア以上で、まだ今日の達成状態を保存していない場合、今日の日付を `claimedGoalRewardDates` に追加する。
今日の目標達成では休憩チケットを付与しない。

### updateGoalRecommendation()

現在の種目、記録方式、きつさ、今日のスコア、目標スコアに応じて、目標到達目安を更新する。

### calculateTodayScore()

今日の日付のログだけを集計し、今日の現在スコアを返す。

### calculateTotalExp()

全ログのEXPを合計して返す。

### calculateLevel(totalExp)

`Math.floor(totalExp / 100) + 1` でレベルを計算する。

### calculateLevelProgress(totalExp)

現在レベル、次のレベルに必要なEXP、進捗EXP、進捗率を計算する。

### claimLevelRewardsIfNeeded()

現在レベルが5の倍数に到達していて未受け取りの場合、休憩チケットを1枚付与する。
受け取り済みレベルは `claimedLevelRewards` に保存する。

### getRecordedDateSet()

記録が1件以上ある日付のSetを返す。

### getRestDateSet()

`trelog_state.restDates` から休憩日のSetを返す。

### getContinuityDateSet()

記録日と休憩日を合わせた、継続扱いの日付Setを返す。

### hasContinuityBefore(dateText, continuityDates)

指定日より前に継続扱いの日付があるかを判定する。
休憩チケットをどこまで自動消費するか判断するために使う。

### consumeRestTicketsForMissedDays()

起動時に昨日以前の未記録日を確認し、継続が途切れそうな日を休憩チケットで補う。
チケットを使った場合は `restDates` と `restTickets` を更新し、`trelog_state` に保存する。

### calculateStreakDays()

記録が連続している日数を計算する。
記録日と休憩日を継続扱いにし、今日または昨日から過去へ連続日数を数える。

### getWeekStartDate(date)

指定日の週の月曜日を `YYYY-MM-DD` 形式で返す。

### calculateWeeklyStats()

今週の記録日数と週間スコアを計算する。

### calculateWeeklyRank(recordedDays, weeklyScore)

今週の記録日数と週間スコアからS〜Dの今週ランクを返す。

### updateGoalCard()

今日の目標カードの現在スコア、達成率、目標到達目安を更新する。

### updateDashboard()

累計EXP、レベル、継続日数、休憩チケット枚数、今週ランクを画面に反映する。

### updateLevelProgress(totalExp)

レベル進捗バー、現在EXP、次のレベルまでの必要EXPを画面に反映する。

### updateAllStats()

目標カードとダッシュボードをまとめて更新する。

### loadRecords()

localStorageの `trelog_records` から種目ログ配列を読み込む。

### saveRecords()

現在の種目ログ配列をlocalStorageの `trelog_records` に保存する。

### getDefaultState()

`trelog_state` の初期値を返す。
初期値は休憩チケット2枚、休憩日なし、目標達成済み日付なし、レベル報酬受け取り済みなし。

### normalizeState(parsedState)

保存済みの状態データを現在形式に整える。
旧形式の `freezeTickets` と `frozenDates` は `restTickets` と `restDates` に移行する。

### loadState()

localStorageの `trelog_state` から状態データを読み込む。
未保存または壊れている場合は初期値を返す。

### saveState()

現在の状態データをlocalStorageの `trelog_state` に保存する。

### createRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score)

保存形式に合わせた1件分の種目ログオブジェクトを作成する。

### handleMusicFileChange()

音楽ファイルが選択されたときに、ファイル名を画面に表示し、再生用URLを作る。
セッション画面内の音楽ファイル名表示も更新する。

### getSelectedMusicFileName()

現在選択されている音楽ファイル名を返す。
未選択の場合は `未選択` を返す。

### playSelectedMusic()

選択済みの音楽ファイルを再生する。
音楽が未選択の場合はエラーメッセージを表示する。

### stopSelectedMusic()

再生中の音楽を停止し、再生位置を先頭に戻す。

### toggleSessionMusic()

セッション画面の音楽ボタンから、音楽の再生と停止を切り替える。

### adjustSessionReps(amount)

セッション画面の回数入力値を指定数だけ増やす。
`+1`、`+5`、`+10` ボタンで使う。

### clearSessionReps()

セッション画面の回数入力値を空にする。

### addHistoryRecord(record, index)

保存済みの1種目ログを履歴エリアに1件追加する。

### renderHistory()

localStorageから読み込んだ記録を含め、現在の種目ログ配列を履歴エリアに再描画する。

### renderRestDates()

`restDates` に含まれる休憩日を、履歴エリア下部に小さく表示する。

### saveTodayRecord()

現在の入力内容を取得し、入力チェック、簡易スコア計算、localStorage保存、今日の目標達成状態保存、レベル報酬、履歴再描画、各種ステータス更新を行う。
保存後はタイマーをリセットする。
保存に成功した場合は `true`、入力エラーの場合は `false` を返す。

### disableSaveButtonTemporarily()

同じ内容の連続保存を防ぐため、保存後2秒間だけ保存ボタンを無効化する。

### initializeApp()

起動時にlocalStorageから記録と状態を読み込み、休憩チケットの自動消費、今日の目標達成状態、レベル報酬を確認したうえで、日付、履歴、今日のスコア、EXP、レベル、継続日数を画面に反映する。

### createTestRecord(dateText)

デバッグ用のテスト記録を指定日付で作成する。

### setupDebugPanel()

`DEBUG_MODE` が有効な場合、開発用デバッグパネルのボタンに処理を登録する。

### updateDebugStorageOutput()

`trelog_records` と `trelog_state` の現在内容をデバッグパネルへ表示する。

### clearRecords()

デバッグ用に記録データだけを削除する。

### clearState()

デバッグ用に状態データだけを初期化する。

### clearAllData()

デバッグ用に記録データと状態データを削除する。

### addRestTicket()

デバッグ用に休憩チケットを1枚追加する。

### zeroRestTickets()

デバッグ用に休憩チケットを0枚にする。

### addTestRecord(dateText)

デバッグ用に指定日付のテスト記録を追加する。

## service-worker.js

### install event

service workerのインストール時に、`index.html`、`style.css`、`app.js`、`manifest.json` をキャッシュする。
アイコンは存在しない場合でもインストールに失敗しないよう、任意キャッシュとして扱う。

### activate event

古いキャッシュ名のデータを削除し、現在のキャッシュだけを残す。

### fetch event

GETリクエストに対して、キャッシュに保存済みのレスポンスがあればそれを返す。
キャッシュにない場合は通常どおりネットワークから取得する。
