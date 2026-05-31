# 04_FUNCTIONS

## src/app.js

### getSelectedMenus()

今日のクエスト候補でチェックされている項目を配列で返す。
現在は保存処理には使わず、将来の達成済み表示に使う想定。

### getSelectedExercise()

保存対象として選択された1つの種目を返す。

### getRecordType()

記録方式として選択されている値を返す。
値は時間式の `time` または回数式の `count`。

### getRecordAmount()

分または回の入力欄から、入力された値を文字列で返す。

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

### handleMusicFileChange()

音楽ファイルが選択されたときに、ファイル名を画面に表示し、再生用URLを作る。

### playSelectedMusic()

選択済みの音楽ファイルを再生する。
音楽が未選択の場合はエラーメッセージを表示する。

### startWorkout()

「筋トレ開始」ボタンが押されたときに、トレーナーコメントを開始用の文言に変更する。

### addHistoryRecord(exercise, recordType, amount, effort)

保存された1種目ログを履歴エリアに1件追加する。

### saveTodayRecord()

現在の入力内容を取得し、入力チェックを行ったうえで、1種目ログを履歴に追加する。

### disableSaveButtonTemporarily()

同じ内容の連続保存を防ぐため、保存後2秒間だけ保存ボタンを無効化する。
