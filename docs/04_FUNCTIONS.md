# 04_FUNCTIONS

## src/app.js

### getSelectedMenus()

今日のメニューでチェックされている項目を配列で返す。

### getWorkoutMinutes()

運動時間の入力欄から、入力された値を文字列で返す。

### getSelectedEffort()

きつさのラジオボタンで選択されている値を返す。

### showMessage(message, isSuccess)

画面下部のメッセージ欄に、成功メッセージまたはエラーメッセージを表示する。

### validateRecord(menus, minutes)

保存前に、メニューが選択されているか、運動時間が入力されているかを確認する。
問題がある場合はエラーメッセージを返す。

### handleMusicFileChange()

音楽ファイルが選択されたときに、ファイル名を画面に表示し、再生用URLを作る。

### playSelectedMusic()

選択済みの音楽ファイルを再生する。
音楽が未選択の場合はエラーメッセージを表示する。

### startWorkout()

「筋トレ開始」ボタンが押されたときに、トレーナーコメントを開始用の文言に変更する。

### addHistoryRecord(menus, minutes, effort)

保存された仮の記録を履歴エリアに1件追加する。

### saveTodayRecord()

現在の入力内容を取得し、入力チェックを行ったうえで、仮の記録を履歴に追加する。
