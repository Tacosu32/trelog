# 04_FUNCTIONS

## src/app.js

### getSelectedExercise()

保存対象として選択された1つの種目を返す。
「その他 / 新規追加」が選択されている場合は、新しい種目名入力欄の値を返す。

### getTodayText()

履歴表示に使う今日の日付を返す。

### handleExerciseChange()

種目プルダウンの変更に応じて、新しい種目名入力欄の表示・非表示を切り替える。

### getRecordType()

記録方式として選択されている値を返す。
値は時間式の `time` または回数式の `count`。

### getRecordAmount()

分または回の入力欄から、入力された値を文字列で返す。
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

記録方式が切り替わったときに、入力欄のラベルとプレースホルダーを更新する。

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

### updateGoalCard()

今日の目標カードの現在スコアと達成率を更新する。

### handleMusicFileChange()

音楽ファイルが選択されたときに、ファイル名を画面に表示し、再生用URLを作る。

### playSelectedMusic()

選択済みの音楽ファイルを再生する。
音楽が未選択の場合はエラーメッセージを表示する。

### addHistoryRecord(exercise, recordType, amount, effort, elapsedSeconds, score)

保存された1種目ログを履歴エリアに1件追加する。
日付、種目、記録値、きつさ、簡易スコアを表示する。
回数式の場合は、タイマーの経過時間を補助情報として表示する。

### saveTodayRecord()

現在の入力内容を取得し、入力チェックと簡易スコア計算を行ったうえで、1種目ログを履歴に追加する。
保存後はタイマーをリセットする。

### disableSaveButtonTemporarily()

同じ内容の連続保存を防ぐため、保存後2秒間だけ保存ボタンを無効化する。
