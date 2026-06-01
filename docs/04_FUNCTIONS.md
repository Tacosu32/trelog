# 04_FUNCTIONS

## app.js

### switchView(viewName)

ホーム、記録、履歴、設定の表示画面を切り替える。
対象の `.app-view` だけを表示し、下部ナビゲーションの選択状態と `aria-current` を更新する。
ホーム画面の「記録を開始する」ボタンと下部ナビゲーションから呼び出す。

### cloneScoringConfig(config)

スコア設定オブジェクトをディープコピーする。

### normalizeScoringConfig(config)

開発者用スコア設定を `DEFAULT_SCORING_CONFIG` の形に補完する。
不足値や不正値はデフォルト値で埋める。

### loadScoringConfig()

localStorageの `trelog_dev_scoring_config` を読み込み、有効な場合は開発者用設定、不正または未保存なら `DEFAULT_SCORING_CONFIG` を返す。

### saveDevScoringConfig()

現在のスコア設定を `trelog_dev_scoring_config` に保存し、開発者用設定を有効状態にする。

### resetDevScoringConfig()

`trelog_dev_scoring_config` を削除し、スコア設定を `DEFAULT_SCORING_CONFIG` に戻す。

### getDailyGoalScore()

現在有効なスコア設定から、今日の目標スコアを返す。

### isLocalDevelopment()

現在の実行環境がlocalhostまたはローカルファイルかどうかを返す。
ローカル個人用トレーナー画像を参照してよいか判断するために使う。

### getTrainerImageCandidates(context)

トレーナー表示状態に応じて、読み込み候補の画像パスを優先順で返す。
localhostでは `assets/trainer/local/trainer_private.png` を先頭にし、公開環境ではpublic画像だけを返す。

### setTrainerImage(imageElement, context)

指定された画像要素に、状況に合うトレーナー画像を設定する。
状況別public画像、default画像、既存CSS仮表示の順でフォールバックする。

### updateTrainerImages(contexts)

ホーム、セッション、リザルトのトレーナー画像をまとめて初期化または更新する。

### getSelectedExercise()

保存対象として選択された1つの種目を返す。
「その他 / 新規追加」が選択されている場合は、新しい種目名入力欄の値を返す。

### getExerciseId()

保存用の種目IDを返す。
自由種目の場合は `custom-種目名` の形式にする。
定義済み種目の場合は `EXERCISE_DEFINITIONS` の `id` を返す。

### getExerciseDefinition(exercise)

種目名から `EXERCISE_DEFINITIONS` の種目定義を返す。
未定義または自由種目の場合は `custom` 定義を返す。

### isRecordModeAllowed(exercise, recordType)

指定した種目が、指定した記録方式に対応しているかを返す。
開始・保存前のバリデーションとスコア計算の安全確認で使う。

### getAllowedRecordModeText(exercise)

指定した種目で使える記録方式を「時間」または「時間 / 回数」の表示文字列にする。

### updateRecordModeAvailability()

選択中の種目に応じて、記録方式ラジオの有効・無効、補足文、disabled表示を更新する。
現在選択中の方式が非対応なら、対応している方式へ自動で切り替える。

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
あわせて、種目ごとの対応記録方式を反映する。

### getRecordType()

記録方式として選択されている値を返す。
値は時間式の `time` または回数式の `reps`。

### getRecordAmount()

分または回の入力値を返す。
時間式でタイマーが動いていた場合は、タイマーの経過秒数を分換算した値を返す。
回数式でセッションオーバーレイが開いている場合は、セッション内の回数入力値を返す。

### getSelectedEffort()

きつさのラジオボタンで選択されている値を返す。

### showMessage(message, isSuccess)

画面下部のメッセージ欄に、成功メッセージまたはエラーメッセージを表示する。

### updateTrainerComment(message)

トレーナーコメントを指定された文言に変更する。
開始、一時停止、再開、保存、目標達成、休憩チケット自動使用、入力エラーの分岐で使う。

### getTrainerLine(context)

`TRAINER_LINES` から、セッション状態、経過秒数、種目名、記録方式、きつさ、目標達成見込みに応じた定型セリフを返す。

### updateSessionTrainerLine(projectedGoalReached)

現在のセッション状態をもとに、セッションオーバーレイ内のトレーナーコメントを更新する。

### setTemporarySessionLine(message)

再開直後など一時的に優先表示したいセッションセリフを数秒だけ表示し、その後は通常の状態分岐へ戻す。

### validateRecord(exercise, amount, recordType)

保存前に、種目が選択されているか、分または回が入力されているかを確認する。
種目が対応していない記録方式の場合は保存不可にする。
時間式では、入力値ではなく `elapsedSeconds` が1秒以上かを確認する。
問題がある場合はエラーメッセージを返す。

### getRecordUnit(recordType)

記録方式に応じて、時間式なら `分`、回数式なら `回` を返す。

### updateRecordUnit()

記録方式が切り替わったときに、入力欄のラベル、プレースホルダー、単位を更新する。
種目ごとの対応記録方式も確認し、非対応方式が選ばれた状態を残さない。

### formatElapsedTime(totalSeconds)

タイマーの経過秒数を `mm:ss` 形式の文字列に変換する。

### secondsToMinutes(seconds)

秒数を分に変換する。
時間式ログの `value`、スコア計算、見込みスコア計算で使う。

### formatDuration(seconds)

時間式ログの表示用文字列を返す。
60秒未満は `30秒` のように秒表示、60秒以上は `1.5分` のように小数1桁の分表示にする。

### getElapsedMinutes()

タイマーの経過秒数を分に変換し、時間式の記録値に使える形で返す。

### updateTimerDisplay()

タイマー表示を現在の経過秒数で更新する。
時間式の場合は、経過秒数を分換算した値を入力欄にも反映する。
セッションオーバーレイの経過時間表示は `formatDuration()` で秒または分の表示に変換する。

### startTimer()

タイマーを開始する。

### pauseTimer()

タイマーを一時停止する。

### stopTimerForSave()

セッションの記録終了時に、経過秒数を残したままタイマーだけを停止する。
`running` 状態から記録して終了を押した場合、保存前にこの関数で計測を止める。

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
時間式では経過秒数を分換算した値、回数式ではセッション内の回数入力値を返す。

### calculateSessionProjectedScore(exercise, recordType, effort)

セッションを保存した場合に増える見込みスコアを計算する。

### calculateRemainingAmountFromScore(remainingScore, exercise, recordType, effort)

残りスコア、種目係数、きつさ補正から、目標到達までに必要な分または回数を計算する。

### updateSessionRecordControls()

記録方式に応じて、セッション内の回数入力欄の表示・非表示を切り替える。
回数式でメイン画面に入力済みの回数があれば、セッション入力欄へ引き継ぐ。

### updateSessionDisplay()

セッションオーバーレイ内の状態表示、種目名、記録方式、経過時間、見込み込みの今日のスコア、セッション見込みスコア、目標到達目安、音楽ファイル名を更新する。
あわせて、セッション状態に応じたトレーナー画像とセリフ、音楽ループ表示を更新する。

### startSession()

種目が選択されていることを確認し、セッションオーバーレイを表示してタイマーを開始する。
種目が対応していない記録方式では開始できない。

### handleSessionPauseButtonClick()

セッション画面の一時停止 / 再開ボタンから、`running` と `paused` を切り替える。

### handleSessionSaveButtonClick()

セッション画面から現在の種目ログを保存する。
`running` 状態の場合は、まず `stopTimerForSave()` でタイマーを止め、その時点の経過時間を保存値に使える状態にする。
保存に成功した場合はセッションオーバーレイを閉じ、リザルトオーバーレイを表示する。

### cancelSession()

保存せずにタイマーをリセットし、セッションオーバーレイを閉じる。

### getExerciseCoefficient(exercise, recordType)

種目と記録方式に応じて、簡易スコア計算用の種目係数を返す。
係数は現在有効なスコア設定の `exerciseCoefficients` を参照する。

### getEffortMultiplier(effort)

きつさに応じた補正値を返す。
倍率は現在有効なスコア設定の `intensityMultipliers` を参照する。

### getEvaluationProfile()

現在の `trelog_state.evaluationProfile` を返す。
未設定または不正値の場合は `standard` を返す。

### getEvaluationProfileMultiplier()

現在の評価プロファイルに対応するスコア補正倍率を返す。
倍率は現在有効なスコア設定の `evaluationProfileMultipliers` を参照する。

### updateEvaluationProfileDisplay()

設定画面の評価レベル選択欄と説明文を、現在の評価プロファイルに合わせて更新する。

### handleEvaluationProfileChange()

設定画面で評価レベルが変更されたときに、`trelog_state.evaluationProfile` を更新してlocalStorageへ保存する。
変更後は目標到達目安、セッション見込み、デバッグ表示を更新する。

### renderScoringConfigPanel()

設定画面の開発者用スコア調整パネルを描画する。
今日の目標スコア、きつさ倍率、評価プロファイル倍率、種目係数、プレビュー、JSON表示を初期化する。

### updateScoringConfigPanelState()

開発者用スコア設定の有効表示、設定JSON、評価レベル説明、スコアプレビューを更新する。

### updateScoringConfigFromInput(input)

スコア調整パネルの入力変更を現在のスコア設定へ反映し、`trelog_dev_scoring_config` に保存する。
変更後は目標カード、履歴、セッション見込み、デバッグ表示を更新する。

### updateScorePreview()

テスト計算エリアの入力値から、スコア、使用係数、計算式を表示する。

### copyScoringConfigJson()

現在の開発者用スコア設定JSONをクリップボードへコピーする。

### calculateScore(exercise, recordType, amount, effort)

簡易スコア仕様に従って、1つの種目ログのスコアを計算する。
非対応の記録方式ではスコアを0として扱い、保存・開始側のバリデーションで通常は到達しないようにする。
種目係数、きつさ補正、評価プロファイル補正を掛け合わせて計算する。

### calculateRecordScore(exercise, recordType, amount, effort, savedElapsedSeconds)

保存時の1件分のスコアを計算する。
時間式では `savedElapsedSeconds / 60` を分換算してスコア計算に使い、回数式では入力回数を使う。

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
初期値は休憩チケット2枚、休憩日なし、目標達成済み日付なし、レベル報酬受け取り済みなし、評価プロファイルは標準。

### normalizeState(parsedState)

保存済みの状態データを現在形式に整える。
旧形式の `freezeTickets` と `frozenDates` は `restTickets` と `restDates` に移行する。
`evaluationProfile` がない場合は `standard` で補完する。

### loadState()

localStorageの `trelog_state` から状態データを読み込む。
未保存または壊れている場合は初期値を返す。

### saveState()

現在の状態データをlocalStorageの `trelog_state` に保存する。

### createRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score)

保存形式に合わせた1件分の種目ログオブジェクトを作成する。
時間式では `elapsedSeconds` を保存し、`value` には互換・表示用の分換算値を入れる。

### handleMusicFileChange()

音楽ファイルが選択されたときに、ファイル名を画面に表示し、再生用URLを作る。
セッション画面内の音楽ファイル名表示も更新する。

### applyMusicLoopSetting()

`trelog_state.musicLoop` を `audio.loop` と通常画面・セッション画面のループチェックボックスへ反映する。

### handleMusicLoopChange(event)

音楽ループON/OFFが変更されたときに、`trelog_state.musicLoop` を更新してlocalStorageに保存する。

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

### getResultTrainerComment(result)

リザルト内容に応じたトレーナーコメントを返す。
通常記録、今日の目標達成、レベルアップ、休憩チケット獲得、低きつさ、高きつさで文言を切り替える。

### getResultTitle(result)

リザルト画面の大見出しを返す。
今日の目標達成時は「今日の目標達成！」、レベルアップ時は「レベルアップ！」、通常記録時は「ナイス記録！」とする。

### getResultAnimationClass(result)

リザルト画面に付与する演出用クラス名を返す。
今日の目標達成時、レベルアップ時、休憩チケット獲得時は紙吹雪、通常記録時は控えめなキラキラにする。

### createResultSummary(record, beforeLevel, levelRewards, goalMarked)

保存済みレコード、保存前レベル、レベル報酬、今日の目標達成状態から、リザルト表示用の情報を作成する。
保存後のレベル、今日のスコア、達成率、次レベルまでのEXP、レベルアップ有無を含める。

### renderResultBadges(result)

今日の目標達成、Lv.UP、休憩チケット獲得のうち、該当するものだけをバッジ風に描画する。

### showResultOverlay(result)

リザルトオーバーレイへ記録内容、獲得スコア、EXP、今日の進捗、達成率、成長、バッジ、報酬、演出クラスを反映して表示する。
時間式の記録内容は `elapsedSeconds` を優先して、秒または分の表示に変換する。
演出クラスに応じて、オーバーレイ全体に届く紙吹雪または控えめなキラキラをCSSアニメーションで表示する。

### closeResultOverlay()

リザルトオーバーレイを閉じ、祝福演出用の状態を解除する。

### getHistoryDateParts(dateText)

`YYYY-MM-DD` 形式の日付を、年、月、日に分けて返す。
履歴の年・月・日階層を作るために使う。

### formatHistoryDate(dateText)

履歴の日付行で使う表示用の日付を `YYYY/MM/DD` 形式で返す。

### formatHistoryAmount(amount, unit)

履歴の種目別集計で使う合計記録値を、単位付きの表示文字列に変換する。
小数がある場合は小数1桁で表示する。

### getRecordDurationSeconds(record)

時間式ログの表示・集計に使う秒数を返す。
`elapsedSeconds` があればそれを優先し、古いデータ向けに `value` から秒へ戻す fallback を持つ。

### getRecordDisplayValue(record)

リザルトなど単一ログ表示用の記録値文字列を返す。
時間式では `formatDuration()`、回数式では `value + unit` を使う。

### getHistoryExerciseAmountText(exerciseSummary)

履歴の種目別集計で表示する合計記録値を返す。
時間式では合計秒数を `formatDuration()` で表示し、回数式では合計値と単位を表示する。

### createHistorySummary()

`trelog_records` の保存形式は変更せず、現在の `records` 配列から履歴表示用の集計データを作成する。
年、月、日、種目単位にまとめ、日ごとの合計スコア、種目数、種目ごとの合計記録値、合計スコア、件数、平均きつさ計算用の値を作る。
時間式ログは `value` ではなく `elapsedSeconds` を合計する。

### appendHistoryExercise(parent, exerciseSummary)

種目別集計行を作成し、親要素に追加する。
種目名、合計記録値、合計スコア、記録件数、平均きつさを表示する。

### appendHistoryDay(parent, daySummary, shouldOpen)

日付単位の折りたたみ行を作成し、親要素に追加する。
日付、合計スコア、目標スコア、達成状態、記録種目数を表示する。

### appendHistoryMonth(parent, monthSummary, shouldOpen)

月単位の折りたたみ行を作成し、配下に日付行を追加する。

### appendHistoryYear(parent, yearSummary, shouldOpen)

年単位の折りたたみ行を作成し、配下に月行を追加する。

### renderHistory()

localStorageから読み込んだ記録を含め、現在の種目ログ配列を年、月、日、種目単位に集計して履歴エリアに再描画する。
最新の年、月、日を初期展開する。

### renderRestDates()

`restDates` に含まれる休憩日を、履歴エリア下部に小さく表示する。

### saveTodayRecord()

現在の入力内容を取得し、入力チェック、簡易スコア計算、localStorage保存、今日の目標達成状態保存、レベル報酬、履歴再描画、各種ステータス更新を行う。
保存後はタイマーをリセットする。
保存に成功した場合はリザルト表示用オブジェクト、入力エラーの場合は `false` を返す。

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

## 2026-06-01 追記: カスタム画像・バックアップ関連関数

### openUserAssetsDb()

IndexedDB `trelog_user_assets` を開き、初回作成時に `trainer_images` store を用意する。

### readTrainerImageRecord(key)

IndexedDBの `trainer_images` store から指定keyの画像を読み込む。4差分の `custom_default`、`custom_cheer`、`custom_result`、`custom_rest` と旧互換キーの読み込みに使う。

### writeTrainerImageRecord(key, file, savedAt)

指定keyへ、画像ファイル本体、ファイル名、MIME type、保存日時をIndexedDBへ保存する。

### deleteTrainerImageRecord(key)

IndexedDBから指定keyの画像を削除する。

### loadCustomTrainerImage()

起動時にIndexedDBのカスタム画像を読み込み、トレーナー画像表示へ反映する。

### validateCustomTrainerImageFile(file)

カスタムトレーナー画像の形式とサイズを検証する。png、jpg、jpeg、webp、5MB以内を許可する。

### renderTrainerImageSettings()

設定画面のトレーナー画像プレビュー、ファイル名、保存メタ情報、状態表示を更新する。

### handleCustomTrainerFileChange()

画像ファイル選択時に検証を行い、適用前の一時ファイルとして保持する。

### handleApplyCustomTrainerImage()

選択済み画像をIndexedDBへ保存し、ホーム、セッション、リザルトのトレーナー画像を更新する。

### handleDeleteCustomTrainerImage()

保存済みカスタム画像を削除し、public画像またはCSS仮表示へ戻す。

### getCustomTrainerImageMetaForBackup()

バックアップJSONやデバッグ表示へ含める4差分の画像メタ情報を返す。

### buildBackupData()

`trelog_records`、`trelog_state`、`trelog_dev_scoring_config` と4差分のカスタム画像メタ情報/Data URLを含むversion 2バックアップJSON用オブジェクトを作る。

### exportBackupData()

バックアップJSONを `trelog_backup_YYYY-MM-DD.json` としてダウンロードする。

### restoreBackupLocalStorage(backupData)

バックアップJSONからlocalStorageの3キーを復元する。

### importBackupData(file)

JSONファイルを読み込み、確認後に記録・状態・スコア設定を復元し、画面表示を更新する。

### getTrainerImageCandidates(context) 変更

画像候補の優先順位を、IndexedDBのカスタム画像、localhost専用画像、状況別public画像、`trainer_default.png` の順にする。

### setTrainerImage(imageElement, context) 変更

カスタム画像の有無が変わった場合にも再読み込みし、読み込み失敗時は次の候補画像へフォールバックする。

### clearAllData() 変更

記録、状態、開発者用スコア設定に加え、IndexedDBのカスタムトレーナー画像も削除する。

### initializeApp() 変更

起動時にIndexedDBのカスタムトレーナー画像を読み込んでから、各トレーナー表示を初期化する。

## 2026-06-01 追記: カスタム画像4差分・バックアップversion 2

### readTrainerImageRecord(key)

IndexedDBの `trainer_images` store から指定keyの画像レコードを読み込む。

### writeTrainerImageRecord(key, file, savedAt)

指定keyへ画像ファイル本体、ファイル名、MIME type、保存日時を保存する。

### deleteTrainerImageRecord(key)

指定keyの画像レコードをIndexedDBから削除する。

### clearCustomTrainerObjectUrl(slotKey)

指定スロットのObject URLを解放し、画面用のカスタム画像状態から削除する。

### clearAllCustomTrainerObjectUrls()

全カスタム画像スロットのObject URLを解放する。

### setCustomTrainerImageFromRecord(slotKey, record)

IndexedDBから読み込んだ画像レコードを、指定スロットの表示用Object URLとメタ情報に変換する。

### getTrainerImagesMetaPayload()

4差分の画像メタ情報をバックアップ/デバッグ表示用にまとめる。

### blobToDataUrl(blob)

画像BlobをバックアップJSONへ含めるためData URLへ変換する。

### dataUrlToFile(dataUrl, fileName, mimeType)

バックアップJSON内のData URLをFileへ戻し、IndexedDB復元に使う。

### getTrainerImagesBackupPayload()

4差分の画像メタ情報とData URLを含む `trainerImages` オブジェクトを作る。

### getBackupFileName(backupType)

バックアップ種別に応じて、軽量なら `trelog_backup_light_YYYY-MM-DD.json`、完全なら `trelog_backup_full_YYYY-MM-DD.json` を返す。

### getTrainerImagesBackupPayload(includeImageData) 変更

`includeImageData` が `false` の場合は画像メタ情報だけを返し、各 `dataUrl` は `null` にする。`true` の場合は画像BlobをData URLへ変換して含める。

### buildBackupData(backupType) 変更

`backupType` に `light` または `full` を受け取り、version 2バックアップJSONを作る。軽量では画像本体を含めず、完全ではData URLを含める。

### exportBackupData(backupType) 変更

軽量/完全の種別に応じたJSONを書き出し、ファイル名と画面メッセージを切り替える。

### restoreTrainerImagesFromBackup(backupData)

version 2バックアップの `trainerImages` にData URLがある場合、各スロットをIndexedDBへ復元する。
Data URLがない軽量バックアップの場合は画像復元をスキップし、エラーにしない。

### importBackupData(file) 変更

version 1、version 2、軽量バックアップ、完全バックアップの読み込みに対応する。Data URLがある画像だけIndexedDBへ復元し、ない場合は記録・設定だけ復元する。

### handleDeleteAllCustomTrainerImages()

4差分すべてと旧互換キーを削除し、public画像またはCSS仮表示へ戻す。

### install event

service workerのインストール時に、`index.html`、`style.css`、`app.js`、`manifest.json` をキャッシュする。
アイコンは存在しない場合でもインストールに失敗しないよう、任意キャッシュとして扱う。

### activate event

古いキャッシュ名のデータを削除し、現在のキャッシュだけを残す。

### fetch event

GETリクエストに対して、キャッシュに保存済みのレスポンスがあればそれを返す。
キャッシュにない場合は通常どおりネットワークから取得する。
