const storageKey = "trelog_records";
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
let selectedMusicUrl = "";
let timerState = "stopped";
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

function validateRecord(exercise, amount, recordType) {
  if (exercise === "") {
    return "記録する種目を1つ選んでね。";
  }

  if (amount === "" || Number(amount) <= 0) {
    const unit = getRecordUnit(recordType);
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
}

function formatElapsedTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getElapsedMinutes() {
  return Math.ceil((elapsedSeconds / 60) * 10) / 10;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatElapsedTime(elapsedSeconds);

  if (getRecordType() === "time") {
    recordAmountInput.value = elapsedSeconds > 0 ? getElapsedMinutes() : "";
  }
}

function startTimer() {
  timerState = "running";
  startWorkoutButton.textContent = "一時停止";
  trainerComment.textContent = "スタート！タイマーを見ながら、今の種目に集中しよう。";
  showMessage("タイマーを開始しました。", true);

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
  trainerComment.textContent = "一時停止中だよ。息を整えたら再開しよう。";
  showMessage("タイマーを一時停止しました。", true);

  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  timerState = "stopped";
  elapsedSeconds = 0;
  startWorkoutButton.textContent = "筋トレ開始";
  updateTimerDisplay();
}

function handleWorkoutButtonClick() {
  if (timerState === "running") {
    pauseTimer();
    return;
  }

  startTimer();
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
  const coefficient = getExerciseCoefficient(exercise, recordType);
  const multiplier = getEffortMultiplier(effort);

  if (remainingScore <= 0) {
    return 0;
  }

  if (coefficient <= 0 || multiplier <= 0) {
    return null;
  }

  return Math.ceil(remainingScore / coefficient / multiplier);
}

function updateGoalRecommendation() {
  const exercise = getSelectedExercise();
  const recordType = getRecordType();
  const effort = getSelectedEffort();
  const unit = getRecordUnit(recordType);
  const modeText = recordType === "reps" ? "回数" : "時間";
  const neededAmount = calculateNeededAmount(exercise || "自由種目", recordType, effort);

  if (calculateTodayScore() >= targetScore) {
    goalRecommendation.textContent = "今日の目標は達成済みです！";
    return;
  }

  if (exercise === "") {
    goalRecommendation.textContent = "種目を選ぶと、目標到達までの目安を表示します";
    return;
  }

  if (neededAmount === null) {
    goalRecommendation.textContent = `${exercise} / ${modeText}ではスコアが増えません`;
    return;
  }

  goalRecommendation.textContent = `あと${neededAmount}${unit}で今日の目標に到達します`;
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

function calculateStreakDays() {
  const recordedDates = new Set(records.map((record) => record.date));
  const today = getTodayDateString();
  const yesterday = addDays(today, -1);
  let cursor = "";

  if (recordedDates.has(today)) {
    cursor = today;
  } else if (recordedDates.has(yesterday)) {
    cursor = yesterday;
  } else {
    return 0;
  }

  let streak = 0;
  while (recordedDates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

function updateGoalCard() {
  const todayScore = calculateTodayScore();
  const achievementRate = Math.min(Math.round((todayScore / targetScore) * 100), 999);

  targetScoreText.textContent = `${targetScore}`;
  currentScoreText.textContent = `${todayScore}`;
  achievementRateText.textContent = `${achievementRate}%`;
  goalStatus.textContent = achievementRate >= 100 ? "達成" : "挑戦中";
  updateGoalRecommendation();
}

function updateDashboard() {
  const totalExp = calculateTotalExp();
  totalExpText.textContent = `${totalExp}`;
  levelDisplay.textContent = `${calculateLevel(totalExp)}`;
  streakDaysText.textContent = `${calculateStreakDays()}日`;
}

function updateAllStats() {
  updateGoalCard();
  updateDashboard();
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

function handleMusicFileChange() {
  const file = musicFileInput.files[0];
  musicFileName.textContent = file ? file.name : "未選択";

  if (selectedMusicUrl !== "") {
    URL.revokeObjectURL(selectedMusicUrl);
  }

  selectedMusicUrl = file ? URL.createObjectURL(file) : "";
  musicPlayer.src = selectedMusicUrl;
}

function playSelectedMusic() {
  if (selectedMusicUrl === "") {
    showMessage("先に音楽ファイルを選んでね。", false);
    return;
  }

  musicPlayer.play()
    .then(() => {
      showMessage("音楽を再生しました。", true);
    })
    .catch(() => {
      showMessage("音楽を再生できませんでした。別の音楽ファイルを試してね。", false);
    });
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
  const errorMessage = validateRecord(exercise, amount, recordType);

  if (errorMessage !== "") {
    showMessage(errorMessage, false);
    return;
  }

  const score = calculateScore(exercise, recordType, amount, effort);
  const record = createRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score);

  records.push(record);
  saveRecords();
  renderHistory();
  updateAllStats();
  resetTimer();
  disableSaveButtonTemporarily();
  trainerComment.textContent = "種目ログを記録できたよ。EXPと連続日数にも反映したよ。";
  showMessage("種目ログを保存しました。", true);
}

function initializeApp() {
  records = loadRecords();
  todayLabel.textContent = getTodayText();
  handleExerciseChange();
  updateRecordUnit();
  updateTimerDisplay();
  renderHistory();
  updateAllStats();
}

musicFileInput.addEventListener("change", handleMusicFileChange);
playMusicButton.addEventListener("click", playSelectedMusic);
startWorkoutButton.addEventListener("click", handleWorkoutButtonClick);
saveRecordButton.addEventListener("click", saveTodayRecord);
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
