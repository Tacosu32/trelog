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
const recordAmountInput = document.getElementById("record-amount");
const recordAmountLabel = document.getElementById("record-amount-label");
const recordUnit = document.getElementById("record-unit");

let selectedMusicUrl = "";
let historyCount = 0;

function getSelectedMenus() {
  const checkedMenus = document.querySelectorAll('input[name="menu"]:checked');
  return Array.from(checkedMenus).map((menu) => menu.value);
}

function getSelectedExercise() {
  return exerciseSelect.value;
}

function getRecordType() {
  const selectedType = document.querySelector('input[name="record-type"]:checked');
  return selectedType ? selectedType.value : "time";
}

function getRecordAmount() {
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
  recordAmountInput.placeholder = recordType === "count" ? "10" : "15";
  recordUnit.textContent = unit;
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

function startWorkout() {
  trainerComment.textContent = "スタート！無理しすぎず、最後まで一緒にやり切ろう。";
  showMessage("筋トレを開始しました。", true);
}

function addHistoryRecord(exercise, recordType, amount, effort) {
  historyCount += 1;
  emptyHistory.classList.add("hidden");

  const historyItem = document.createElement("li");
  const title = document.createElement("strong");
  const menuText = document.createElement("span");
  const detailText = document.createElement("span");

  historyItem.className = "history-item";
  title.textContent = `種目ログ ${historyCount}`;
  menuText.textContent = `種目: ${exercise}`;
  detailText.textContent = `記録: ${amount}${getRecordUnit(recordType)} / きつさ: ${effort}`;

  historyItem.appendChild(title);
  historyItem.appendChild(menuText);
  historyItem.appendChild(detailText);
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
  const errorMessage = validateRecord(exercise, amount, recordType);

  if (errorMessage !== "") {
    showMessage(errorMessage, false);
    return;
  }

  addHistoryRecord(exercise, recordType, amount, effort);
  disableSaveButtonTemporarily();
  trainerComment.textContent = "種目ログを記録できたよ。今日の1本、ちゃんと積み上がってるね。";
  showMessage("種目ログを履歴に追加しました。", true);
}

musicFileInput.addEventListener("change", handleMusicFileChange);
playMusicButton.addEventListener("click", playSelectedMusic);
startWorkoutButton.addEventListener("click", startWorkout);
saveRecordButton.addEventListener("click", saveTodayRecord);
document.querySelectorAll('input[name="record-type"]').forEach((recordTypeInput) => {
  recordTypeInput.addEventListener("change", updateRecordUnit);
});

updateRecordUnit();
