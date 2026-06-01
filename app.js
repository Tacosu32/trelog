const DEBUG_MODE = true;
const storageKey = "trelog_records";
const stateStorageKey = "trelog_state";
const targetScore = 100;

const musicFileInput = document.getElementById("music-file");
const musicFileName = document.getElementById("music-file-name");
const musicPlayer = document.getElementById("music-player");
const playMusicButton = document.getElementById("play-music-button");
const startWorkoutButton = document.getElementById("start-workout-button");
const saveRecordButton = document.getElementById("save-record-button");
const trainerComment = document.getElementById("trainer-comment");
const formMessage = document.getElementById("form-message");
const historyList = document.getElementById("history-list");
const emptyHistory = document.getElementById("empty-history");
const exerciseSelect = document.getElementById("exercise-select");
const customExerciseArea = document.getElementById("custom-exercise-area");
const customExerciseName = document.getElementById("custom-exercise-name");
const recordAmountInput = document.getElementById("record-amount");
const recordAmountLabel = document.getElementById("record-amount-label");
const recordUnit = document.getElementById("record-unit");
const timerDisplay = document.getElementById("timer-display");
const targetScoreText = document.getElementById("target-score");
const currentScoreText = document.getElementById("current-score");
const achievementRateText = document.getElementById("achievement-rate");
const goalStatus = document.getElementById("goal-status");
const goalRecommendation = document.getElementById("goal-recommendation");
const todayLabel = document.getElementById("today-label");
const streakDaysText = document.getElementById("streak-days");
const levelDisplay = document.getElementById("level-display");
const totalExpText = document.getElementById("total-exp");
const restTicketsText = document.getElementById("rest-tickets");
const restDatesArea = document.getElementById("rest-dates");
const weeklyRankText = document.getElementById("weekly-rank");
const weeklyRankDetail = document.getElementById("weekly-rank-detail");
const levelProgressTitle = document.getElementById("level-progress-title");
const levelExpText = document.getElementById("level-exp-text");
const nextLevelExpText = document.getElementById("next-level-exp");
const levelProgressFill = document.getElementById("level-progress-fill");
const debugPanel = document.getElementById("debug-panel");
const debugStorageOutput = document.getElementById("debug-storage-output");
const sessionOverlay = document.getElementById("session-overlay");
const sessionStateLabel = document.getElementById("session-state-label");
const sessionTrainerComment = document.getElementById("session-trainer-comment");
const sessionTitle = document.getElementById("session-title");
const sessionRecordType = document.getElementById("session-record-type");
const sessionTimerDisplay = document.getElementById("session-timer-display");
const sessionCurrentScore = document.getElementById("session-current-score");
const sessionTargetScore = document.getElementById("session-target-score");
const sessionProjectedScore = document.getElementById("session-projected-score");
const sessionGoalRecommendation = document.getElementById("session-goal-recommendation");
const sessionRepsPanel = document.getElementById("session-reps-panel");
const sessionRepsInput = document.getElementById("session-reps-input");
const sessionRepsClearButton = document.getElementById("session-reps-clear-button");
const sessionMusicFileName = document.getElementById("session-music-file-name");
const sessionMusicToggleButton = document.getElementById("session-music-toggle-button");
const sessionPauseButton = document.getElementById("session-pause-button");
const sessionSaveButton = document.getElementById("session-save-button");
const sessionCancelButton = document.getElementById("session-cancel-button");
const resultOverlay = document.getElementById("result-overlay");
const resultScreen = document.getElementById("result-screen");
const resultTitle = document.getElementById("result-title");
const resultTrainerComment = document.getElementById("result-trainer-comment");
const resultExerciseName = document.getElementById("result-exercise-name");
const resultRecordValue = document.getElementById("result-record-value");
const resultEffort = document.getElementById("result-effort");
const resultScore = document.getElementById("result-score");
const resultExp = document.getElementById("result-exp");
const resultTodayScore = document.getElementById("result-today-score");
const resultTargetScore = document.getElementById("result-target-score");
const resultAchievementRate = document.getElementById("result-achievement-rate");
const resultGoalStatus = document.getElementById("result-goal-status");
const resultLevel = document.getElementById("result-level");
const resultNextLevelExp = document.getElementById("result-next-level-exp");
const resultBadgeList = document.getElementById("result-badge-list");
const resultBonusList = document.getElementById("result-bonus-list");
const resultOkButton = document.getElementById("result-ok-button");

const exerciseCoefficients = {
  "腕立て": { time: 10, reps: 2 },
  "腹筋": { time: 8, reps: 1.5 },
  "スクワット": { time: 8, reps: 1.5 },
  "プランク": { time: 12, reps: 0 },
  "ストレッチ": { time: 3, reps: 0 },
  "自由種目": { time: 5, reps: 1 }
};
const effortMultipliers = {
  1: 0.8,
  2: 0.9,
  3: 1,
  4: 1.1,
  5: 1.2
};

let records = [];
let appState = getDefaultState();
let selectedMusicUrl = "";
let timerState = "idle";
let elapsedSeconds = 0;
let timerId = null;

function getSelectedExercise() {
  if (exerciseSelect.value === "custom") {
    return customExerciseName.value.trim();
  }

  return exerciseSelect.value;
}

function getExerciseId() {
  if (exerciseSelect.value === "custom") {
    const name = customExerciseName.value.trim();
    return name === "" ? "" : `custom-${name}`;
  }

  return exerciseSelect.value;
}

function getTodayText() {
  return new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function getTodayDateString() {
  return formatDateString(new Date());
}

function formatDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateText, days) {
  const parts = dateText.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate() + days);
  return formatDateString(date);
}

function handleExerciseChange() {
  const isCustom = exerciseSelect.value === "custom";
  customExerciseArea.classList.toggle("hidden", !isCustom);

  if (!isCustom) {
    customExerciseName.value = "";
  }

  updateGoalRecommendation();
}

function getRecordType() {
  const selectedType = document.querySelector('input[name="record-type"]:checked');
  return selectedType ? selectedType.value : "time";
}

function getRecordAmount() {
  if (getRecordType() === "time" && elapsedSeconds > 0) {
    return String(getElapsedMinutes());
  }

  if (getRecordType() === "reps" && isSessionOpen()) {
    return sessionRepsInput.value.trim();
  }

  return recordAmountInput.value.trim();
}

function getSelectedEffort() {
  const selectedEffort = document.querySelector('input[name="effort"]:checked');
  return selectedEffort ? selectedEffort.value : "";
}

function showMessage(message, isSuccess) {
  formMessage.textContent = message;
  formMessage.classList.toggle("success", isSuccess);
}

function updateTrainerComment(message) {
  trainerComment.textContent = message;

  if (sessionTrainerComment) {
    sessionTrainerComment.textContent = message;
  }
}

function validateRecord(exercise, amount, recordType) {
  if (exercise === "") {
    updateTrainerComment("種目を選べば大丈夫。今日の一歩を一緒に記録しよう。");
    return "記録する種目を1つ選んでね。";
  }

  if (amount === "" || Number(amount) <= 0) {
    const unit = getRecordUnit(recordType);
    updateTrainerComment(`${unit}を入れたら保存できるよ。小さくても記録にしよう。`);
    return `${unit}を1以上で入力してね。`;
  }

  return "";
}

function getRecordUnit(recordType) {
  return recordType === "reps" ? "回" : "分";
}

function updateRecordUnit() {
  const recordType = getRecordType();
  const unit = getRecordUnit(recordType);

  recordAmountLabel.textContent = recordType === "reps" ? "回数" : "時間";
  recordAmountInput.placeholder = recordType === "reps" ? "10" : "タイマーから反映";
  recordAmountInput.readOnly = recordType === "time";
  recordUnit.textContent = unit;

  if (recordType === "time") {
    recordAmountInput.value = elapsedSeconds > 0 ? getElapsedMinutes() : "";
  }

  updateGoalRecommendation();
  updateSessionRecordControls();
}

function formatElapsedTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getElapsedMinutes() {
  return Math.round((elapsedSeconds / 60) * 10) / 10;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatElapsedTime(elapsedSeconds);
  sessionTimerDisplay.textContent = formatElapsedTime(elapsedSeconds);

  if (getRecordType() === "time") {
    recordAmountInput.value = elapsedSeconds > 0 ? getElapsedMinutes() : "";
  }

  updateSessionDisplay();
}

function startTimer() {
  timerState = "running";
  startWorkoutButton.textContent = "一時停止";
  sessionPauseButton.textContent = "一時停止";
  updateTrainerComment("スタート！タイマーを見ながら、今の種目に集中しよう。");
  showMessage("タイマーを開始しました。", true);
  updateSessionDisplay();

  if (timerId === null) {
    timerId = setInterval(() => {
      elapsedSeconds += 1;
      updateTimerDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  timerState = "paused";
  startWorkoutButton.textContent = "再開";
  sessionPauseButton.textContent = "再開";
  updateTrainerComment("一時停止中だよ。息を整えたら再開しよう。");
  showMessage("タイマーを一時停止しました。", true);
  updateSessionDisplay();

  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  timerState = "idle";
  elapsedSeconds = 0;
  startWorkoutButton.textContent = "筋トレ開始";
  sessionPauseButton.textContent = "一時停止";
  updateTimerDisplay();
}

function handleWorkoutButtonClick() {
  if (timerState === "idle") {
    startSession();
    return;
  }

  if (timerState === "running") {
    pauseTimer();
    return;
  }

  const wasPaused = timerState === "paused";
  startTimer();

  if (wasPaused) {
    updateTrainerComment("再開だね。少しずつリズムを戻していこう。");
  }
}

function openSessionOverlay() {
  sessionOverlay.classList.remove("hidden");
  updateSessionDisplay();
}

function closeSessionOverlay() {
  sessionOverlay.classList.add("hidden");
}

function isSessionOpen() {
  return !sessionOverlay.classList.contains("hidden");
}

function getRecordTypeText(recordType) {
  return recordType === "reps" ? "回数" : "時間";
}

function calculateSessionAmount(recordType) {
  if (recordType === "time") {
    return getElapsedMinutes();
  }

  return Number(sessionRepsInput.value || 0);
}

function calculateSessionProjectedScore(exercise, recordType, effort) {
  const amount = calculateSessionAmount(recordType);

  if (amount <= 0) {
    return 0;
  }

  return calculateScore(exercise || "自由種目", recordType, amount, effort);
}

function calculateRemainingAmountFromScore(remainingScore, exercise, recordType, effort) {
  const coefficient = getExerciseCoefficient(exercise || "自由種目", recordType);
  const multiplier = getEffortMultiplier(effort);

  if (remainingScore <= 0) {
    return 0;
  }

  if (coefficient <= 0 || multiplier <= 0) {
    return null;
  }

  return Math.ceil(remainingScore / coefficient / multiplier);
}

function getGoalRecommendationText(exercise, recordType, effort, projectedScore) {
  const unit = getRecordUnit(recordType);
  const modeText = getRecordTypeText(recordType);
  const savedTodayScore = calculateTodayScore();
  const expectedTodayScore = savedTodayScore + Number(projectedScore || 0);
  const remainingScore = Math.max(targetScore - expectedTodayScore, 0);
  const neededAmount = calculateRemainingAmountFromScore(remainingScore, exercise, recordType, effort);

  if (savedTodayScore >= targetScore) {
    return "今日の目標は達成済みです";
  }

  if (expectedTodayScore >= targetScore) {
    return "この種目を記録すると目標達成です！";
  }

  if (exercise === "") {
    return "種目を選ぶと目安を表示します";
  }

  if (neededAmount === null) {
    return `${exercise} / ${modeText}ではスコアが増えません`;
  }

  return `あと${neededAmount}${unit}`;
}

function updateSessionRecordControls() {
  const recordType = getRecordType();
  sessionRepsPanel.classList.toggle("hidden", recordType !== "reps");

  if (recordType === "reps" && sessionRepsInput.value === "" && recordAmountInput.value.trim() !== "") {
    sessionRepsInput.value = recordAmountInput.value.trim();
  }
}

function updateSessionDisplay() {
  if (!sessionOverlay) {
    return;
  }

  const exercise = getSelectedExercise();
  const recordType = getRecordType();
  const effort = getSelectedEffort();
  const stateText = timerState === "paused" ? "一時停止中" : timerState === "running" ? "筋トレ中" : "開始前";

  updateSessionRecordControls();
  const projectedScore = calculateSessionProjectedScore(exercise, recordType, effort);
  const expectedScore = calculateTodayScore() + projectedScore;

  sessionStateLabel.textContent = stateText;
  sessionTitle.textContent = exercise || "未選択";
  sessionRecordType.textContent = `${getRecordTypeText(recordType)}で記録`;
  sessionTimerDisplay.textContent = formatElapsedTime(elapsedSeconds);
  sessionCurrentScore.textContent = `${expectedScore}`;
  sessionTargetScore.textContent = `${targetScore}`;
  sessionProjectedScore.textContent = `見込み +${projectedScore}pt`;
  sessionGoalRecommendation.textContent = getGoalRecommendationText(exercise, recordType, effort, projectedScore);
  sessionMusicFileName.textContent = getSelectedMusicFileName();
  sessionMusicToggleButton.textContent = musicPlayer.paused ? "再生" : "停止";
}

function startSession() {
  const exercise = getSelectedExercise();

  if (exercise === "") {
    updateTrainerComment("先に種目を選ぼう。決めたらすぐ一緒に始められるよ。");
    showMessage("記録する種目を1つ選んでね。", false);
    return;
  }

  openSessionOverlay();
  startTimer();
}

function handleSessionPauseButtonClick() {
  if (timerState === "running") {
    pauseTimer();
    return;
  }

  startTimer();
  updateTrainerComment("再開だね。少しずつリズムを戻していこう。");
}

function handleSessionSaveButtonClick() {
  const result = saveTodayRecord();

  if (result) {
    closeSessionOverlay();
    showResultOverlay(result);
  }
}

function cancelSession() {
  resetTimer();
  closeSessionOverlay();
  updateTrainerComment("セッションをキャンセルしたよ。準備が整ったらまた始めよう。");
  showMessage("保存せずにセッションを終了しました。", true);
}

function getExerciseCoefficient(exercise, recordType) {
  const coefficients = exerciseCoefficients[exercise] || exerciseCoefficients["自由種目"];
  return coefficients[recordType];
}

function getEffortMultiplier(effort) {
  return effortMultipliers[effort] || 1;
}

function calculateScore(exercise, recordType, amount, effort) {
  const coefficient = getExerciseCoefficient(exercise, recordType);
  const multiplier = getEffortMultiplier(effort);
  return Math.round(Number(amount) * coefficient * multiplier);
}

function calculateNeededAmount(exercise, recordType, effort) {
  const remainingScore = Math.max(targetScore - calculateTodayScore(), 0);
  return calculateRemainingAmountFromScore(remainingScore, exercise, recordType, effort);
}

function markGoalRewardIfNeeded() {
  const today = getTodayDateString();

  if (calculateTodayScore() < targetScore) {
    return false;
  }

  if (appState.claimedGoalRewardDates.includes(today)) {
    return false;
  }

  appState.claimedGoalRewardDates.push(today);
  saveState();
  updateTrainerComment("今日の目標達成！休憩チケットは増えないけど、達成記録はしっかり残したよ。すごい！");
  return true;
}

function updateGoalRecommendation() {
  const exercise = getSelectedExercise();
  const recordType = getRecordType();
  const effort = getSelectedEffort();
  const modeText = getRecordTypeText(recordType);
  const neededAmount = calculateNeededAmount(exercise || "自由種目", recordType, effort);

  if (calculateTodayScore() >= targetScore) {
    goalRecommendation.textContent = "今日の目標は達成済みです！";
    updateSessionDisplay();
    return;
  }

  if (exercise === "") {
    goalRecommendation.textContent = "種目を選ぶと、目標到達までの目安を表示します";
    updateSessionDisplay();
    return;
  }

  if (neededAmount === null) {
    goalRecommendation.textContent = `${exercise} / ${modeText}ではスコアが増えません`;
    updateSessionDisplay();
    return;
  }

  goalRecommendation.textContent = `${getGoalRecommendationText(exercise, recordType, effort, 0)}で今日の目標に到達します`;
  updateSessionDisplay();
}

function calculateTodayScore() {
  const today = getTodayDateString();
  return records
    .filter((record) => record.date === today)
    .reduce((total, record) => total + Number(record.score || 0), 0);
}

function calculateTotalExp() {
  return records.reduce((total, record) => total + Number(record.exp || 0), 0);
}

function calculateLevel(totalExp) {
  return Math.floor(totalExp / 100) + 1;
}

function calculateLevelProgress(totalExp) {
  const currentLevel = calculateLevel(totalExp);
  const currentLevelStartExp = (currentLevel - 1) * 100;
  const nextLevelExp = currentLevel * 100;
  const progressExp = totalExp - currentLevelStartExp;
  const requiredExp = nextLevelExp - totalExp;
  const progressRate = progressExp / 100;

  return {
    currentLevel,
    currentLevelStartExp,
    nextLevelExp,
    progressExp,
    requiredExp,
    progressRate
  };
}

function claimLevelRewardsIfNeeded() {
  const currentLevel = calculateLevel(calculateTotalExp());
  const rewardedLevels = [];

  for (let level = 5; level <= currentLevel; level += 5) {
    if (!appState.claimedLevelRewards.includes(level)) {
      appState.restTickets += 1;
      appState.claimedLevelRewards.push(level);
      rewardedLevels.push(level);
    }
  }

  if (rewardedLevels.length > 0) {
    appState.claimedLevelRewards.sort((a, b) => a - b);
    saveState();
    updateTrainerComment(`Lv.${rewardedLevels.join("、Lv.")}到達！休憩チケットを${rewardedLevels.length}枚プレゼントしたよ。`);
  }

  return rewardedLevels;
}

function getRecordedDateSet() {
  return new Set(records.map((record) => record.date));
}

function getRestDateSet() {
  return new Set(appState.restDates);
}

function getContinuityDateSet() {
  return new Set([...getRecordedDateSet(), ...getRestDateSet()]);
}

function hasContinuityBefore(dateText, continuityDates) {
  return Array.from(continuityDates).some((date) => date < dateText);
}

function consumeRestTicketsForMissedDays() {
  const continuityDates = getContinuityDateSet();
  let cursor = records.some((record) => record.date === getTodayDateString())
    ? getTodayDateString()
    : addDays(getTodayDateString(), -1);
  let usedCount = 0;

  while (hasContinuityBefore(cursor, continuityDates)) {
    if (continuityDates.has(cursor)) {
      cursor = addDays(cursor, -1);
      continue;
    }

    if (appState.restTickets <= 0) {
      break;
    }

    appState.restDates.push(cursor);
    appState.restTickets -= 1;
    continuityDates.add(cursor);
    usedCount += 1;
    cursor = addDays(cursor, -1);
  }

  if (usedCount > 0) {
    appState.restDates = Array.from(new Set(appState.restDates)).sort();
    saveState();
    updateTrainerComment(`未記録日を${usedCount}日分、休憩チケットで守ったよ。続いてる流れ、大事にしよう。`);
  }

  return usedCount;
}

function calculateStreakDays() {
  const continuityDates = getContinuityDateSet();
  const today = getTodayDateString();
  const yesterday = addDays(today, -1);
  let cursor = "";

  if (continuityDates.has(today)) {
    cursor = today;
  } else if (continuityDates.has(yesterday)) {
    cursor = yesterday;
  } else {
    return 0;
  }

  let streak = 0;
  while (continuityDates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

function getWeekStartDate(date) {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  weekStart.setDate(weekStart.getDate() + diff);
  return formatDateString(weekStart);
}

function calculateWeeklyStats() {
  const weekStart = getWeekStartDate(new Date());
  const weekEnd = addDays(weekStart, 6);
  const weeklyRecords = records.filter((record) => record.date >= weekStart && record.date <= weekEnd);
  const recordedDays = new Set(weeklyRecords.map((record) => record.date)).size;
  const weeklyScore = weeklyRecords.reduce((total, record) => total + Number(record.score || 0), 0);

  return {
    recordedDays,
    weeklyScore
  };
}

function calculateWeeklyRank(recordedDays, weeklyScore) {
  if (recordedDays >= 5 || weeklyScore >= 500) {
    return "S";
  }

  if (recordedDays >= 4 || weeklyScore >= 350) {
    return "A";
  }

  if (recordedDays >= 3 || weeklyScore >= 200) {
    return "B";
  }

  if (recordedDays >= 1) {
    return "C";
  }

  return "D";
}

function updateGoalCard() {
  const todayScore = calculateTodayScore();
  const achievementRate = Math.min(Math.round((todayScore / targetScore) * 100), 999);
  const goalClaimed = appState.claimedGoalRewardDates.includes(getTodayDateString());

  targetScoreText.textContent = `${targetScore}`;
  currentScoreText.textContent = `${todayScore}`;
  achievementRateText.textContent = `${achievementRate}%`;
  goalStatus.textContent = achievementRate >= 100
    ? goalClaimed ? "達成済み" : "達成"
    : "挑戦中";
  updateGoalRecommendation();
}

function updateLevelProgress(totalExp) {
  const progress = calculateLevelProgress(totalExp);

  levelProgressTitle.textContent = `Lv.${progress.currentLevel}`;
  levelExpText.textContent = `${totalExp} / ${progress.nextLevelExp} EXP`;
  nextLevelExpText.textContent = `次のレベルまで ${progress.requiredExp} EXP`;
  levelProgressFill.style.width = `${Math.min(progress.progressRate * 100, 100)}%`;
}

function updateDashboard() {
  const totalExp = calculateTotalExp();
  const weeklyStats = calculateWeeklyStats();

  totalExpText.textContent = `${totalExp}`;
  levelDisplay.textContent = `${calculateLevel(totalExp)}`;
  streakDaysText.textContent = `${calculateStreakDays()}日`;
  restTicketsText.textContent = `${appState.restTickets}枚`;
  weeklyRankText.textContent = calculateWeeklyRank(weeklyStats.recordedDays, weeklyStats.weeklyScore);
  weeklyRankDetail.textContent = `${weeklyStats.recordedDays}日 / ${weeklyStats.weeklyScore}pt`;
  updateLevelProgress(totalExp);
}

function updateAllStats() {
  updateGoalCard();
  updateDashboard();
  renderRestDates();
  updateDebugStorageOutput();
  updateSessionDisplay();
}

function renderRestDates() {
  restDatesArea.innerHTML = "";

  if (appState.restDates.length === 0) {
    return;
  }

  appState.restDates
    .slice()
    .sort()
    .forEach((date) => {
      const restDate = document.createElement("span");
      restDate.textContent = `休憩日：${date}`;
      restDatesArea.appendChild(restDate);
    });
}

function loadRecords() {
  const savedRecords = localStorage.getItem(storageKey);

  if (!savedRecords) {
    return [];
  }

  try {
    const parsedRecords = JSON.parse(savedRecords);
    return Array.isArray(parsedRecords) ? parsedRecords : [];
  } catch (error) {
    return [];
  }
}

function saveRecords() {
  localStorage.setItem(storageKey, JSON.stringify(records));
}

function getDefaultState() {
  return {
    restTickets: 2,
    restDates: [],
    claimedGoalRewardDates: [],
    claimedLevelRewards: []
  };
}

function normalizeState(parsedState) {
  const defaultState = getDefaultState();
  return {
    restTickets: Number(parsedState.restTickets ?? parsedState.freezeTickets ?? defaultState.restTickets),
    restDates: Array.isArray(parsedState.restDates)
      ? parsedState.restDates
      : Array.isArray(parsedState.frozenDates)
        ? parsedState.frozenDates
        : defaultState.restDates,
    claimedGoalRewardDates: Array.isArray(parsedState.claimedGoalRewardDates)
      ? parsedState.claimedGoalRewardDates
      : defaultState.claimedGoalRewardDates,
    claimedLevelRewards: Array.isArray(parsedState.claimedLevelRewards)
      ? parsedState.claimedLevelRewards
      : defaultState.claimedLevelRewards
  };
}

function loadState() {
  const savedState = localStorage.getItem(stateStorageKey);

  if (!savedState) {
    return getDefaultState();
  }

  try {
    return normalizeState(JSON.parse(savedState));
  } catch (error) {
    return getDefaultState();
  }
}

function saveState() {
  localStorage.setItem(stateStorageKey, JSON.stringify(appState));
}

function createRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score) {
  const now = new Date();
  return {
    id: `record-${now.getTime()}`,
    date: getTodayDateString(),
    exerciseId: getExerciseId() || exercise,
    exerciseName: exercise,
    mode: recordType,
    value: Number(amount),
    unit: getRecordUnit(recordType),
    intensity: Number(effort),
    elapsedSeconds: savedElapsedSeconds,
    score,
    exp: score,
    musicFileName: musicFileInput.files[0] ? musicFileInput.files[0].name : "",
    createdAt: now.toISOString()
  };
}

function createTestRecord(dateText) {
  const createdAt = new Date(`${dateText}T12:00:00`);
  return {
    id: `test-${dateText}-${Date.now()}`,
    date: dateText,
    exerciseId: "debug-test",
    exerciseName: "テスト記録",
    mode: "reps",
    value: 10,
    unit: "回",
    intensity: 3,
    elapsedSeconds: 0,
    score: 20,
    exp: 20,
    musicFileName: "",
    createdAt: createdAt.toISOString()
  };
}

function handleMusicFileChange() {
  const file = musicFileInput.files[0];
  musicFileName.textContent = file ? file.name : "未選択";
  sessionMusicFileName.textContent = file ? file.name : "未選択";

  if (selectedMusicUrl !== "") {
    URL.revokeObjectURL(selectedMusicUrl);
  }

  selectedMusicUrl = file ? URL.createObjectURL(file) : "";
  musicPlayer.src = selectedMusicUrl;
  updateSessionDisplay();
}

function getSelectedMusicFileName() {
  return musicFileInput.files[0] ? musicFileInput.files[0].name : "未選択";
}

function playSelectedMusic() {
  if (selectedMusicUrl === "") {
    showMessage("先に音楽ファイルを選んでね。", false);
    updateTrainerComment("音楽を使うなら、先にファイルを選んでね。なしでもセッションはできるよ。");
    return;
  }

  musicPlayer.play()
    .then(() => {
      showMessage("音楽を再生しました。", true);
      updateSessionDisplay();
    })
    .catch(() => {
      showMessage("音楽を再生できませんでした。別の音楽ファイルを試してね。", false);
    });
}

function stopSelectedMusic() {
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
  showMessage("音楽を停止しました。", true);
  updateSessionDisplay();
}

function getResultTrainerComment(result) {
  if (result.levelRewards.length > 0) {
    return "休憩チケット獲得！がんばった分、休める日もちゃんと守れるよ。";
  }

  if (result.goalAchieved) {
    return result.goalMarked
      ? "今日の目標達成！かなりいい感じだよ！"
      : "今日の目標はもう達成済みだよ。さらに積めたの、すごくいいね。";
  }

  if (result.leveledUp) {
    return "レベルアップ！積み重ねが形になってきたね。";
  }

  if (result.record.intensity <= 2) {
    return "軽めでも続けたのがえらいよ。今日の流れ、ちゃんと守れたね。";
  }

  if (result.record.intensity >= 4) {
    return "かなり追い込めたね。休憩も忘れずに！";
  }

  return "記録できたよ。今日の積み上げ、ちゃんと残ったね。";
}

function getResultTitle(result) {
  if (result.goalAchieved) {
    return "今日の目標達成！";
  }

  if (result.leveledUp) {
    return "レベルアップ！";
  }

  return "ナイス記録！";
}

function getResultAnimationClass(result) {
  if (result.goalAchieved) {
    return "goal-complete";
  }

  if (result.leveledUp) {
    return "level-up";
  }

  return "sparkle";
}

function createResultSummary(record, beforeLevel, levelRewards, goalMarked) {
  const afterTotalExp = calculateTotalExp();
  const afterLevel = calculateLevel(afterTotalExp);
  const levelProgress = calculateLevelProgress(afterTotalExp);
  const todayScore = calculateTodayScore();
  const goalAchieved = todayScore >= targetScore;
  const achievementRate = Math.min(Math.round((todayScore / targetScore) * 100), 999);

  return {
    record,
    beforeLevel,
    afterLevel,
    leveledUp: afterLevel > beforeLevel,
    levelRewards,
    goalMarked,
    goalAchieved,
    todayScore,
    achievementRate,
    totalExp: afterTotalExp,
    nextLevelRequiredExp: levelProgress.requiredExp
  };
}

function renderResultBadges(result) {
  const badges = [];

  if (result.goalAchieved) {
    badges.push("今日の目標達成");
  }

  if (result.leveledUp) {
    badges.push("Lv.UP");
  }

  if (result.levelRewards.length > 0) {
    badges.push("休憩チケット獲得");
  }

  resultBadgeList.innerHTML = "";
  badges.forEach((badge) => {
    const badgeItem = document.createElement("span");
    badgeItem.textContent = badge;
    resultBadgeList.appendChild(badgeItem);
  });
}

function showResultOverlay(result) {
  const record = result.record;
  const bonusMessages = [];
  const animationClass = getResultAnimationClass(result);

  resultScreen.classList.remove("goal-complete", "level-up", "sparkle");
  resultScreen.classList.add(animationClass);
  resultTitle.textContent = getResultTitle(result);
  resultTrainerComment.textContent = getResultTrainerComment(result);
  resultExerciseName.textContent = record.exerciseName;
  resultRecordValue.textContent = `${record.value}${record.unit}`;
  resultEffort.textContent = `${record.intensity}`;
  resultScore.textContent = `${record.score}`;
  resultExp.textContent = `${record.exp}`;
  resultTodayScore.textContent = `${result.todayScore}`;
  resultTargetScore.textContent = `${targetScore}`;
  resultAchievementRate.textContent = `達成率 ${result.achievementRate}%`;
  resultGoalStatus.textContent = result.goalAchieved
    ? result.goalMarked ? "今日の目標達成！" : "達成済み"
    : "挑戦中";
  resultLevel.textContent = `Lv.${result.afterLevel}`;
  resultNextLevelExp.textContent = `次のレベルまで ${result.nextLevelRequiredExp} EXP`;
  renderResultBadges(result);

  if (result.leveledUp) {
    bonusMessages.push(`Lv.${result.afterLevel} にアップ！`);
  }

  if (result.levelRewards.length > 0) {
    bonusMessages.push(`休憩チケットを${result.levelRewards.length}枚獲得！`);
  }

  resultBonusList.innerHTML = "";
  bonusMessages.forEach((message) => {
    const bonusItem = document.createElement("p");
    bonusItem.textContent = message;
    resultBonusList.appendChild(bonusItem);
  });

  resultOverlay.classList.remove("hidden");
}

function closeResultOverlay() {
  resultOverlay.classList.add("hidden");
  resultScreen.classList.remove("goal-complete", "level-up", "sparkle");
}

function toggleSessionMusic() {
  if (!musicPlayer.paused) {
    stopSelectedMusic();
    return;
  }

  playSelectedMusic();
}

function adjustSessionReps(amount) {
  const currentReps = Number(sessionRepsInput.value || 0);
  sessionRepsInput.value = Math.max(currentReps + amount, 0);
  recordAmountInput.value = sessionRepsInput.value;
  updateSessionDisplay();
  updateGoalRecommendation();
}

function clearSessionReps() {
  sessionRepsInput.value = "";
  recordAmountInput.value = "";
  updateSessionDisplay();
  updateGoalRecommendation();
}

function addHistoryRecord(record, index) {
  emptyHistory.classList.add("hidden");

  const historyItem = document.createElement("li");
  const title = document.createElement("strong");
  const dateText = document.createElement("span");
  const exerciseText = document.createElement("span");
  const detailText = document.createElement("span");
  const scoreText = document.createElement("span");

  historyItem.className = "history-item";
  title.textContent = `種目ログ ${index + 1}`;
  dateText.textContent = `日付: ${record.date}`;
  exerciseText.textContent = `種目: ${record.exerciseName}`;
  detailText.textContent = `記録: ${record.value}${record.unit} / きつさ: ${record.intensity}`;
  scoreText.textContent = `スコア: ${record.score} / EXP: ${record.exp}`;

  if (record.mode === "reps") {
    detailText.textContent += ` / 経過時間: ${formatElapsedTime(record.elapsedSeconds)}`;
  }

  if (record.musicFileName) {
    scoreText.textContent += ` / 音楽: ${record.musicFileName}`;
  }

  historyItem.appendChild(title);
  historyItem.appendChild(dateText);
  historyItem.appendChild(exerciseText);
  historyItem.appendChild(detailText);
  historyItem.appendChild(scoreText);
  historyList.prepend(historyItem);
}

function renderHistory() {
  historyList.innerHTML = "";
  emptyHistory.classList.toggle("hidden", records.length > 0);

  records
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .forEach((record, index) => {
      addHistoryRecord(record, index);
    });
}

function disableSaveButtonTemporarily() {
  saveRecordButton.disabled = true;
  saveRecordButton.textContent = "保存しました";

  setTimeout(() => {
    saveRecordButton.disabled = false;
    saveRecordButton.textContent = "種目ログを保存";
  }, 2000);
}

function saveTodayRecord() {
  const exercise = getSelectedExercise();
  const recordType = getRecordType();
  const amount = getRecordAmount();
  const effort = getSelectedEffort();
  const savedElapsedSeconds = elapsedSeconds;
  const beforeLevel = calculateLevel(calculateTotalExp());
  const errorMessage = validateRecord(exercise, amount, recordType);

  if (errorMessage !== "") {
    if (recordType === "reps") {
      updateTrainerComment("回数を入力してね。1回でも、ちゃんと記録に残せるよ。");
    }

    showMessage(errorMessage, false);
    return false;
  }

  const score = calculateScore(exercise, recordType, amount, effort);
  const record = createRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score);

  records.push(record);
  saveRecords();
  const goalMarked = markGoalRewardIfNeeded();
  const levelRewards = claimLevelRewardsIfNeeded();
  const result = createResultSummary(record, beforeLevel, levelRewards, goalMarked);
  renderHistory();
  updateAllStats();
  resetTimer();
  disableSaveButtonTemporarily();

  if (!goalMarked && levelRewards.length === 0) {
    updateTrainerComment("種目ログを記録できたよ。EXPと連続日数にも反映したよ。");
  }

  showMessage("種目ログを保存しました。", true);
  return result;
}

function refreshAfterDebugAction(message) {
  saveRecords();
  saveState();
  renderHistory();
  updateAllStats();
  showMessage(message, true);
}

function clearRecords() {
  records = [];
  localStorage.removeItem(storageKey);
  renderHistory();
  updateAllStats();
  showMessage("記録データを削除しました。", true);
}

function clearState() {
  appState = getDefaultState();
  localStorage.removeItem(stateStorageKey);
  saveState();
  updateAllStats();
  showMessage("状態データを削除しました。", true);
}

function clearAllData() {
  records = [];
  appState = getDefaultState();
  localStorage.removeItem(storageKey);
  localStorage.removeItem(stateStorageKey);
  saveState();
  renderHistory();
  updateAllStats();
  showMessage("全データを削除しました。", true);
}

function addRestTicket() {
  appState.restTickets += 1;
  refreshAfterDebugAction("休憩チケットを1枚追加しました。");
}

function zeroRestTickets() {
  appState.restTickets = 0;
  refreshAfterDebugAction("休憩チケットを0枚にしました。");
}

function addTestRecord(dateText) {
  if (!dateText) {
    showMessage("テスト記録の日付を選んでください。", false);
    return;
  }

  records.push(createTestRecord(dateText));
  claimLevelRewardsIfNeeded();
  refreshAfterDebugAction(`${dateText} のテスト記録を追加しました。`);
}

function updateDebugStorageOutput() {
  if (!DEBUG_MODE || !debugStorageOutput) {
    return;
  }

  debugStorageOutput.textContent = JSON.stringify({
    trelog_records: JSON.parse(localStorage.getItem(storageKey) || "[]"),
    trelog_state: JSON.parse(localStorage.getItem(stateStorageKey) || "null")
  }, null, 2);
}

function setupDebugPanel() {
  if (!DEBUG_MODE) {
    debugPanel.classList.add("hidden");
    return;
  }

  document.getElementById("debug-clear-records").addEventListener("click", clearRecords);
  document.getElementById("debug-clear-state").addEventListener("click", clearState);
  document.getElementById("debug-clear-all").addEventListener("click", clearAllData);
  document.getElementById("debug-add-rest-ticket").addEventListener("click", addRestTicket);
  document.getElementById("debug-zero-rest-ticket").addEventListener("click", zeroRestTickets);
  document.getElementById("debug-add-date-record").addEventListener("click", () => {
    addTestRecord(document.getElementById("debug-test-date").value);
  });
  document.getElementById("debug-add-yesterday-record").addEventListener("click", () => {
    addTestRecord(addDays(getTodayDateString(), -1));
  });
  document.getElementById("debug-add-three-days-record").addEventListener("click", () => {
    addTestRecord(addDays(getTodayDateString(), -3));
  });
  document.getElementById("debug-refresh-storage").addEventListener("click", updateDebugStorageOutput);
}

function initializeApp() {
  records = loadRecords();
  appState = loadState();
  saveState();
  todayLabel.textContent = getTodayText();
  setupDebugPanel();
  handleExerciseChange();
  updateRecordUnit();
  updateTimerDisplay();
  consumeRestTicketsForMissedDays();
  markGoalRewardIfNeeded();
  claimLevelRewardsIfNeeded();
  renderHistory();
  updateAllStats();
}

musicFileInput.addEventListener("change", handleMusicFileChange);
musicPlayer.addEventListener("play", updateSessionDisplay);
musicPlayer.addEventListener("pause", updateSessionDisplay);
playMusicButton.addEventListener("click", playSelectedMusic);
startWorkoutButton.addEventListener("click", handleWorkoutButtonClick);
saveRecordButton.addEventListener("click", () => {
  const result = saveTodayRecord();

  if (result) {
    showResultOverlay(result);
  }
});
sessionPauseButton.addEventListener("click", handleSessionPauseButtonClick);
sessionSaveButton.addEventListener("click", handleSessionSaveButtonClick);
sessionCancelButton.addEventListener("click", cancelSession);
resultOkButton.addEventListener("click", closeResultOverlay);
sessionMusicToggleButton.addEventListener("click", toggleSessionMusic);
sessionRepsInput.addEventListener("input", () => {
  recordAmountInput.value = sessionRepsInput.value;
  updateSessionDisplay();
  updateGoalRecommendation();
});
sessionRepsClearButton.addEventListener("click", clearSessionReps);
document.querySelectorAll(".session-reps-add-button").forEach((button) => {
  button.addEventListener("click", () => {
    adjustSessionReps(Number(button.dataset.repsAdd));
  });
});
exerciseSelect.addEventListener("change", handleExerciseChange);
customExerciseName.addEventListener("input", updateGoalRecommendation);
recordAmountInput.addEventListener("input", updateGoalRecommendation);
document.querySelectorAll('input[name="record-type"]').forEach((recordTypeInput) => {
  recordTypeInput.addEventListener("change", updateRecordUnit);
});
document.querySelectorAll('input[name="effort"]').forEach((effortInput) => {
  effortInput.addEventListener("change", updateGoalRecommendation);
});

initializeApp();
