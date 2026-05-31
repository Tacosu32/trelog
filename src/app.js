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

let selectedMusicUrl = "";
let historyCount = 0;

function getSelectedMenus() {
  const checkedMenus = document.querySelectorAll('input[name="menu"]:checked');
  return Array.from(checkedMenus).map((menu) => menu.value);
}

function getWorkoutMinutes() {
  const minutesInput = document.getElementById("workout-minutes");
  return minutesInput.value.trim();
}

function getSelectedEffort() {
  const selectedEffort = document.querySelector('input[name="effort"]:checked');
  return selectedEffort ? selectedEffort.value : "";
}

function showMessage(message, isSuccess) {
  formMessage.textContent = message;
  formMessage.classList.toggle("success", isSuccess);
}

function validateRecord(menus, minutes) {
  if (menus.length === 0) {
    return "今日のメニューを1つ以上選んでね。";
  }

  if (minutes === "" || Number(minutes) <= 0) {
    return "運動時間を1分以上で入力してね。";
  }

  return "";
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

function addHistoryRecord(menus, minutes, effort) {
  historyCount += 1;
  emptyHistory.classList.add("hidden");

  const historyItem = document.createElement("li");
  const title = document.createElement("strong");
  const menuText = document.createElement("span");
  const detailText = document.createElement("span");

  historyItem.className = "history-item";
  title.textContent = `仮の記録 ${historyCount}`;
  menuText.textContent = `メニュー: ${menus.join("、")}`;
  detailText.textContent = `運動時間: ${minutes}分 / きつさ: ${effort}`;

  historyItem.appendChild(title);
  historyItem.appendChild(menuText);
  historyItem.appendChild(detailText);
  historyList.prepend(historyItem);
}

function saveTodayRecord() {
  const menus = getSelectedMenus();
  const minutes = getWorkoutMinutes();
  const effort = getSelectedEffort();
  const errorMessage = validateRecord(menus, minutes);

  if (errorMessage !== "") {
    showMessage(errorMessage, false);
    return;
  }

  addHistoryRecord(menus, minutes, effort);
  trainerComment.textContent = "記録できたよ。今日の積み重ね、ちゃんと残しておこうね。";
  showMessage("今日の記録を履歴に追加しました。", true);
}

musicFileInput.addEventListener("change", handleMusicFileChange);
playMusicButton.addEventListener("click", playSelectedMusic);
startWorkoutButton.addEventListener("click", startWorkout);
saveRecordButton.addEventListener("click", saveTodayRecord);
