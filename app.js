const DEBUG_MODE = true;
const APP_VERSION = "0.4.1-dev";
const APP_BUILD_LABEL = "mobile-safe-area-2026-06-02";
const storageKey = "trelog_records";
const stateStorageKey = "trelog_state";
const devScoringConfigStorageKey = "trelog_dev_scoring_config";
const userAssetsDbName = "trelog_user_assets";
const trainerImagesStoreName = "trainer_images";
const legacyCustomTrainerImageKey = "customTrainerImage";
const customTrainerSlots = {
  custom_default: { label: "通常画像", context: "default" },
  custom_cheer: { label: "応援画像", context: "cheer" },
  custom_result: { label: "祝福画像", context: "result" },
  custom_rest: { label: "休憩画像", context: "rest" }
};
const maxCustomTrainerImageSize = 5 * 1024 * 1024;
const allowedTrainerImageTypes = ["image/png", "image/jpeg", "image/webp"];

const musicFileInput = document.getElementById("music-file");
const musicFileName = document.getElementById("music-file-name");
const musicPlayer = document.getElementById("music-player");
const playMusicButton = document.getElementById("play-music-button");
const musicLoopToggle = document.getElementById("music-loop-toggle");
const homeStartRecordButton = document.getElementById("home-start-record-button");
const homeTrainerImage = document.getElementById("home-trainer-image");
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
const recordModeHint = document.getElementById("record-mode-hint");
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
const evaluationProfileSelect = document.getElementById("evaluation-profile-select");
const evaluationProfileDescription = document.getElementById("evaluation-profile-description");
const devScoringStatus = document.getElementById("dev-scoring-status");
const scoreConfigFields = document.getElementById("score-config-fields");
const scorePreviewExercise = document.getElementById("score-preview-exercise");
const scorePreviewMode = document.getElementById("score-preview-mode");
const scorePreviewAmount = document.getElementById("score-preview-amount");
const scorePreviewIntensity = document.getElementById("score-preview-intensity");
const scorePreviewProfile = document.getElementById("score-preview-profile");
const scorePreviewResult = document.getElementById("score-preview-result");
const scoreConfigJson = document.getElementById("score-config-json");
const copyScoreConfigButton = document.getElementById("copy-score-config-button");
const resetScoreConfigButton = document.getElementById("reset-score-config-button");
const customTrainerStatus = document.getElementById("custom-trainer-status");
const customTrainerSlotElements = document.querySelectorAll("[data-trainer-slot]");
const deleteAllCustomTrainersButton = document.getElementById("delete-all-custom-trainers-button");
const exportLightBackupButton = document.getElementById("export-light-backup-button");
const exportFullBackupButton = document.getElementById("export-full-backup-button");
const importBackupFile = document.getElementById("import-backup-file");
const backupStatus = document.getElementById("backup-status");
const appVersionText = document.getElementById("app-version-text");
const appVersionFooter = document.getElementById("app-version-footer");
const debugAppVersion = document.getElementById("debug-app-version");
const checkAppUpdateButton = document.getElementById("check-app-update-button");
const appUpdateStatus = document.getElementById("app-update-status");
const clearAppCacheButton = document.getElementById("debug-clear-app-cache");
const debugPanel = document.getElementById("debug-panel");
const debugStorageOutput = document.getElementById("debug-storage-output");
const sessionOverlay = document.getElementById("session-overlay");
const sessionTrainerImage = document.getElementById("session-trainer-image");
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
const sessionMusicLoopToggle = document.getElementById("session-music-loop-toggle");
const sessionMusicToggleButton = document.getElementById("session-music-toggle-button");
const sessionPauseButton = document.getElementById("session-pause-button");
const sessionSaveButton = document.getElementById("session-save-button");
const sessionCancelButton = document.getElementById("session-cancel-button");
const resultOverlay = document.getElementById("result-overlay");
const resultScreen = document.getElementById("result-screen");
const resultTrainerImage = document.getElementById("result-trainer-image");
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
const appViews = document.querySelectorAll(".app-view");
const navButtons = document.querySelectorAll(".nav-button");
const recordTypeInputs = document.querySelectorAll('input[name="record-type"]');

const EXERCISE_DEFINITIONS = {
  pushup: {
    id: "pushup",
    name: "腕立て",
    allowedModes: ["time", "reps"]
  },
  abs: {
    id: "abs",
    name: "腹筋",
    allowedModes: ["time", "reps"]
  },
  squat: {
    id: "squat",
    name: "スクワット",
    allowedModes: ["time", "reps"]
  },
  plank: {
    id: "plank",
    name: "プランク",
    allowedModes: ["time"]
  },
  stretch: {
    id: "stretch",
    name: "ストレッチ",
    allowedModes: ["time"]
  },
  custom: {
    id: "custom",
    name: "自由種目",
    allowedModes: ["time", "reps"]
  }
};

const DEFAULT_SCORING_CONFIG = {
  dailyGoalScore: 100,
  intensityMultipliers: {
    1: 0.8,
    2: 0.9,
    3: 1,
    4: 1.1,
    5: 1.2
  },
  evaluationProfileMultipliers: {
    beginner: 1.2,
    standard: 1,
    experienced: 0.85,
    hard: 0.7
  },
  exerciseCoefficients: {
    pushup: {
      time: 10,
      reps: 2
    },
    abs: {
      time: 8,
      reps: 1.5
    },
    squat: {
      time: 15,
      reps: 1.5
    },
    plank: {
      time: 12,
      reps: 0
    },
    stretch: {
      time: 3,
      reps: 0
    },
    custom: {
      time: 5,
      reps: 1
    }
  }
};

const evaluationProfiles = {
  beginner: {
    label: "初心者",
    description: "初心者は軽い運動も評価されやすくなります。"
  },
  standard: {
    label: "標準",
    description: "標準的な評価でスコアを計算します。"
  },
  experienced: {
    label: "慣れている",
    description: "運動に慣れている人向けに、少し控えめに評価します。"
  },
  hard: {
    label: "高負荷向け",
    description: "高負荷トレーニング向けに、厳しめに評価します。"
  }
};
const TRAINER_LINES = {
  sessionStart: ({ exerciseName }) => `${exerciseName || "この種目"}、いこう。タイマーは見てるから、今は動きに集中してね。`,
  elapsed10: () => "いい入りだよ。そのまま呼吸を止めずに続けよう。",
  elapsed30: () => "30秒通過！フォームを小さく整えて、あと少し積もう。",
  elapsed60: () => "1分到達！ここまで来たの、かなりいい感じだよ。",
  paused: () => "一時停止中だよ。息を整えて、水分も忘れずにね。",
  resumed: () => "再開だね。無理なくリズムを戻していこう。",
  repsInput: ({ sessionReps }) => `${sessionReps}回、入力できたよ。きれいに記録へ残そう。`,
  projectedGoalReached: () => "このまま記録すると今日の目標達成！最後まで一緒にいこう。",
  highIntensity: () => "今日はしっかり追い込む日だね。きつい分、休憩も大事にしよう。",
  lowIntensity: () => "軽めでも続けてるのがえらいよ。今日の流れを守ろう。"
};

let records = [];
let appState = getDefaultState();
let scoringConfig = loadScoringConfig();
let isDevScoringConfigActive = localStorage.getItem(devScoringConfigStorageKey) !== null;
let selectedMusicUrl = "";
let timerState = "idle";
let elapsedSeconds = 0;
let timerId = null;
let sessionLineOverride = "";
let customTrainerImages = {};
let pendingCustomTrainerFiles = {};
const trainerImagePaths = {
  localPrivate: "assets/trainer/local/trainer_private.png",
  default: "assets/trainer/public/trainer_default.png",
  cheer: "assets/trainer/public/trainer_cheer.png",
  result: "assets/trainer/public/trainer_result.png",
  rest: "assets/trainer/public/trainer_rest.png"
};

function switchView(viewName) {
  appViews.forEach((view) => {
    view.classList.toggle("active", view.dataset.view === viewName);
  });

  navButtons.forEach((button) => {
    const isActive = button.dataset.viewTarget === viewName;
    button.classList.toggle("active", isActive);

    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isLocalDevelopment() {
  return ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
}

function openUserAssetsDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available."));
      return;
    }

    const request = indexedDB.open(userAssetsDbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(trainerImagesStoreName)) {
        db.createObjectStore(trainerImagesStoreName);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readTrainerImageRecord(key) {
  return openUserAssetsDb().then((db) => new Promise((resolve, reject) => {
    const transaction = db.transaction(trainerImagesStoreName, "readonly");
    const store = transaction.objectStore(trainerImagesStoreName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  }));
}

function writeTrainerImageRecord(key, file, savedAt = new Date().toISOString()) {
  const payload = {
    blob: file,
    fileName: file.name,
    mimeType: file.type,
    savedAt
  };

  return openUserAssetsDb().then((db) => new Promise((resolve, reject) => {
    const transaction = db.transaction(trainerImagesStoreName, "readwrite");
    const store = transaction.objectStore(trainerImagesStoreName);
    const request = store.put(payload, key);

    request.onsuccess = () => resolve(payload);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  }));
}

function deleteTrainerImageRecord(key) {
  return openUserAssetsDb().then((db) => new Promise((resolve, reject) => {
    const transaction = db.transaction(trainerImagesStoreName, "readwrite");
    const store = transaction.objectStore(trainerImagesStoreName);
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  }));
}

function clearCustomTrainerObjectUrl(slotKey) {
  if (customTrainerImages[slotKey]?.url) {
    URL.revokeObjectURL(customTrainerImages[slotKey].url);
  }

  delete customTrainerImages[slotKey];
}

function clearAllCustomTrainerObjectUrls() {
  Object.keys(customTrainerImages).forEach(clearCustomTrainerObjectUrl);
}

function setCustomTrainerImageFromRecord(slotKey, record) {
  clearCustomTrainerObjectUrl(slotKey);

  if (!record || !(record.blob instanceof Blob)) {
    return;
  }

  customTrainerImages[slotKey] = {
    url: URL.createObjectURL(record.blob),
    blob: record.blob,
    meta: {
      fileName: record.fileName || "custom-trainer",
      mimeType: record.mimeType || record.blob.type || "",
      savedAt: record.savedAt || null
    }
  };
}

async function loadCustomTrainerImage() {
  clearAllCustomTrainerObjectUrls();
  customTrainerImages = {};

  try {
    const defaultRecord = await readTrainerImageRecord("custom_default");
    const legacyRecord = defaultRecord || await readTrainerImageRecord(legacyCustomTrainerImageKey);

    if (legacyRecord && !defaultRecord) {
      const migratedFile = new File(
        [legacyRecord.blob],
        legacyRecord.fileName || "custom-trainer",
        { type: legacyRecord.mimeType || legacyRecord.blob.type || "image/png" }
      );
      await writeTrainerImageRecord("custom_default", migratedFile, legacyRecord.savedAt || new Date().toISOString());
    }

    setCustomTrainerImageFromRecord("custom_default", legacyRecord);

    await Promise.all(["custom_cheer", "custom_result", "custom_rest"].map(async (slotKey) => {
      const record = await readTrainerImageRecord(slotKey);
      setCustomTrainerImageFromRecord(slotKey, record);
    }));
  } catch (error) {
    clearAllCustomTrainerObjectUrls();
  }

  renderTrainerImageSettings();
  updateTrainerImages({
    home: "default",
    session: timerState === "paused" ? "rest" : "cheer",
    result: "result"
  });
}

function validateCustomTrainerImageFile(file) {
  if (!file) {
    return "画像ファイルを選択してください。";
  }

  if (!allowedTrainerImageTypes.includes(file.type)) {
    return "png、jpg、jpeg、webp の画像を選択してください。";
  }

  if (file.size > maxCustomTrainerImageSize) {
    return "画像サイズは5MB以内にしてください。";
  }

  return "";
}

function getTrainerImagesMetaPayload() {
  return Object.keys(customTrainerSlots).reduce((payload, slotKey) => {
    const slotImage = customTrainerImages[slotKey];
    payload[slotKey] = {
      hasImage: Boolean(slotImage),
      fileName: slotImage?.meta.fileName || null,
      mimeType: slotImage?.meta.mimeType || null,
      savedAt: slotImage?.meta.savedAt || null,
      dataUrl: null
    };
    return payload;
  }, {});
}

function getCustomTrainerImageMetaForBackup() {
  return getTrainerImagesMetaPayload();
}

function renderTrainerImageSettings() {
  const activeCount = Object.keys(customTrainerImages).length;

  if (customTrainerStatus) {
    customTrainerStatus.textContent = activeCount > 0 ? `${activeCount}差分設定中` : "デフォルト";
    customTrainerStatus.classList.toggle("active", activeCount > 0);
  }

  customTrainerSlotElements.forEach((slotElement) => {
    const slotKey = slotElement.dataset.trainerSlot;
    const slotImage = customTrainerImages[slotKey];
    const status = slotElement.querySelector("[data-trainer-slot-status]");
    const fileName = slotElement.querySelector("[data-trainer-slot-file-name]");
    const meta = slotElement.querySelector("[data-trainer-slot-meta]");
    const preview = slotElement.querySelector("[data-trainer-slot-preview]");

    if (status) {
      status.textContent = slotImage ? "カスタム画像" : "デフォルト";
      status.classList.toggle("active", Boolean(slotImage));
    }

    if (fileName) {
      fileName.textContent = slotImage?.meta.fileName || "未設定";
    }

    if (meta) {
      meta.textContent = slotImage
        ? `${slotImage.meta.mimeType || "image"} / 保存日時 ${slotImage.meta.savedAt || "-"}`
        : `${customTrainerSlots[slotKey]?.label || "画像"}を設定できます。png / jpg / jpeg / webp、5MBまで。`;
    }

    if (preview) {
      setTrainerImage(preview, customTrainerSlots[slotKey]?.context || "default");
    }
  });
}

function getTrainerImageCandidates(context) {
  const publicPath = trainerImagePaths[context] || trainerImagePaths.default;
  const publicCandidates = publicPath === trainerImagePaths.default
    ? [trainerImagePaths.default]
    : [publicPath, trainerImagePaths.default];
  const slotKeyByContext = {
    default: "custom_default",
    cheer: "custom_cheer",
    result: "custom_result",
    rest: "custom_rest"
  };
  const customCandidates = [
    customTrainerImages[slotKeyByContext[context]]?.url,
    context === "default" ? null : customTrainerImages.custom_default?.url
  ].filter(Boolean);

  if (context === "default" && isLocalDevelopment()) {
    return [...customCandidates, trainerImagePaths.localPrivate, ...publicCandidates];
  }

  return [...customCandidates, ...publicCandidates];
}

function setTrainerImage(imageElement, context) {
  if (!imageElement) {
    return;
  }

  const customImageKey = Object.values(customTrainerImages)
    .map((slotImage) => slotImage.url)
    .join("|");

  if (
    imageElement.dataset.trainerContext === context
    && imageElement.dataset.trainerCustomImageUrl === customImageKey
  ) {
    return;
  }

  imageElement.dataset.trainerContext = context;
  imageElement.dataset.trainerCustomImageUrl = customImageKey;
  const visual = imageElement.closest(".trainer-visual");
  const candidates = getTrainerImageCandidates(context);
  let candidateIndex = 0;

  function showFallback() {
    imageElement.removeAttribute("src");
    imageElement.classList.add("hidden");
    visual.classList.remove("has-image");
  }

  function tryCandidate() {
    const nextPath = candidates[candidateIndex];

    if (!nextPath) {
      showFallback();
      return;
    }

    const testImage = new Image();
    testImage.onload = () => {
      imageElement.src = nextPath;
      imageElement.classList.remove("hidden");
      visual.classList.add("has-image");
    };
    testImage.onerror = () => {
      candidateIndex += 1;
      tryCandidate();
    };
    testImage.src = nextPath;
  }

  tryCandidate();
}

function updateTrainerImages(contexts = {}) {
  setTrainerImage(homeTrainerImage, contexts.home || "default");
  setTrainerImage(sessionTrainerImage, contexts.session || "cheer");
  setTrainerImage(resultTrainerImage, contexts.result || "result");
}

function cloneScoringConfig(config) {
  return JSON.parse(JSON.stringify(config));
}

function normalizeScoringConfig(config) {
  const normalized = cloneScoringConfig(DEFAULT_SCORING_CONFIG);

  if (!config || typeof config !== "object") {
    return normalized;
  }

  if (Number.isFinite(Number(config.dailyGoalScore))) {
    normalized.dailyGoalScore = Number(config.dailyGoalScore);
  }

  Object.keys(normalized.intensityMultipliers).forEach((key) => {
    if (Number.isFinite(Number(config.intensityMultipliers?.[key]))) {
      normalized.intensityMultipliers[key] = Number(config.intensityMultipliers[key]);
    }
  });

  Object.keys(normalized.evaluationProfileMultipliers).forEach((key) => {
    if (Number.isFinite(Number(config.evaluationProfileMultipliers?.[key]))) {
      normalized.evaluationProfileMultipliers[key] = Number(config.evaluationProfileMultipliers[key]);
    }
  });

  Object.keys(normalized.exerciseCoefficients).forEach((exerciseId) => {
    ["time", "reps"].forEach((mode) => {
      if (Number.isFinite(Number(config.exerciseCoefficients?.[exerciseId]?.[mode]))) {
        normalized.exerciseCoefficients[exerciseId][mode] = Number(config.exerciseCoefficients[exerciseId][mode]);
      }
    });
  });

  return normalized;
}

function loadScoringConfig() {
  const savedConfig = localStorage.getItem(devScoringConfigStorageKey);

  if (!savedConfig) {
    return cloneScoringConfig(DEFAULT_SCORING_CONFIG);
  }

  try {
    return normalizeScoringConfig(JSON.parse(savedConfig));
  } catch (error) {
    return cloneScoringConfig(DEFAULT_SCORING_CONFIG);
  }
}

function saveDevScoringConfig() {
  localStorage.setItem(devScoringConfigStorageKey, JSON.stringify(scoringConfig));
  isDevScoringConfigActive = true;
}

function resetDevScoringConfig() {
  localStorage.removeItem(devScoringConfigStorageKey);
  scoringConfig = cloneScoringConfig(DEFAULT_SCORING_CONFIG);
  isDevScoringConfigActive = false;
  renderScoringConfigPanel();
  renderHistory();
  updateAllStats();
  updateSessionDisplay();
  updateDebugStorageOutput();
  showMessage("スコア設定をデフォルトに戻しました。", true);
}

function getDailyGoalScore() {
  return Number(scoringConfig.dailyGoalScore || DEFAULT_SCORING_CONFIG.dailyGoalScore);
}

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

  return getExerciseDefinition(getSelectedExercise()).id;
}

function getExerciseDefinition(exercise) {
  return Object.values(EXERCISE_DEFINITIONS)
    .find((definition) => definition.name === exercise) || EXERCISE_DEFINITIONS.custom;
}

function isRecordModeAllowed(exercise, recordType) {
  return getExerciseDefinition(exercise).allowedModes.includes(recordType);
}

function getAllowedRecordModeText(exercise) {
  return getExerciseDefinition(exercise).allowedModes
    .map(getRecordTypeText)
    .join(" / ");
}

function updateRecordModeAvailability() {
  const exercise = getSelectedExercise();
  const definition = getExerciseDefinition(exercise);
  const currentRecordType = getRecordType();

  recordTypeInputs.forEach((input) => {
    const isAllowed = definition.allowedModes.includes(input.value);
    input.disabled = !isAllowed;
    input.closest("label").classList.toggle("disabled", !isAllowed);
  });

  if (!definition.allowedModes.includes(currentRecordType)) {
    const fallbackInput = Array.from(recordTypeInputs)
      .find((input) => definition.allowedModes.includes(input.value));

    if (fallbackInput) {
      fallbackInput.checked = true;
    }
  }

  if (exercise === "") {
    recordModeHint.textContent = "種目を選ぶと、使える記録方式を表示します。";
    return;
  }

  if (definition.allowedModes.length === 1) {
    recordModeHint.textContent = `この種目は${getAllowedRecordModeText(exercise)}で記録します。`;
    return;
  }

  recordModeHint.textContent = `この種目は${getAllowedRecordModeText(exercise)}で記録できます。`;
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

  updateRecordModeAvailability();
  updateRecordUnit();
}

function getRecordType() {
  const selectedType = document.querySelector('input[name="record-type"]:checked');
  return selectedType ? selectedType.value : "time";
}

function getRecordAmount() {
  if (getRecordType() === "time" && elapsedSeconds > 0) {
    return String(secondsToMinutes(elapsedSeconds));
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

function getTrainerLine(context) {
  if (context.sessionState === "paused") {
    return TRAINER_LINES.paused(context);
  }

  if (context.projectedGoalReached) {
    return TRAINER_LINES.projectedGoalReached(context);
  }

  if (context.mode === "reps" && Number(context.sessionReps || 0) > 0) {
    return TRAINER_LINES.repsInput(context);
  }

  if (context.elapsedSeconds >= 60) {
    return TRAINER_LINES.elapsed60(context);
  }

  if (context.elapsedSeconds >= 30) {
    return TRAINER_LINES.elapsed30(context);
  }

  if (context.elapsedSeconds >= 10) {
    return TRAINER_LINES.elapsed10(context);
  }

  if (Number(context.intensity || 0) >= 4) {
    return TRAINER_LINES.highIntensity(context);
  }

  if (Number(context.intensity || 0) <= 2) {
    return TRAINER_LINES.lowIntensity(context);
  }

  return TRAINER_LINES.sessionStart(context);
}

function updateSessionTrainerLine(projectedGoalReached) {
  const context = {
    sessionState: timerState,
    elapsedSeconds,
    exerciseName: getSelectedExercise(),
    mode: getRecordType(),
    intensity: getSelectedEffort(),
    sessionReps: sessionRepsInput.value,
    projectedGoalReached
  };
  const line = sessionLineOverride || getTrainerLine(context);

  sessionTrainerComment.textContent = line;
}

function setTemporarySessionLine(message) {
  sessionLineOverride = message;
  setTimeout(() => {
    if (sessionLineOverride === message) {
      sessionLineOverride = "";
      updateSessionDisplay();
    }
  }, 4000);
}

function validateRecord(exercise, amount, recordType) {
  if (exercise === "") {
    updateTrainerComment("種目を選べば大丈夫。今日の一歩を一緒に記録しよう。");
    return "記録する種目を1つ選んでね。";
  }

  if (!isRecordModeAllowed(exercise, recordType)) {
    const allowedModeText = getAllowedRecordModeText(exercise);
    updateTrainerComment(`この種目は${allowedModeText}で記録しよう。記録方式を直しておいたよ。`);
    updateRecordModeAvailability();
    updateRecordUnit();
    return `この種目は${allowedModeText}で記録してね。`;
  }

  if (recordType === "time") {
    if (elapsedSeconds < 1) {
      updateTrainerComment("1秒でも動けたら記録できるよ。タイマーを少し進めてから保存してね。");
      return "時間式は1秒以上で保存できるよ。";
    }

    return "";
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
  updateRecordModeAvailability();
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

function secondsToMinutes(seconds) {
  return Number((Number(seconds || 0) / 60).toFixed(3));
}

function formatDuration(seconds) {
  const durationSeconds = Math.max(Math.round(Number(seconds || 0)), 0);

  if (durationSeconds < 60) {
    return `${durationSeconds}秒`;
  }

  return `${secondsToMinutes(durationSeconds).toFixed(1)}分`;
}

function getElapsedMinutes() {
  return secondsToMinutes(elapsedSeconds);
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatElapsedTime(elapsedSeconds);
  sessionTimerDisplay.textContent = formatDuration(elapsedSeconds);

  if (getRecordType() === "time") {
    recordAmountInput.value = elapsedSeconds > 0 ? getElapsedMinutes() : "";
  }

  updateSessionDisplay();
}

function startTimer() {
  timerState = "running";
  sessionLineOverride = "";
  startWorkoutButton.textContent = "一時停止";
  sessionPauseButton.textContent = "一時停止";
  updateTrainerComment("スタート！タイマーは任せて、今の種目に集中しよう。");
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
  sessionLineOverride = TRAINER_LINES.paused({});
  startWorkoutButton.textContent = "再開";
  sessionPauseButton.textContent = "再開";
  updateTrainerComment("一時停止中だよ。息を整えたら再開しよう。");
  showMessage("タイマーを一時停止しました。", true);
  updateSessionDisplay();

  clearInterval(timerId);
  timerId = null;
}

function stopTimerForSave() {
  clearInterval(timerId);
  timerId = null;
  timerState = "paused";
  startWorkoutButton.textContent = "再開";
  sessionPauseButton.textContent = "再開";
  updateTimerDisplay();
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  timerState = "idle";
  elapsedSeconds = 0;
  sessionLineOverride = "";
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
    setTemporarySessionLine(TRAINER_LINES.resumed({}));
    updateTrainerComment(sessionLineOverride);
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
    return secondsToMinutes(elapsedSeconds);
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
  if (!isRecordModeAllowed(exercise || "自由種目", recordType)) {
    return null;
  }

  const coefficient = getExerciseCoefficient(exercise || "自由種目", recordType);
  const multiplier = getEffortMultiplier(effort);
  const profileMultiplier = getEvaluationProfileMultiplier();

  if (remainingScore <= 0) {
    return 0;
  }

  if (coefficient <= 0 || multiplier <= 0 || profileMultiplier <= 0) {
    return null;
  }

  return Math.ceil(remainingScore / coefficient / multiplier / profileMultiplier);
}

function getGoalRecommendationText(exercise, recordType, effort, projectedScore) {
  const unit = getRecordUnit(recordType);
  const savedTodayScore = calculateTodayScore();
  const expectedTodayScore = savedTodayScore + Number(projectedScore || 0);
  const remainingScore = Math.max(getDailyGoalScore() - expectedTodayScore, 0);
  const neededAmount = calculateRemainingAmountFromScore(remainingScore, exercise, recordType, effort);

  if (savedTodayScore >= getDailyGoalScore()) {
    return "今日の目標は達成済みです";
  }

  if (expectedTodayScore >= getDailyGoalScore()) {
    return "この種目を記録すると目標達成です！";
  }

  if (exercise === "") {
    return "種目を選ぶと目安を表示します";
  }

  if (neededAmount === null) {
    return `この種目は${getAllowedRecordModeText(exercise)}で記録します`;
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
  const trainerContext = timerState === "paused" ? "rest" : "cheer";

  updateSessionRecordControls();
  setTrainerImage(sessionTrainerImage, trainerContext);
  const projectedScore = calculateSessionProjectedScore(exercise, recordType, effort);
  const expectedScore = calculateTodayScore() + projectedScore;
  const projectedGoalReached = calculateTodayScore() < getDailyGoalScore()
    && expectedScore >= getDailyGoalScore();

  sessionStateLabel.textContent = stateText;
  sessionTitle.textContent = exercise || "未選択";
  sessionRecordType.textContent = `${getRecordTypeText(recordType)}で記録`;
  sessionTimerDisplay.textContent = formatDuration(elapsedSeconds);
  sessionCurrentScore.textContent = `${expectedScore}`;
  sessionTargetScore.textContent = `${getDailyGoalScore()}`;
  sessionProjectedScore.textContent = `見込み +${projectedScore}pt`;
  sessionGoalRecommendation.textContent = getGoalRecommendationText(exercise, recordType, effort, projectedScore);
  sessionMusicFileName.textContent = getSelectedMusicFileName();
  musicLoopToggle.checked = Boolean(appState.musicLoop);
  sessionMusicLoopToggle.checked = Boolean(appState.musicLoop);
  sessionMusicToggleButton.textContent = musicPlayer.paused ? "再生" : "停止";
  updateSessionTrainerLine(projectedGoalReached);
}

function startSession() {
  const exercise = getSelectedExercise();
  const recordType = getRecordType();

  if (exercise === "") {
    updateTrainerComment("先に種目を選ぼう。決めたらすぐ一緒に始められるよ。");
    showMessage("記録する種目を1つ選んでね。", false);
    return;
  }

  if (!isRecordModeAllowed(exercise, recordType)) {
    const allowedModeText = getAllowedRecordModeText(exercise);
    updateTrainerComment(`この種目は${allowedModeText}で記録しよう。`);
    showMessage(`この種目は${allowedModeText}で記録してね。`, false);
    updateRecordModeAvailability();
    updateRecordUnit();
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
  setTemporarySessionLine(TRAINER_LINES.resumed({}));
  updateTrainerComment(sessionLineOverride);
}

function handleSessionSaveButtonClick() {
  if (timerState === "running") {
    stopTimerForSave();
  }

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
  const definition = getExerciseDefinition(exercise);
  return Number(scoringConfig.exerciseCoefficients[definition.id]?.[recordType] || 0);
}

function getEffortMultiplier(effort) {
  return scoringConfig.intensityMultipliers[effort] || 1;
}

function getEvaluationProfile() {
  return evaluationProfiles[appState.evaluationProfile]
    ? appState.evaluationProfile
    : "standard";
}

function getEvaluationProfileMultiplier() {
  return scoringConfig.evaluationProfileMultipliers[getEvaluationProfile()] || 1;
}

function updateEvaluationProfileDisplay() {
  const profile = getEvaluationProfile();
  evaluationProfileSelect.value = profile;
  evaluationProfileDescription.textContent = `${evaluationProfiles[profile].description} スコア倍率: ${getEvaluationProfileMultiplier()}`;
}

function handleEvaluationProfileChange() {
  appState.evaluationProfile = evaluationProfileSelect.value;
  saveState();
  updateEvaluationProfileDisplay();
  updateGoalRecommendation();
  updateSessionDisplay();
  updateScorePreview();
  updateDebugStorageOutput();
  showMessage(`評価レベルを「${evaluationProfiles[getEvaluationProfile()].label}」に変更しました。`, true);
}

function renderScoringConfigPanel() {
  const exerciseDefinitions = Object.values(EXERCISE_DEFINITIONS);
  const intensityFields = Object.keys(DEFAULT_SCORING_CONFIG.intensityMultipliers)
    .map((level) => `
      <label>
        <span>きつさ${level}</span>
        <input class="score-config-input" type="number" step="0.05" data-config-group="intensity" data-config-key="${level}" value="${scoringConfig.intensityMultipliers[level]}">
      </label>
    `).join("");
  const profileFields = Object.keys(DEFAULT_SCORING_CONFIG.evaluationProfileMultipliers)
    .map((profile) => `
      <label>
        <span>${evaluationProfiles[profile].label}</span>
        <input class="score-config-input" type="number" step="0.05" data-config-group="profile" data-config-key="${profile}" value="${scoringConfig.evaluationProfileMultipliers[profile]}">
      </label>
    `).join("");
  const exerciseFields = exerciseDefinitions
    .map((definition) => `
      <div class="score-config-exercise">
        <h4>${definition.name === "自由種目" ? "その他" : definition.name}</h4>
        <label>
          <span>時間係数</span>
          <input class="score-config-input" type="number" step="0.1" data-config-group="exercise" data-exercise-id="${definition.id}" data-config-key="time" value="${scoringConfig.exerciseCoefficients[definition.id].time}">
        </label>
        <label>
          <span>回数係数</span>
          <input class="score-config-input" type="number" step="0.1" data-config-group="exercise" data-exercise-id="${definition.id}" data-config-key="reps" value="${scoringConfig.exerciseCoefficients[definition.id].reps}">
        </label>
      </div>
    `).join("");

  scoreConfigFields.innerHTML = `
    <div class="score-config-group">
      <h3>今日の目標スコア</h3>
      <label>
        <span>目標</span>
        <input class="score-config-input" type="number" step="1" data-config-group="dailyGoalScore" value="${scoringConfig.dailyGoalScore}">
      </label>
    </div>
    <div class="score-config-group">
      <h3>きつさ倍率</h3>
      <div class="score-config-grid">${intensityFields}</div>
    </div>
    <div class="score-config-group">
      <h3>評価プロファイル倍率</h3>
      <div class="score-config-grid">${profileFields}</div>
    </div>
    <div class="score-config-group">
      <h3>種目係数</h3>
      <div class="score-config-exercise-grid">${exerciseFields}</div>
    </div>
  `;

  scorePreviewExercise.innerHTML = exerciseDefinitions
    .map((definition) => `<option value="${definition.id}">${definition.name === "自由種目" ? "その他" : definition.name}</option>`)
    .join("");
  scorePreviewExercise.value = "squat";
  scorePreviewProfile.value = getEvaluationProfile();
  updateScoringConfigPanelState();
}

function updateScoringConfigPanelState() {
  devScoringStatus.textContent = isDevScoringConfigActive
    ? "開発者用スコア設定が有効です"
    : "デフォルト設定";
  devScoringStatus.classList.toggle("active", isDevScoringConfigActive);
  scoreConfigJson.textContent = JSON.stringify(scoringConfig, null, 2);
  updateEvaluationProfileDisplay();
  updateScorePreview();
}

function updateScoringConfigFromInput(input) {
  const value = Number(input.value);

  if (!Number.isFinite(value)) {
    return;
  }

  if (input.dataset.configGroup === "dailyGoalScore") {
    scoringConfig.dailyGoalScore = value;
  }

  if (input.dataset.configGroup === "intensity") {
    scoringConfig.intensityMultipliers[input.dataset.configKey] = value;
  }

  if (input.dataset.configGroup === "profile") {
    scoringConfig.evaluationProfileMultipliers[input.dataset.configKey] = value;
  }

  if (input.dataset.configGroup === "exercise") {
    scoringConfig.exerciseCoefficients[input.dataset.exerciseId][input.dataset.configKey] = value;
  }

  scoringConfig = normalizeScoringConfig(scoringConfig);
  saveDevScoringConfig();
  updateScoringConfigPanelState();
  renderHistory();
  updateAllStats();
  updateSessionDisplay();
  updateDebugStorageOutput();
}

function updateScorePreview() {
  const exerciseId = scorePreviewExercise.value || "squat";
  const definition = EXERCISE_DEFINITIONS[exerciseId] || EXERCISE_DEFINITIONS.custom;
  const mode = scorePreviewMode.value;
  const amount = Number(scorePreviewAmount.value || 0);
  const intensity = scorePreviewIntensity.value;
  const profile = scorePreviewProfile.value;
  const coefficient = Number(scoringConfig.exerciseCoefficients[exerciseId]?.[mode] || 0);
  const intensityMultiplier = Number(scoringConfig.intensityMultipliers[intensity] || 1);
  const profileMultiplier = Number(scoringConfig.evaluationProfileMultipliers[profile] || 1);
  const score = Math.round(amount * coefficient * intensityMultiplier * profileMultiplier);
  const unit = mode === "time" ? "分" : "回";
  const profileLabel = evaluationProfiles[profile]?.label || profile;

  scorePreviewResult.innerHTML = `
    <strong>${score}点</strong>
    <span>${definition.name === "自由種目" ? "その他" : definition.name} / ${mode} / ${amount}${unit} / きつさ${intensity} / ${profileLabel}</span>
    <code>${amount} × ${coefficient} × ${intensityMultiplier} × ${profileMultiplier} = ${score}</code>
  `;
}

function copyScoringConfigJson() {
  const jsonText = JSON.stringify(scoringConfig, null, 2);

  if (navigator.clipboard) {
    navigator.clipboard.writeText(jsonText)
      .then(() => showMessage("設定JSONをコピーしました。", true))
      .catch(() => showMessage("コピーできませんでした。JSON表示から選択してコピーしてください。", false));
    return;
  }

  showMessage("コピー機能を使えませんでした。JSON表示から選択してコピーしてください。", false);
}

function calculateScore(exercise, recordType, amount, effort) {
  if (!isRecordModeAllowed(exercise, recordType)) {
    return 0;
  }

  const coefficient = getExerciseCoefficient(exercise, recordType);
  const multiplier = getEffortMultiplier(effort);
  const profileMultiplier = getEvaluationProfileMultiplier();
  return Math.round(Number(amount) * coefficient * multiplier * profileMultiplier);
}

function calculateRecordScore(exercise, recordType, amount, effort, savedElapsedSeconds) {
  const scoreAmount = recordType === "time"
    ? secondsToMinutes(savedElapsedSeconds)
    : amount;

  return calculateScore(exercise, recordType, scoreAmount, effort);
}

function calculateNeededAmount(exercise, recordType, effort) {
  const remainingScore = Math.max(getDailyGoalScore() - calculateTodayScore(), 0);
  return calculateRemainingAmountFromScore(remainingScore, exercise, recordType, effort);
}

function markGoalRewardIfNeeded() {
  const today = getTodayDateString();

  if (calculateTodayScore() < getDailyGoalScore()) {
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
  const neededAmount = calculateNeededAmount(exercise || "自由種目", recordType, effort);

  if (calculateTodayScore() >= getDailyGoalScore()) {
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
    goalRecommendation.textContent = `この種目は${getAllowedRecordModeText(exercise)}で記録します`;
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
    setTrainerImage(homeTrainerImage, "rest");
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
  const achievementRate = Math.min(Math.round((todayScore / getDailyGoalScore()) * 100), 999);
  const goalClaimed = appState.claimedGoalRewardDates.includes(getTodayDateString());

  targetScoreText.textContent = `${getDailyGoalScore()}`;
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
    claimedLevelRewards: [],
    evaluationProfile: "standard",
    musicLoop: false
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
      : defaultState.claimedLevelRewards,
    evaluationProfile: evaluationProfiles[parsedState.evaluationProfile]
      ? parsedState.evaluationProfile
      : defaultState.evaluationProfile,
    musicLoop: Boolean(parsedState.musicLoop ?? defaultState.musicLoop)
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
  const recordValue = recordType === "time"
    ? secondsToMinutes(savedElapsedSeconds)
    : Number(amount);

  return {
    id: `record-${now.getTime()}`,
    date: getTodayDateString(),
    exerciseId: getExerciseId() || exercise,
    exerciseName: exercise,
    mode: recordType,
    value: recordValue,
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
  applyMusicLoopSetting();
  updateSessionDisplay();
}

function applyMusicLoopSetting() {
  musicPlayer.loop = Boolean(appState.musicLoop);
  musicLoopToggle.checked = Boolean(appState.musicLoop);
  sessionMusicLoopToggle.checked = Boolean(appState.musicLoop);
}

function handleMusicLoopChange(event) {
  appState.musicLoop = event.target.checked;
  saveState();
  applyMusicLoopSetting();
  updateSessionDisplay();
  showMessage(appState.musicLoop ? "音楽ループをONにしました。" : "音楽ループをOFFにしました。", true);
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

  if (result.levelRewards.length > 0) {
    return "ticket-reward";
  }

  return "sparkle";
}

function createResultSummary(record, beforeLevel, levelRewards, goalMarked) {
  const afterTotalExp = calculateTotalExp();
  const afterLevel = calculateLevel(afterTotalExp);
  const levelProgress = calculateLevelProgress(afterTotalExp);
  const todayScore = calculateTodayScore();
  const goalAchieved = todayScore >= getDailyGoalScore();
  const achievementRate = Math.min(Math.round((todayScore / getDailyGoalScore()) * 100), 999);

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

  resultScreen.classList.remove("goal-complete", "level-up", "ticket-reward", "sparkle");
  resultScreen.classList.add(animationClass);
  setTrainerImage(resultTrainerImage, "result");
  resultTitle.textContent = getResultTitle(result);
  resultTrainerComment.textContent = getResultTrainerComment(result);
  resultExerciseName.textContent = record.exerciseName;
  resultRecordValue.textContent = getRecordDisplayValue(record);
  resultEffort.textContent = `${record.intensity}`;
  resultScore.textContent = `${record.score}`;
  resultExp.textContent = `${record.exp}`;
  resultTodayScore.textContent = `${result.todayScore}`;
  resultTargetScore.textContent = `${getDailyGoalScore()}`;
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
  resultScreen.classList.remove("goal-complete", "level-up", "ticket-reward", "sparkle");
  setTrainerImage(homeTrainerImage, "default");
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
  sessionLineOverride = "";
  updateSessionDisplay();
  updateGoalRecommendation();
}

function clearSessionReps() {
  sessionRepsInput.value = "";
  recordAmountInput.value = "";
  sessionLineOverride = "";
  updateSessionDisplay();
  updateGoalRecommendation();
}

function getHistoryDateParts(dateText) {
  const [year, month, day] = dateText.split("-").map(Number);
  return { year, month, day };
}

function formatHistoryDate(dateText) {
  const { year, month, day } = getHistoryDateParts(dateText);
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
}

function formatHistoryAmount(amount, unit) {
  const roundedAmount = Math.round(Number(amount) * 10) / 10;
  return `${Number.isInteger(roundedAmount) ? roundedAmount : roundedAmount.toFixed(1)}${unit}`;
}

function getRecordDurationSeconds(record) {
  if (Number(record.elapsedSeconds || 0) > 0) {
    return Number(record.elapsedSeconds);
  }

  return Number(record.value || 0) * 60;
}

function getRecordDisplayValue(record) {
  if (record.mode === "time") {
    return formatDuration(getRecordDurationSeconds(record));
  }

  return `${record.value}${record.unit}`;
}

function getHistoryExerciseAmountText(exerciseSummary) {
  if (exerciseSummary.mode === "time") {
    return formatDuration(exerciseSummary.totalSeconds);
  }

  return formatHistoryAmount(exerciseSummary.totalValue, exerciseSummary.unit);
}

function createHistorySummary() {
  const summary = {};

  records.forEach((record) => {
    const dateText = record.date || getTodayDateString();
    const { year, month } = getHistoryDateParts(dateText);
    const yearKey = String(year);
    const monthKey = String(month).padStart(2, "0");
    const exerciseName = record.exerciseName || "未設定";
    const unit = record.unit || getRecordUnit(record.mode);
    const exerciseKey = `${exerciseName}__${unit}`;

    if (!summary[yearKey]) {
      summary[yearKey] = { year, months: {} };
    }

    if (!summary[yearKey].months[monthKey]) {
      summary[yearKey].months[monthKey] = { month, days: {} };
    }

    if (!summary[yearKey].months[monthKey].days[dateText]) {
      summary[yearKey].months[monthKey].days[dateText] = {
        date: dateText,
        totalScore: 0,
        exerciseNames: new Set(),
        exercises: {}
      };
    }

    const daySummary = summary[yearKey].months[monthKey].days[dateText];
    daySummary.totalScore += Number(record.score || 0);
    daySummary.exerciseNames.add(exerciseName);

    if (!daySummary.exercises[exerciseKey]) {
      daySummary.exercises[exerciseKey] = {
        name: exerciseName,
        mode: record.mode || "time",
        unit,
        totalValue: 0,
        totalSeconds: 0,
        totalScore: 0,
        count: 0,
        totalIntensity: 0
      };
    }

    const exerciseSummary = daySummary.exercises[exerciseKey];
    if (record.mode === "time") {
      exerciseSummary.totalSeconds += getRecordDurationSeconds(record);
      exerciseSummary.totalValue = secondsToMinutes(exerciseSummary.totalSeconds);
    } else {
      exerciseSummary.totalValue += Number(record.value || 0);
    }
    exerciseSummary.totalScore += Number(record.score || 0);
    exerciseSummary.count += 1;
    exerciseSummary.totalIntensity += Number(record.intensity || 0);
  });

  return summary;
}

function appendHistoryExercise(parent, exerciseSummary) {
  const exerciseItem = document.createElement("li");
  const averageIntensity = exerciseSummary.count === 0
    ? 0
    : exerciseSummary.totalIntensity / exerciseSummary.count;

  exerciseItem.className = "history-exercise-item";
  exerciseItem.textContent = `${exerciseSummary.name}　合計${getHistoryExerciseAmountText(exerciseSummary)}　${exerciseSummary.totalScore}pt　${exerciseSummary.count}件　平均きつさ${averageIntensity.toFixed(1)}`;
  parent.appendChild(exerciseItem);
}

function appendHistoryDay(parent, daySummary, shouldOpen) {
  const dayItem = document.createElement("li");
  const dayDetails = document.createElement("details");
  const dayTitle = document.createElement("summary");
  const exerciseList = document.createElement("ul");
  const goalText = daySummary.totalScore >= getDailyGoalScore() ? "達成" : "挑戦中";
  const exerciseCount = daySummary.exerciseNames.size;

  dayItem.className = "history-day-item";
  dayDetails.open = shouldOpen;
  dayTitle.textContent = `${formatHistoryDate(daySummary.date)}　${daySummary.totalScore} / ${getDailyGoalScore()}pt　${goalText}　${exerciseCount}種目`;
  exerciseList.className = "history-exercise-list";

  Object.values(daySummary.exercises)
    .sort((a, b) => b.totalScore - a.totalScore)
    .forEach((exerciseSummary) => {
      appendHistoryExercise(exerciseList, exerciseSummary);
    });

  dayDetails.appendChild(dayTitle);
  dayDetails.appendChild(exerciseList);
  dayItem.appendChild(dayDetails);
  parent.appendChild(dayItem);
}

function appendHistoryMonth(parent, monthSummary, shouldOpen) {
  const monthItem = document.createElement("li");
  const monthDetails = document.createElement("details");
  const monthTitle = document.createElement("summary");
  const dayList = document.createElement("ul");

  monthItem.className = "history-month-item";
  monthDetails.open = shouldOpen;
  monthTitle.textContent = `${monthSummary.month}月`;
  dayList.className = "history-day-list";

  Object.values(monthSummary.days)
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((daySummary, index) => {
      appendHistoryDay(dayList, daySummary, shouldOpen && index === 0);
    });

  monthDetails.appendChild(monthTitle);
  monthDetails.appendChild(dayList);
  monthItem.appendChild(monthDetails);
  parent.appendChild(monthItem);
}

function appendHistoryYear(parent, yearSummary, shouldOpen) {
  const yearItem = document.createElement("li");
  const yearDetails = document.createElement("details");
  const yearTitle = document.createElement("summary");
  const monthList = document.createElement("ul");

  yearItem.className = "history-year-item";
  yearDetails.open = shouldOpen;
  yearTitle.textContent = `${yearSummary.year}年`;
  monthList.className = "history-month-list";

  Object.values(yearSummary.months)
    .sort((a, b) => b.month - a.month)
    .forEach((monthSummary, index) => {
      appendHistoryMonth(monthList, monthSummary, shouldOpen && index === 0);
    });

  yearDetails.appendChild(yearTitle);
  yearDetails.appendChild(monthList);
  yearItem.appendChild(yearDetails);
  parent.appendChild(yearItem);
}

function renderHistory() {
  historyList.innerHTML = "";
  emptyHistory.classList.toggle("hidden", records.length > 0);

  if (records.length === 0) {
    return;
  }

  Object.values(createHistorySummary())
    .sort((a, b) => b.year - a.year)
    .forEach((yearSummary, index) => {
      appendHistoryYear(historyList, yearSummary, index === 0);
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

  const score = calculateRecordScore(exercise, recordType, amount, effort, savedElapsedSeconds);
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
  applyMusicLoopSetting();
  updateAllStats();
  showMessage("状態データを削除しました。", true);
}

async function clearAllData() {
  records = [];
  appState = getDefaultState();
  localStorage.removeItem(storageKey);
  localStorage.removeItem(stateStorageKey);
  localStorage.removeItem(devScoringConfigStorageKey);
  try {
    await Promise.all([
      ...Object.keys(customTrainerSlots).map(deleteTrainerImageRecord),
      deleteTrainerImageRecord(legacyCustomTrainerImageKey)
    ]);
  } catch (error) {
    // IndexedDB may be unavailable; localStorage cleanup should still complete.
  }
  clearAllCustomTrainerObjectUrls();
  pendingCustomTrainerFiles = {};
  saveState();
  scoringConfig = cloneScoringConfig(DEFAULT_SCORING_CONFIG);
  isDevScoringConfigActive = false;
  renderTrainerImageSettings();
  renderScoringConfigPanel();
  applyMusicLoopSetting();
  renderHistory();
  updateAllStats();
  updateTrainerImages({ home: "default", session: "cheer", result: "result" });
  updateDebugStorageOutput();
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

function getAppVersionText() {
  return `トレログ v${APP_VERSION} / ${APP_BUILD_LABEL}`;
}

function updateAppVersionDisplay() {
  const versionText = getAppVersionText();

  [appVersionText, appVersionFooter, debugAppVersion].forEach((element) => {
    if (element) {
      element.textContent = versionText;
    }
  });
}

async function checkForAppUpdate() {
  if (!("serviceWorker" in navigator)) {
    if (appUpdateStatus) {
      appUpdateStatus.textContent = "このブラウザではService Worker更新確認を利用できません。";
    }
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      if (appUpdateStatus) {
        appUpdateStatus.textContent = "Service Workerはまだ登録されていません。ページを開き直してから再度お試しください。";
      }
      return;
    }

    await registration.update();
    if (appUpdateStatus) {
      appUpdateStatus.textContent = "更新確認を実行しました。反映されない場合はページを開き直してください。";
    }
  } catch (error) {
    if (appUpdateStatus) {
      appUpdateStatus.textContent = "更新確認に失敗しました。通信状況を確認して、もう一度お試しください。";
    }
  }
}

async function clearAppCachesAndReload() {
  if (!("caches" in window)) {
    showMessage("このブラウザではアプリキャッシュ削除を利用できません。", false);
    return;
  }

  if (!window.confirm("アプリ本体のキャッシュだけを削除して再読み込みします。筋トレ記録・設定・カスタム画像は削除しません。続行しますか？")) {
    return;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    location.reload();
  } catch (error) {
    showMessage("アプリキャッシュ削除に失敗しました。", false);
  }
}

function updateDebugStorageOutput() {
  if (!DEBUG_MODE || !debugStorageOutput) {
    return;
  }

  debugStorageOutput.textContent = JSON.stringify({
    app: {
      version: APP_VERSION,
      buildLabel: APP_BUILD_LABEL
    },
    trelog_records: JSON.parse(localStorage.getItem(storageKey) || "[]"),
    trelog_state: JSON.parse(localStorage.getItem(stateStorageKey) || "null"),
    trelog_dev_scoring_config: JSON.parse(localStorage.getItem(devScoringConfigStorageKey) || "null"),
    trainerImages: getCustomTrainerImageMetaForBackup()
  }, null, 2);
}

function handleCustomTrainerFileChange(slotElement) {
  const slotKey = slotElement.dataset.trainerSlot;
  const fileInput = slotElement.querySelector("[data-trainer-slot-input]");
  const selectedName = slotElement.querySelector("[data-trainer-slot-selected-name]");
  const file = fileInput.files[0] || null;
  const errorMessage = validateCustomTrainerImageFile(file);

  if (errorMessage) {
    delete pendingCustomTrainerFiles[slotKey];
    selectedName.textContent = file ? file.name : "未選択";
    if (file) {
      showMessage(errorMessage, false);
    }
    return;
  }

  pendingCustomTrainerFiles[slotKey] = file;
  selectedName.textContent = file.name;
  showMessage(`${customTrainerSlots[slotKey].label}を選択しました。適用を押すと保存します。`, true);
}

async function handleApplyCustomTrainerImage(slotElement) {
  const slotKey = slotElement.dataset.trainerSlot;
  const fileInput = slotElement.querySelector("[data-trainer-slot-input]");
  const selectedName = slotElement.querySelector("[data-trainer-slot-selected-name]");
  const file = pendingCustomTrainerFiles[slotKey];
  const errorMessage = validateCustomTrainerImageFile(file);

  if (errorMessage) {
    showMessage(errorMessage, false);
    return;
  }

  try {
    const record = await writeTrainerImageRecord(slotKey, file);
    setCustomTrainerImageFromRecord(slotKey, record);
    delete pendingCustomTrainerFiles[slotKey];
    fileInput.value = "";
    selectedName.textContent = "未選択";
    renderTrainerImageSettings();
    updateTrainerImages({
      home: "default",
      session: timerState === "paused" ? "rest" : "cheer",
      result: "result"
    });
    showMessage(`${customTrainerSlots[slotKey].label}を保存しました。`, true);
  } catch (error) {
    showMessage("画像の保存に失敗しました。ブラウザの保存領域を確認してください。", false);
  }
}

async function handleDeleteCustomTrainerImage(slotElement) {
  const slotKey = slotElement.dataset.trainerSlot;
  const fileInput = slotElement.querySelector("[data-trainer-slot-input]");
  const selectedName = slotElement.querySelector("[data-trainer-slot-selected-name]");

  try {
    await deleteTrainerImageRecord(slotKey);
    clearCustomTrainerObjectUrl(slotKey);
    delete pendingCustomTrainerFiles[slotKey];
    fileInput.value = "";
    selectedName.textContent = "未選択";
    renderTrainerImageSettings();
    updateTrainerImages({
      home: "default",
      session: timerState === "paused" ? "rest" : "cheer",
      result: "result"
    });
    showMessage(`${customTrainerSlots[slotKey].label}をデフォルトに戻しました。`, true);
  } catch (error) {
    showMessage("カスタム画像の削除に失敗しました。", false);
  }
}

async function handleDeleteAllCustomTrainerImages() {
  try {
    await Promise.all([
      ...Object.keys(customTrainerSlots).map(deleteTrainerImageRecord),
      deleteTrainerImageRecord(legacyCustomTrainerImageKey)
    ]);
    clearAllCustomTrainerObjectUrls();
    pendingCustomTrainerFiles = {};
    customTrainerSlotElements.forEach((slotElement) => {
      const fileInput = slotElement.querySelector("[data-trainer-slot-input]");
      const selectedName = slotElement.querySelector("[data-trainer-slot-selected-name]");
      fileInput.value = "";
      selectedName.textContent = "未選択";
    });
    renderTrainerImageSettings();
    updateTrainerImages({ home: "default", session: timerState === "paused" ? "rest" : "cheer", result: "result" });
    showMessage("すべてのカスタム画像をデフォルトに戻しました。", true);
  } catch (error) {
    showMessage("カスタム画像の削除に失敗しました。", false);
  }
}

function getBackupFileName(backupType) {
  const typeLabel = backupType === "full" ? "full" : "light";
  return `trelog_backup_${typeLabel}_${getTodayDateString()}.json`;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function dataUrlToFile(dataUrl, fileName, mimeType) {
  const [header, base64] = dataUrl.split(",");
  const detectedMimeType = mimeType || header.match(/data:(.*?);base64/)?.[1] || "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], fileName || "custom-trainer.png", { type: detectedMimeType });
}

async function getTrainerImagesBackupPayload(includeImageData) {
  const payload = getTrainerImagesMetaPayload();

  if (!includeImageData) {
    return payload;
  }

  await Promise.all(Object.keys(customTrainerSlots).map(async (slotKey) => {
    const slotImage = customTrainerImages[slotKey];
    if (slotImage?.blob) {
      payload[slotKey].dataUrl = await blobToDataUrl(slotImage.blob);
    }
  }));

  return payload;
}

async function buildBackupData(backupType = "light") {
  const includeImageData = backupType === "full";

  return {
    version: 2,
    backupType,
    exportedAt: new Date().toISOString(),
    app: "trelog",
    localStorage: {
      trelog_records: JSON.parse(localStorage.getItem(storageKey) || "[]"),
      trelog_state: JSON.parse(localStorage.getItem(stateStorageKey) || "null"),
      trelog_dev_scoring_config: JSON.parse(localStorage.getItem(devScoringConfigStorageKey) || "null")
    },
    trainerImages: await getTrainerImagesBackupPayload(includeImageData)
  };
}

function downloadJsonFile(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function exportBackupData(backupType) {
  const backupData = await buildBackupData(backupType);
  downloadJsonFile(getBackupFileName(backupType), backupData);
  backupStatus.textContent = backupType === "full"
    ? "完全バックアップを書き出しました。画像本体のData URLを含みます。"
    : "軽量バックアップを書き出しました。画像本体は含まれていません。";
  showMessage(`${backupType === "full" ? "完全" : "軽量"}バックアップJSONを書き出しました。`, true);
}

function restoreBackupLocalStorage(backupData) {
  const backupStorage = backupData?.localStorage;

  if (!backupStorage || backupData.app !== "trelog") {
    throw new Error("Invalid backup file.");
  }

  localStorage.setItem(storageKey, JSON.stringify(backupStorage.trelog_records || []));

  if (backupStorage.trelog_state) {
    localStorage.setItem(stateStorageKey, JSON.stringify(backupStorage.trelog_state));
  } else {
    localStorage.removeItem(stateStorageKey);
  }

  if (backupStorage.trelog_dev_scoring_config) {
    localStorage.setItem(devScoringConfigStorageKey, JSON.stringify(backupStorage.trelog_dev_scoring_config));
  } else {
    localStorage.removeItem(devScoringConfigStorageKey);
  }
}

async function restoreTrainerImagesFromBackup(backupData) {
  if (!backupData?.trainerImages) {
    return;
  }

  await Promise.all(Object.entries(backupData.trainerImages).map(async ([slotKey, imageData]) => {
    if (!customTrainerSlots[slotKey]) {
      return;
    }

    if (!imageData?.dataUrl) {
      return;
    }

    try {
      const file = dataUrlToFile(imageData.dataUrl, imageData.fileName, imageData.mimeType);
      await writeTrainerImageRecord(slotKey, file, imageData.savedAt || new Date().toISOString());
    } catch (error) {
      // Lightweight backups have no dataUrl, and broken image payloads should not block record restore.
    }
  }));
}

async function importBackupData(file) {
  if (!file) {
    return;
  }

  if (!window.confirm("現在の記録と設定を上書きします。続行しますか？")) {
    importBackupFile.value = "";
    return;
  }

  try {
    const backupData = JSON.parse(await file.text());
    restoreBackupLocalStorage(backupData);
    await restoreTrainerImagesFromBackup(backupData);
    records = loadRecords();
    appState = loadState();
    scoringConfig = loadScoringConfig();
    isDevScoringConfigActive = localStorage.getItem(devScoringConfigStorageKey) !== null;
    saveState();
    renderScoringConfigPanel();
    updateEvaluationProfileDisplay();
    applyMusicLoopSetting();
    renderHistory();
    updateAllStats();
    updateGoalRecommendation();
    await loadCustomTrainerImage();
    updateDebugStorageOutput();
    backupStatus.textContent = backupData.version === 2
      ? "バックアップJSONを読み込みました。画像Data URLがある差分は復元しました。"
      : "version 1バックアップを読み込みました。localStorage部分のみ復元しました。";
    showMessage("バックアップJSONを読み込みました。", true);
  } catch (error) {
    showMessage("バックアップJSONの読み込みに失敗しました。", false);
  } finally {
    importBackupFile.value = "";
  }
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
  if (clearAppCacheButton) {
    clearAppCacheButton.addEventListener("click", clearAppCachesAndReload);
  }
}

async function initializeApp() {
  records = loadRecords();
  appState = loadState();
  saveState();
  todayLabel.textContent = getTodayText();
  await loadCustomTrainerImage();
  updateTrainerImages({ home: "default", session: "cheer", result: "result" });
  applyMusicLoopSetting();
  updateAppVersionDisplay();
  setupDebugPanel();
  renderScoringConfigPanel();
  updateEvaluationProfileDisplay();
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
musicLoopToggle.addEventListener("change", handleMusicLoopChange);
sessionMusicLoopToggle.addEventListener("change", handleMusicLoopChange);
evaluationProfileSelect.addEventListener("change", handleEvaluationProfileChange);
scoreConfigFields.addEventListener("input", (event) => {
  if (event.target.classList.contains("score-config-input")) {
    updateScoringConfigFromInput(event.target);
  }
});
scorePreviewExercise.addEventListener("change", updateScorePreview);
scorePreviewMode.addEventListener("change", updateScorePreview);
scorePreviewAmount.addEventListener("input", updateScorePreview);
scorePreviewIntensity.addEventListener("change", updateScorePreview);
scorePreviewProfile.addEventListener("change", updateScorePreview);
copyScoreConfigButton.addEventListener("click", copyScoringConfigJson);
resetScoreConfigButton.addEventListener("click", resetDevScoringConfig);
customTrainerSlotElements.forEach((slotElement) => {
  slotElement.querySelector("[data-trainer-slot-input]").addEventListener("change", () => {
    handleCustomTrainerFileChange(slotElement);
  });
  slotElement.querySelector("[data-trainer-slot-apply]").addEventListener("click", () => {
    handleApplyCustomTrainerImage(slotElement);
  });
  slotElement.querySelector("[data-trainer-slot-delete]").addEventListener("click", () => {
    handleDeleteCustomTrainerImage(slotElement);
  });
});
deleteAllCustomTrainersButton.addEventListener("click", handleDeleteAllCustomTrainerImages);
exportLightBackupButton.addEventListener("click", () => {
  exportBackupData("light");
});
exportFullBackupButton.addEventListener("click", () => {
  exportBackupData("full");
});
importBackupFile.addEventListener("change", () => {
  importBackupData(importBackupFile.files[0]);
});
if (checkAppUpdateButton) {
  checkAppUpdateButton.addEventListener("click", checkForAppUpdate);
}
homeStartRecordButton.addEventListener("click", () => {
  switchView("record");
});
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
  sessionLineOverride = "";
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
customExerciseName.addEventListener("input", () => {
  updateRecordModeAvailability();
  updateGoalRecommendation();
});
recordAmountInput.addEventListener("input", updateGoalRecommendation);
recordTypeInputs.forEach((recordTypeInput) => {
  recordTypeInput.addEventListener("change", updateRecordUnit);
});
document.querySelectorAll('input[name="effort"]').forEach((effortInput) => {
  effortInput.addEventListener("change", () => {
    sessionLineOverride = "";
    updateGoalRecommendation();
  });
});
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.viewTarget);
  });
});

initializeApp();
