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

const targetScore = 100;
const exerciseCoefficients = {
  "腕立て": { time: 10, count: 2 },
  "腹筋": { time: 8, count: 1.5 },
  "スクワット": { time: 8, count: 1.5 },
  "プランク": { time: 12, count: 0 },
  "ストレッチ": { time: 3, count: 0 },
  "自由種目": { time: 5, count: 1 }
};
const effortMultipliers = {
  1: 0.8,
  2: 0.9,
  3: 1,
  4: 1.1,
  5: 1.2
};

let selectedMusicUrl = "";
let historyCount = 0;
let currentScore = 0;
let timerState = "stopped";
let elapsedSeconds = 0;
let timerId = null;

function getSelectedExercise() {
  if (exerciseSelect.value === "custom") {
    return customExerciseName.value.trim();
  }

  return exerciseSelect.value;
}

function getTodayText() {
  const today = new Date();
  return today.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function handleExerciseChange() {
  const isCustom = exerciseSelect.value === "custom";
  customExerciseArea.classList.toggle("hidden", !isCustom);

  if (!isCustom) {
    customExerciseName.value = "";
  }
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
  return recordType === "count" ? "回" : "分";
}

function updateRecordUnit() {
  const recordType = getRecordType();
  const unit = getRecordUnit(recordType);

  recordAmountLabel.textContent = recordType === "count" ? "回数" : "時間";
  recordAmountInput.placeholder = recordType === "count" ? "10" : "タイマーから反映";
  recordAmountInput.readOnly = recordType === "time";
  recordUnit.textContent = unit;

  if (recordType === "time") {
    recordAmountInput.value = elapsedSeconds > 0 ? getElapsedMinutes() : "";
  }
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

function updateGoalCard() {
  const achievementRate = Math.min(Math.round((currentScore / targetScore) * 100), 999);

  targetScoreText.textContent = targetScore;
  currentScoreText.textContent = currentScore;
  achievementRateText.textContent = `${achievementRate}%`;
  goalStatus.textContent = achievementRate >= 100 ? "達成" : "挑戦中";
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

function addHistoryRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score) {
  historyCount += 1;
  emptyHistory.classList.add("hidden");

  const historyItem = document.createElement("li");
  const title = document.createElement("strong");
  const dateText = document.createElement("span");
  const exerciseText = document.createElement("span");
  const detailText = document.createElement("span");
  const scoreText = document.createElement("span");

  historyItem.className = "history-item";
  title.textContent = `種目ログ ${historyCount}`;
  dateText.textContent = `日付: ${getTodayText()}`;
  exerciseText.textContent = `種目: ${exercise}`;
  detailText.textContent = `記録: ${amount}${getRecordUnit(recordType)} / きつさ: ${effort}`;
  scoreText.textContent = `簡易スコア: ${score}`;

  if (recordType === "count") {
    detailText.textContent += ` / 経過時間: ${formatElapsedTime(savedElapsedSeconds)}`;
  }

  historyItem.appendChild(title);
  historyItem.appendChild(dateText);
  historyItem.appendChild(exerciseText);
  historyItem.appendChild(detailText);
  historyItem.appendChild(scoreText);
  historyList.prepend(historyItem);
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
  currentScore += score;

  addHistoryRecord(exercise, recordType, amount, effort, savedElapsedSeconds, score);
  updateGoalCard();
  resetTimer();
  disableSaveButtonTemporarily();
  trainerComment.textContent = "種目ログを記録できたよ。今日の目標にも近づいたね。";
  showMessage("種目ログを履歴に追加しました。", true);
}

musicFileInput.addEventListener("change", handleMusicFileChange);
playMusicButton.addEventListener("click", playSelectedMusic);
startWorkoutButton.addEventListener("click", handleWorkoutButtonClick);
saveRecordButton.addEventListener("click", saveTodayRecord);
exerciseSelect.addEventListener("change", handleExerciseChange);
document.querySelectorAll('input[name="record-type"]').forEach((recordTypeInput) => {
  recordTypeInput.addEventListener("change", updateRecordUnit);
});

handleExerciseChange();
updateRecordUnit();
updateGoalCard();
updateTimerDisplay();
