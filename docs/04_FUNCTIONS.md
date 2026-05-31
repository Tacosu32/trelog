# 04_FUNCTIONS

## src/app.js

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

### getSelectedEffort()

きつさのラジオボタンで選択されている値を返す。

### showMessage(message, isSuccess)

画面下部のメッセージ欄に、成功メッセージまたはエラーメッセージを表示する。

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

### updateTimerDisplay()

タイマー表示を現在の経過秒数で更新する。
時間式の場合は、経過分を入力欄にも反映する。

### startTimer()

タイマーを開始する。

### pauseTimer()

タイマーを一時停止する。

### resetTimer()

タイマーを停止し、経過時間と開始ボタン表示を初期状態に戻す。

### handleWorkoutButtonClick()

タイマー状態に応じて、開始、一時停止、再開を切り替える。

### getExerciseCoefficient(exercise, recordType)

種目と記録方式に応じて、簡易スコア計算用の種目係数を返す。

### getEffortMultiplier(effort)

きつさに応じた補正値を返す。

### calculateScore(exercise, recordType, amount, effort)

簡易スコア仕様に従って、1つの種目ログのスコアを計算する。

### calculateNeededAmount(exercise, recordType, effort)

今日の目標到達までに必要な分または回数を計算する。
残りスコア ÷ 種目係数 ÷ きつさ補正を切り上げる。

### updateGoalRecommendation()

現在の種目、記録方式、きつさ、今日のスコア、目標スコアに応じて、目標到達目安を更新する。

### calculateTodayScore()

今日の日付のログだけを集計し、今日の現在スコアを返す。

### calculateTotalExp()

全ログのEXPを合計して返す。

### calculateLevel(totalExp)

`Math.floor(totalExp / 100) + 1` でレベルを計算する。

### calculateStreakDays()

記録が連続している日数を計算する。
今日に記録があれば今日から、なければ昨日から数え、未記録日で終了する。

### updateGoalCard()

今日の目標カードの現在スコア、達成率、目標到達目安を更新する。

### updateDashboard()

累計EXP、レベル、継続日数を画面に反映する。

### updateAllStats()

目標カードとダッシュボードをまとめて更新する。

### loadRecords()

localStorageの `trelog_records` から種目ログ配列を読み込む。

### saveRecords()

現在の種目ログ配列をlocalStorageの `trelog_records` に保存する。

### createRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score)

保存形式に合わせた1件分の種目ログオブジェクトを作成する。

### handleMusicFileChange()

音楽ファイルが選択されたときに、ファイル名を画面に表示し、再生用URLを作る。

### playSelectedMusic()

選択済みの音楽ファイルを再生する。
音楽が未選択の場合はエラーメッセージを表示する。

### addHistoryRecord(record, index)

保存済みの1種目ログを履歴エリアに1件追加する。

### renderHistory()

localStorageから読み込んだ記録を含め、現在の種目ログ配列を履歴エリアに再描画する。

### saveTodayRecord()

現在の入力内容を取得し、入力チェック、簡易スコア計算、localStorage保存、履歴再描画、各種ステータス更新を行う。
保存後はタイマーをリセットする。

### disableSaveButtonTemporarily()

同じ内容の連続保存を防ぐため、保存後2秒間だけ保存ボタンを無効化する。

### initializeApp()

起動時にlocalStorageから記録を読み込み、日付、履歴、今日のスコア、EXP、レベル、継続日数を画面に反映する。
