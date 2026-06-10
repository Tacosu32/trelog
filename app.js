const DEBUG_MODE = true;
const APP_VERSION = "0.9.0-dev";
const APP_BUILD_LABEL = "settings-accordion-2026-06-10";
const storageKey = "trelog_records";
const stateStorageKey = "trelog_state";
const devScoringConfigStorageKey = "trelog_dev_scoring_config";
const counselingStorageKey = "trelog_counseling";
const settingsSectionsStateKey = "trelog_settings_sections_state";
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
const DEFAULT_TRAINER_ID = "default";

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
const recentRestEventText = document.getElementById("recent-rest-event");
const calendarMonthLabel = document.getElementById("calendar-month-label");
const calendarPrevMonthButton = document.getElementById("calendar-prev-month");
const calendarNextMonthButton = document.getElementById("calendar-next-month");
const continuityCalendar = document.getElementById("continuity-calendar");
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
const counselingForm = document.getElementById("counseling-form");
const counselingExperience = document.getElementById("counseling-experience");
const counselingGoal = document.getElementById("counseling-goal");
const counselingWeeklyDays = document.getElementById("counseling-weekly-days");
const counselingSessionLength = document.getElementById("counseling-session-length");
const counselingStrictness = document.getElementById("counseling-strictness");
const generateCounselingButton = document.getElementById("generate-counseling-button");
const applyCounselingButton = document.getElementById("apply-counseling-button");
const discardCounselingButton = document.getElementById("discard-counseling-button");
const resetCounselingDefaultButton = document.getElementById("reset-counseling-default-button");
const counselingResult = document.getElementById("counseling-result");
const counselingStatus = document.getElementById("counseling-status");
const customTrainerStatus = document.getElementById("custom-trainer-status");
const customTrainerSlotElements = document.querySelectorAll("[data-trainer-slot]");
const deleteAllCustomTrainersButton = document.getElementById("delete-all-custom-trainers-button");
const exportLightBackupButton = document.getElementById("export-light-backup-button");
const exportFullBackupButton = document.getElementById("export-full-backup-button");
const importBackupFile = document.getElementById("import-backup-file");
const backupStatus = document.getElementById("backup-status");
const appVersionText = document.getElementById("app-version-text");
const appVersionFooter = document.getElementById("app-version-footer");
const settingsGoalScoreDisplay = document.getElementById("settings-goal-score-display");
const settingsBuildDisplay = document.getElementById("settings-build-display");
const settingsSectionDetails = document.querySelectorAll("[data-settings-section]");
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
const resultLevelChange = document.getElementById("result-level-change");
const resultExpBefore = document.getElementById("result-exp-before");
const resultExpGain = document.getElementById("result-exp-gain");
const resultExpAfter = document.getElementById("result-exp-after");
const resultExpGaugeFill = document.getElementById("result-exp-gauge-fill");
const resultExpGaugeLabel = document.getElementById("result-exp-gauge-label");
const resultBadgeList = document.getElementById("result-badge-list");
const resultBonusList = document.getElementById("result-bonus-list");
const resultOkButton = document.getElementById("result-ok-button");
const appViews = document.querySelectorAll(".app-view");
const navButtons = document.querySelectorAll(".nav-button");
const recordTypeInputs = document.querySelectorAll('input[name="record-type"]');
const homeTrainerLabel = document.getElementById("home-trainer-label");
const trainerSelect = document.getElementById("trainer-select");
const selectedTrainerName = document.getElementById("selected-trainer-name");
const selectedTrainerDescription = document.getElementById("selected-trainer-description");
const selectedTrainerTone = document.getElementById("selected-trainer-tone");
const selectedTrainerPreviewImage = document.getElementById("selected-trainer-preview-image");
const selectedTrainerStatus = document.getElementById("selected-trainer-status");
const customImagePriorityNote = document.getElementById("custom-image-priority-note");
const applyTrainerButton = document.getElementById("apply-trainer-button");

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
const COUNSELING_GOAL_LABELS = {
  continuity: "継続重視",
  diet: "ダイエット",
  strength: "筋力アップ",
  stamina: "体力作り",
  habit: "軽い習慣化"
};
const COUNSELING_WEEKLY_DAY_LABELS = {
  "1-2": "1〜2日",
  "3-4": "3〜4日",
  "5+": "5日以上"
};
const COUNSELING_SESSION_LENGTH_LABELS = {
  3: "3分",
  5: "5分",
  10: "10分",
  15: "15分以上"
};
const COUNSELING_STRICTNESS_LABELS = {
  loose: "ゆるめに評価してほしい",
  standard: "標準",
  strict: "厳しめに評価してほしい"
};
const COUNSELING_EXERCISE_IDS = ["pushup", "abs", "squat", "plank", "stretch"];
const COUNSELING_GUIDE_AMOUNTS = {
  pushup: { time: 5, reps: 20 },
  abs: { time: 5, reps: 30 },
  squat: { time: 5, reps: 60 },
  plank: { time: 1, reps: 0 },
  stretch: { time: 5, reps: 0 }
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

const HOME_TRAINER_LINES = {
  recentRestTicketUsed: () => "休憩チケットで継続を守った日があるよ。無理しすぎず、今日は軽めにいこう。",
  goalReached: () => "今日の目標達成済み！ちゃんと積み上げられてるね。あとは気持ちよく締めよう。",
  almostGoal: () => "あと少しで今日の目標に届くよ。もう1セットいけそう？",
  noTodayRecordNight: () => "今日の分、まだ間に合うよ。短くても記録しておこう？",
  noTodayRecord: () => "今日はまだ記録がないみたい。まずは1セットだけでもどう？",
  noRestTickets: () => "休憩チケットが0枚だよ。今日は短めでいいから、継続を守りにいこう。",
  lowRestTickets: () => "休憩チケットが少なめだよ。無理なく動いて、安心できる余裕を戻そう。",
  streakProtected: ({ streakDays }) => `${streakDays}日連続、カレンダーでも守れてるよ。この流れ、今日も少しだけつなごう。`,
  streakGrowing: ({ streakDays }) => `${streakDays}日連続で伸びてるよ。積み上げが見えてきたね。`,
  morning: () => "おはよう！今日は軽めでもいいから、まずは体を動かしてみよ？",
  afternoon: () => "ここで少し動けたら、午後もいい感じに進められそうだよ。",
  night: () => "夜でも短い記録ならいけるよ。今日の自分に小さく丸をつけよう。",
  default: () => "準備できたら、好きな音楽を流して始めよう。今日は軽めでも続けたら勝ちだよ。"
};

const RESULT_TRAINER_LINES = {
  reward: () => "休憩チケット獲得！がんばった分、休める日もちゃんと守れるよ。",
  levelUp: () => "レベルアップ！積み重ねが形になってきたよ。",
  goalReached: () => "今日の目標達成！しっかりやり切れたね。",
  alreadyGoalReached: () => "今日の目標はもう達成済みだよ。さらに積めたの、すごくいいね。",
  lowIntensity: () => "軽めでも続けたのがえらいよ。今日の流れ、ちゃんと守れたね。",
  highIntensity: () => "かなり追い込めたね。休憩も忘れずに！",
  default: () => "記録できたよ。今日の積み上げ、ちゃんと残ったね。"
};

const TRAINER_PRESETS = {
  default: {
    id: "default",
    name: "ミナ",
    description: "やさしい標準トレーナー。毎日の小さな積み上げを明るく応援します。",
    toneType: "明るく優しい",
    images: {
      default: "assets/trainer/public/presets/mina/default.png",
      cheer: "assets/trainer/public/presets/mina/cheer.png",
      result: "assets/trainer/public/presets/mina/result.png",
      rest: "assets/trainer/public/presets/mina/rest.png"
    },
    lines: {
      home: {
        morning: () => "おはよう！朝のうちに少しだけ、一緒に体を起こしてみよ？",
        afternoon: () => "お昼のすきまに少し動けたら、今日の流れが作れそうだよ。",
        night: () => "夜でも短めなら大丈夫。今日の自分に小さく丸をつけよう。",
        noTodayRecord: () => "今日はまだ記録がないみたい。まずは少しだけ、一緒に動いてみよ？",
        noTodayRecordNight: () => "今日の分、まだ間に合うよ。1セットだけでも一緒に残しておこう？",
        todayRecorded: () => "今日の記録、ちゃんと残ってるよ。余裕があればもう少しだけ積んでみよ。",
        goalReached: () => "今日の目標達成済み！ちゃんと積み上がってるね。",
        almostGoal: () => "今日の目標まであと少しだよ。無理ない範囲で、もう1セット一緒にいこう。",
        noRestTickets: () => "休憩チケットが0枚だよ。今日は少しだけでも動いて、継続を守ろうね。",
        lowRestTickets: () => "休憩チケットが少なめだよ。無理しすぎず、できる分を大事にしよう。",
        recentRestTicketUsed: () => "休憩チケットで継続を守った日があるよ。今日は軽めに戻していこう。",
        streakProtected: ({ streakDays }) => `${streakDays}日連続、ちゃんと守れてるよ。この調子で少しずつ続けようね。`,
        streakGrowing: ({ streakDays }) => `${streakDays}日連続で伸びてるよ。一緒にここまで来られてうれしいな。`
      },
      session: {
        sessionStart: ({ exerciseName }) => `${exerciseName || "この種目"}、いこう。無理なく一緒に進めようね。`,
        elapsed10: () => "10秒できたよ。呼吸を止めずに、そのまま少しだけ続けよう。",
        elapsed30: () => "30秒通過！いい感じだよ。フォームを小さく整えていこう。",
        elapsed60: () => "1分到達！ここまで来られたの、ちゃんと力になってるよ。",
        paused: () => "少し休憩しよっか。呼吸を整えたら、また一緒に再開しようね。",
        resumed: () => "よし、再開だね。無理しすぎず、でも少しずつ積み上げよ？",
        highIntensity: () => "今日はしっかり頑張る日だね。きつい分、休憩も大事にしよう。",
        lowIntensity: () => "軽めでも続けてるのがえらいよ。休みながら、今日の流れを守ろう。",
        projectedGoalReached: () => "このまま記録すると今日の目標達成だよ。最後まで一緒にいこう。",
        repsInput: ({ sessionReps }) => `${sessionReps}回、入力できたよ。きれいに記録へ残そう。`
      },
      result: {
        default: () => "記録できたよ。ちゃんと積み上がってるね。",
        goalReached: () => "今日の目標達成！しっかりやり切れたね。",
        alreadyGoalReached: () => "今日の目標はもう達成済みだよ。さらに積めたの、すごくいいね。",
        levelUp: () => "レベルアップ！積み重ねが形になってきたよ。",
        reward: () => "休憩チケット獲得！がんばった分、休める日もちゃんと守れるよ。",
        lowIntensity: () => "軽めでも続けたのがえらいよ。今日の流れ、ちゃんと守れたね。",
        highIntensity: () => "かなり頑張れたね。終わったあとは休憩も忘れずにね。",
        highScore: () => "高スコア記録だよ！今日の頑張り、しっかり残ったね。"
      },
      rest: {
        usedDay: () => "休憩チケットを使った日があるよ。休む日も、続ける力の一部だね。",
        autoUsed: () => "休憩チケットで継続は守れたよ。今日は軽めでも大丈夫だから、少し動いてみよ？",
        protected: () => "休憩チケットで継続は守れたよ。今日は少しだけ、一緒に戻していこう。",
        missedWarning: () => "未記録の日が近いみたい。短くてもいいから、今日の記録を残そうね。",
        streakGrew: ({ streakDays }) => `${streakDays}日連続に伸びたよ。少しずつでも続けてるの、すごいよ。`
      }
    }
  },
  trainer_calm: {
    id: "trainer_calm",
    name: "レイカ",
    description: "まじめ系トレーナー。落ち着いた声かけで、継続を丁寧に支えます。",
    toneType: "落ち着いていて丁寧",
    images: {
      default: "assets/trainer/public/presets/reika/default.png",
      cheer: "assets/trainer/public/presets/reika/cheer.png",
      result: "assets/trainer/public/presets/reika/result.png",
      rest: "assets/trainer/public/presets/reika/rest.png"
    },
    lines: {
      home: {
        morning: () => "おはようございます。朝の短い運動から、無理なく始めましょう。",
        afternoon: () => "午後の前に少し体を動かすと、記録の流れを作りやすくなります。",
        night: () => "夜の時間帯です。短時間でも構いませんので、記録を整えておきましょう。",
        noTodayRecord: () => "本日はまだ記録がありません。短時間でも開始してみましょう。",
        noTodayRecordNight: () => "本日はまだ記録がありません。遅い時間ですので、軽めの内容にしましょう。",
        todayRecorded: () => "本日の記録は保存されています。余裕があれば、追加で整えていきましょう。",
        goalReached: () => "本日の目標は達成済みです。良い継続ができています。",
        almostGoal: () => "目標まであと少しです。無理のない範囲で仕上げましょう。",
        noRestTickets: () => "休憩チケットがありません。本日は短時間でも記録を残すことを優先しましょう。",
        lowRestTickets: () => "休憩チケットが少なくなっています。負荷を調整して継続を保ちましょう。",
        recentRestTicketUsed: () => "休憩チケットで継続を保てています。本日は軽めの再開で十分です。",
        streakProtected: ({ streakDays }) => `${streakDays}日連続で継続中です。現在の流れを丁寧に維持しましょう。`,
        streakGrowing: ({ streakDays }) => `連続記録が${streakDays}日まで伸びています。安定した積み上げです。`
      },
      session: {
        sessionStart: ({ exerciseName }) => `${exerciseName || "この種目"}を開始しましょう。フォームを大切に進めます。`,
        elapsed10: () => "10秒経過しました。呼吸と姿勢を確認しましょう。",
        elapsed30: () => "30秒経過です。ペースを保てています。",
        elapsed60: () => "60秒経過しました。ここまでの継続は十分評価できます。",
        paused: () => "一時停止しました。呼吸と姿勢を整えてから、再開しましょう。",
        resumed: () => "再開します。無理のない範囲で、フォームを意識してください。",
        projectedGoalReached: () => "この記録で本日の目標に届く見込みです。最後まで丁寧に進めましょう。",
        highIntensity: () => "負荷が高めです。姿勢と休憩を意識してください。",
        lowIntensity: () => "軽めの負荷でも、休息を挟んだ継続として十分価値があります。",
        repsInput: ({ sessionReps }) => `${sessionReps}回の入力を確認しました。内容を確認して保存しましょう。`
      },
      result: {
        default: () => "記録が保存されました。継続できています。",
        goalReached: () => "本日の目標を達成しました。良い積み上げです。",
        alreadyGoalReached: () => "本日の目標は達成済みです。追加の記録として良い内容です。",
        levelUp: () => "レベルアップです。継続の成果が確認できます。",
        reward: () => "5レベル報酬として休憩チケットを獲得しました。計画的に活用しましょう。",
        lowIntensity: () => "軽めの記録です。無理をしない継続として適切です。",
        highIntensity: () => "高い負荷の記録です。回復時間も確保してください。",
        highScore: () => "高スコア記録です。現在の取り組みは良い状態です。"
      },
      rest: {
        usedDay: () => "休憩チケット使用日があります。休息も継続計画の一部です。",
        autoUsed: () => "休憩チケットにより継続は維持されています。本日は短時間でも記録を残しましょう。",
        protected: () => "休憩チケットにより継続は維持されています。焦らず短時間から戻しましょう。",
        missedWarning: () => "未記録に注意が必要です。本日は短時間の記録を優先しましょう。",
        streakGrew: ({ streakDays }) => `継続日数が${streakDays}日まで伸びました。安定しています。`
      }
    }
  },
  trainer_energy: {
    id: "trainer_energy",
    name: "アカリ",
    description: "熱血系トレーナー。元気な声かけで、最初の一歩を強く後押しします。",
    toneType: "元気に背中を押す",
    images: {
      default: "assets/trainer/public/presets/akari/default.png",
      cheer: "assets/trainer/public/presets/akari/cheer.png",
      result: "assets/trainer/public/presets/akari/result.png",
      rest: "assets/trainer/public/presets/akari/rest.png"
    },
    lines: {
      home: {
        morning: () => "おはよう！朝から1セット決めたら、今日はいい流れだよ！",
        afternoon: () => "ここで動けたら強い！午後の勢い、作っていこう！",
        night: () => "夜でもまだいける！短くても今日の記録を取りにいこう！",
        noTodayRecord: () => "今日はまだだね！まず1セット、気合い入れていこう！",
        noTodayRecordNight: () => "今日はまだだね！遅くても1セットならいける、いこう！",
        todayRecorded: () => "今日の記録は入ってるよ！余力があればもう一押しだ！",
        goalReached: () => "今日の目標クリア！いい勢いで積み上がってるよ！",
        almostGoal: () => "あと少し！ここで決めたらかなり熱いよ！",
        noRestTickets: () => "休憩チケット0枚！今日は短くても継続を守りにいこう！",
        lowRestTickets: () => "休憩チケット少なめ！攻めすぎず、でも流れは切らさないよ！",
        recentRestTicketUsed: () => "休憩チケットで継続キープできてる！今日は軽く動いて復帰だ！",
        streakProtected: ({ streakDays }) => `${streakDays}日連続キープ中！この勢い、今日もつなごう！`,
        streakGrowing: ({ streakDays }) => `${streakDays}日連続まで伸びた！いいぞ、その調子！`
      },
      session: {
        sessionStart: ({ exerciseName }) => `${exerciseName || "この種目"}、スタート！いい流れ作っていこう！`,
        elapsed10: () => "10秒突破！いい入りだよ、そのままいこう！",
        elapsed30: () => "30秒通過！ここからもう一段、粘っていこう！",
        elapsed60: () => "60秒到達！強い！最後まで勢い切らさずいこう！",
        paused: () => "よし、いったん休憩！ここで呼吸を整えて、もう一回いくよ！",
        resumed: () => "再開だ！ここからもうひと踏ん張り、いこう！",
        projectedGoalReached: () => "このままいけば目標達成！ラストまで押し切ろう！",
        highIntensity: () => "いい負荷だね！でもフォームは崩さずいこう！",
        lowIntensity: () => "軽めでも前進！休みながらでも、流れを戻せば勝ちだよ！",
        repsInput: ({ sessionReps }) => `${sessionReps}回入った！この記録、しっかり残そう！`
      },
      result: {
        default: () => "ナイス記録！この調子で積み上げていこう！",
        goalReached: () => "今日の目標達成！やり切ったね、最高！",
        alreadyGoalReached: () => "目標達成後も積めた！その追加分、かなり熱いよ！",
        levelUp: () => "レベルアップ！積み重ねが爆発してきたよ！",
        reward: () => "5レベル報酬ゲット！休憩チケット獲得だ、やったね！",
        lowIntensity: () => "軽めの記録でも勝ち！継続の炎は消えてないよ！",
        highIntensity: () => "高負荷記録、いいね！今日はしっかり回復までセットだよ！",
        highScore: () => "高スコア記録！今日の一撃、ばっちり決まったね！"
      },
      rest: {
        usedDay: () => "休憩チケット使用日あり！休む判断も次に進む力だよ！",
        autoUsed: () => "休憩チケットで踏ん張ったね！今日は軽くでもいいから、流れを戻していこう！",
        protected: () => "休憩チケットで踏ん張ったね！ここからまた流れを戻していこう！",
        missedWarning: () => "未記録注意！今ならまだ間に合う、1セットいこう！",
        streakGrew: ({ streakDays }) => `${streakDays}日連続に伸びた！この勢い、最高だよ！`
      }
    }
  }
};

let records = [];
let appState = getDefaultState();
let scoringConfig = loadScoringConfig();
let isDevScoringConfigActive = localStorage.getItem(devScoringConfigStorageKey) !== null;
let calendarMonthDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedMusicUrl = "";
let timerState = "idle";
let elapsedSeconds = 0;
let timerId = null;
let sessionLineOverride = "";
let customTrainerImages = {};
let pendingCustomTrainerFiles = {};
let currentCounselingRecommendation = null;
let resultAnimationTimers = [];
const trainerImagePaths = {
  default: "assets/trainer/public/trainer_default.png",
  cheer: "assets/trainer/public/trainer_cheer.png",
  result: "assets/trainer/public/trainer_result.png",
  rest: "assets/trainer/public/trainer_rest.png"
};

function getTrainerId(trainerId) {
  return TRAINER_PRESETS[trainerId] ? trainerId : DEFAULT_TRAINER_ID;
}

function getSelectedTrainerId() {
  return getTrainerId(appState.selectedTrainerId);
}

function getSelectedTrainer() {
  return TRAINER_PRESETS[getSelectedTrainerId()];
}

function getTrainerLineGroup(groupName, baseLines = {}) {
  const trainerLines = getSelectedTrainer().lines?.[groupName] || {};
  return { ...baseLines, ...trainerLines };
}

function hasCustomTrainerImages() {
  return Object.keys(customTrainerImages).length > 0;
}

function getPresetTrainerImageCandidates(context, trainer = getSelectedTrainer()) {
  const presetPath = trainer.images?.[context];
  const fallbackPath = trainerImagePaths[context] || trainerImagePaths.default;
  return Array.from(new Set([
    presetPath,
    context === "default" ? null : trainer.images?.default,
    fallbackPath,
    context === "default" ? null : trainerImagePaths.default
  ].filter(Boolean)));
}

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
  renderTrainerSelectionPanel();
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

  if (customImagePriorityNote) {
    const hasCustomImages = hasCustomTrainerImages();
    customImagePriorityNote.textContent = hasCustomImages
      ? "カスタム画像が設定されているため、画像はカスタム画像が優先表示されています。トレーナーを切り替えると、名前・説明・口調・セリフが変わります。プリセット画像に戻す場合は、下の画像設定で削除 / デフォルトに戻すか、すべてデフォルトに戻してください。"
      : "プリセット画像を表示しています。カスタム画像を設定すると、画像だけカスタム差分が優先されます。";
    customImagePriorityNote.classList.toggle("active", hasCustomImages);
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
  const presetCandidates = getPresetTrainerImageCandidates(context);

  return [...customCandidates, ...presetCandidates, ...publicCandidates];
}

function setTrainerImage(imageElement, context) {
  if (!imageElement) {
    return;
  }

  const customImageKey = Object.values(customTrainerImages)
    .map((slotImage) => slotImage.url)
    .join("|");
  const trainerKey = getSelectedTrainerId();

  if (
    imageElement.dataset.trainerContext === context
    && imageElement.dataset.trainerCustomImageUrl === customImageKey
    && imageElement.dataset.trainerPresetId === trainerKey
  ) {
    return;
  }

  imageElement.dataset.trainerContext = context;
  imageElement.dataset.trainerCustomImageUrl = customImageKey;
  imageElement.dataset.trainerPresetId = trainerKey;
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

function setPresetTrainerPreviewImage(imageElement, trainerId, context = "default") {
  if (!imageElement) {
    return;
  }

  const trainer = TRAINER_PRESETS[getTrainerId(trainerId)];

  if (
    imageElement.dataset.trainerPreviewId === trainer.id
    && imageElement.dataset.trainerPreviewContext === context
  ) {
    return;
  }

  imageElement.dataset.trainerPreviewId = trainer.id;
  imageElement.dataset.trainerPreviewContext = context;
  const visual = imageElement.closest(".trainer-visual");
  const candidates = getPresetTrainerImageCandidates(context, trainer);
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

function updateTrainerSelectionPreview(trainerId = getSelectedTrainerId()) {
  if (!selectedTrainerName || !trainerSelect) {
    return;
  }

  const trainer = TRAINER_PRESETS[getTrainerId(trainerId)];
  selectedTrainerName.textContent = trainer.name;
  selectedTrainerTone.textContent = `口調: ${trainer.toneType}`;
  selectedTrainerDescription.textContent = trainer.description;
  selectedTrainerStatus.textContent = `選択中: ${getSelectedTrainer().name}`;
  setPresetTrainerPreviewImage(selectedTrainerPreviewImage, trainer.id, "default");
}

function renderTrainerSelectionPanel() {
  if (!trainerSelect) {
    return;
  }

  const selectedTrainerId = getSelectedTrainerId();
  trainerSelect.innerHTML = Object.values(TRAINER_PRESETS)
    .map((trainer) => `<option value="${trainer.id}">${trainer.name} / ${trainer.toneType}</option>`)
    .join("");
  trainerSelect.value = selectedTrainerId;
  updateTrainerSelectionPreview(selectedTrainerId);
}

function applySelectedTrainer() {
  const trainerId = getTrainerId(trainerSelect.value);
  appState.selectedTrainerId = trainerId;
  saveState();
  renderTrainerSelectionPanel();
  updateTrainerImages({
    home: "default",
    session: timerState === "paused" ? "rest" : "cheer",
    result: "result"
  });
  updateAllStats();
  updateSessionDisplay();
  updateDebugStorageOutput();
  showMessage(`${getSelectedTrainer().name}をトレーナーに設定しました。`, true);
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

function parseDateString(dateText) {
  const parts = String(dateText || "").split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function isValidDateString(dateText) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(dateText || ""));
}

function getEarliestContinuityDate() {
  const dates = [...getRecordedDateSet(), ...getRestDateSet()].filter(isValidDateString).sort();
  return dates[0] || null;
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
  const lines = getTrainerLineGroup("session", TRAINER_LINES);

  if (context.sessionState === "paused") {
    return lines.paused(context);
  }

  if (context.projectedGoalReached) {
    return lines.projectedGoalReached(context);
  }

  if (context.mode === "reps" && Number(context.sessionReps || 0) > 0) {
    return lines.repsInput(context);
  }

  if (context.elapsedSeconds >= 60) {
    return lines.elapsed60(context);
  }

  if (context.elapsedSeconds >= 30) {
    return lines.elapsed30(context);
  }

  if (context.elapsedSeconds >= 10) {
    return lines.elapsed10(context);
  }

  if (Number(context.intensity || 0) >= 4) {
    return lines.highIntensity(context);
  }

  if (Number(context.intensity || 0) <= 2) {
    return lines.lowIntensity(context);
  }

  return lines.sessionStart(context);
}

function getRecentRestTicketEvent(dayRange = 2) {
  const today = getTodayDateString();
  const fromDate = addDays(today, -dayRange);

  return appState.restTicketEvents
    .filter((event) => event.type === "auto-used" && event.date >= fromDate && event.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))[0] || null;
}

function getCalendarStatus() {
  const today = getTodayDateString();
  const yesterday = addDays(today, -1);
  const continuityDates = getContinuityDateSet();

  return {
    todayProtected: continuityDates.has(today),
    yesterdayProtected: continuityDates.has(yesterday),
    streakProtected: continuityDates.has(today) || continuityDates.has(yesterday)
  };
}

function getHomeTrainerLine(context) {
  const lines = getTrainerLineGroup("home", HOME_TRAINER_LINES);

  if (context.recentRestTicketUsed) {
    return lines.recentRestTicketUsed(context);
  }

  if (context.goalReached) {
    return lines.goalReached(context);
  }

  if (context.todayScore > 0 && context.todayScore >= context.dailyGoalScore * 0.75) {
    return lines.almostGoal(context);
  }

  if (context.restTickets <= 0) {
    return lines.noRestTickets(context);
  }

  if (context.restTickets <= 1) {
    return lines.lowRestTickets(context);
  }

  if (!context.hasTodayRecord) {
    if (context.currentHour < 11) {
      return lines.morning(context);
    }

    if (context.currentHour < 18) {
      return lines.afternoon(context);
    }

    return lines.noTodayRecordNight(context);
  }

  if (context.streakDays >= 2 && context.calendarStatus.streakProtected) {
    return lines.streakProtected(context);
  }

  if (context.streakDays >= 1) {
    return lines.streakGrowing(context);
  }

  if (context.hasTodayRecord) {
    return lines.todayRecorded(context);
  }

  if (context.currentHour < 11) {
    return lines.morning(context);
  }

  if (context.currentHour < 18) {
    return lines.afternoon(context);
  }

  if (context.currentHour >= 18) {
    return lines.night(context);
  }

  return lines.default(context);
}

function buildHomeTrainerContext() {
  const today = getTodayDateString();
  const todayScore = calculateTodayScore();
  const dailyGoalScore = getDailyGoalScore();
  const hasTodayRecord = records.some((record) => record.date === today);

  return {
    currentHour: new Date().getHours(),
    todayScore,
    dailyGoalScore,
    goalReached: todayScore >= dailyGoalScore,
    hasTodayRecord,
    streakDays: calculateStreakDays(),
    restTickets: appState.restTickets,
    recentRestTicketUsed: Boolean(getRecentRestTicketEvent(2)),
    calendarStatus: getCalendarStatus()
  };
}

function updateHomeTrainerComment() {
  if (homeTrainerLabel) {
    homeTrainerLabel.textContent = `今日の案内役: ${getSelectedTrainer().name}`;
  }
  trainerComment.textContent = getHomeTrainerLine(buildHomeTrainerContext());
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
  updateTrainerComment(getTrainerLine({
    sessionState: timerState,
    elapsedSeconds,
    exerciseName: getSelectedExercise(),
    mode: getRecordType(),
    intensity: getSelectedEffort(),
    sessionReps: sessionRepsInput.value,
    projectedGoalReached: false
  }));
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
  sessionLineOverride = getTrainerLineGroup("session", TRAINER_LINES).paused({});
  startWorkoutButton.textContent = "再開";
  sessionPauseButton.textContent = "再開";
  updateTrainerComment(sessionLineOverride);
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
    setTemporarySessionLine(getTrainerLineGroup("session", TRAINER_LINES).resumed({}));
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
  setTemporarySessionLine(getTrainerLineGroup("session", TRAINER_LINES).resumed({}));
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
  updateTrainerComment(getTrainerLineGroup("rest", {}).missedWarning?.({}) || "セッションをキャンセルしたよ。準備が整ったらまた始めよう。");
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function roundConfigNumber(value, digits = 2) {
  return Number(Number(value).toFixed(digits));
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getCheckedCounselingMenuValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map((input) => input.value)
    .filter((exerciseId) => COUNSELING_EXERCISE_IDS.includes(exerciseId));
}

function buildCounselingAnswers() {
  return {
    experience: counselingExperience.value,
    goal: counselingGoal.value,
    weeklyDays: counselingWeeklyDays.value,
    sessionLength: counselingSessionLength.value,
    strictness: counselingStrictness.value,
    goodMenus: getCheckedCounselingMenuValues("counseling-good-menu"),
    weakMenus: getCheckedCounselingMenuValues("counseling-weak-menu")
  };
}

function getDefaultCounselingAnswers() {
  return {
    experience: "beginner",
    goal: "continuity",
    weeklyDays: "3-4",
    sessionLength: "5",
    strictness: "standard",
    goodMenus: [],
    weakMenus: []
  };
}

function setCounselingFormAnswers(answers = getDefaultCounselingAnswers()) {
  counselingExperience.value = answers.experience || "beginner";
  counselingGoal.value = answers.goal || "continuity";
  counselingWeeklyDays.value = answers.weeklyDays || "3-4";
  counselingSessionLength.value = answers.sessionLength || "5";
  counselingStrictness.value = answers.strictness || "standard";

  document.querySelectorAll('input[name="counseling-good-menu"], input[name="counseling-weak-menu"]').forEach((input) => {
    const values = input.name === "counseling-good-menu"
      ? answers.goodMenus || []
      : answers.weakMenus || [];
    input.checked = values.includes(input.value);
  });
}

function shiftEvaluationProfile(profile, direction) {
  const profileOrder = ["beginner", "standard", "experienced", "hard"];
  const currentIndex = profileOrder.indexOf(profile);
  const safeIndex = currentIndex === -1 ? 1 : currentIndex;
  return profileOrder[clampNumber(safeIndex + direction, 0, profileOrder.length - 1)];
}

function chooseCounselingProfile(answers) {
  let profile = evaluationProfiles[answers.experience] ? answers.experience : "standard";

  if (answers.goal === "continuity" || answers.goal === "habit") {
    profile = shiftEvaluationProfile(profile, -1);
  }

  if (answers.goal === "strength") {
    profile = shiftEvaluationProfile(profile, 1);
  }

  if (answers.strictness === "loose") {
    profile = shiftEvaluationProfile(profile, -1);
  }

  if (answers.strictness === "strict") {
    profile = shiftEvaluationProfile(profile, 1);
  }

  return profile;
}

function calculateCounselingDailyGoal(answers) {
  const sessionGoalMap = {
    3: 70,
    5: 100,
    10: 150,
    15: 200
  };
  const weeklyAdjustments = {
    "1-2": -10,
    "3-4": 0,
    "5+": 20
  };
  const goalAdjustments = {
    continuity: -5,
    diet: 10,
    strength: 20,
    stamina: 10,
    habit: -20
  };
  const strictnessAdjustments = {
    loose: -5,
    standard: 0,
    strict: 10
  };
  const baseGoal = sessionGoalMap[answers.sessionLength] || 100;
  const rawGoal = baseGoal
    + (weeklyAdjustments[answers.weeklyDays] || 0)
    + (goalAdjustments[answers.goal] || 0)
    + (strictnessAdjustments[answers.strictness] || 0);

  return Math.round(clampNumber(rawGoal, 60, 240));
}

function getCounselingCoefficientScale(answers) {
  const experienceScale = {
    beginner: 1.1,
    standard: 1,
    experienced: 0.9,
    hard: 0.78
  };
  const goalScale = {
    continuity: 1.15,
    diet: 1.05,
    strength: 0.95,
    stamina: 1,
    habit: 1.2
  };
  const strictnessScale = {
    loose: 1.12,
    standard: 1,
    strict: 0.9
  };
  const shortSessionScale = answers.sessionLength === "3" ? 1.08 : 1;

  return (experienceScale[answers.experience] || 1)
    * (goalScale[answers.goal] || 1)
    * (strictnessScale[answers.strictness] || 1)
    * shortSessionScale;
}

function buildRecommendationConfig(answers, profile) {
  const recommendedConfig = cloneScoringConfig(DEFAULT_SCORING_CONFIG);
  const coefficientScale = getCounselingCoefficientScale(answers);

  recommendedConfig.dailyGoalScore = calculateCounselingDailyGoal(answers);

  Object.keys(recommendedConfig.exerciseCoefficients).forEach((exerciseId) => {
    let exerciseScale = coefficientScale;

    if (answers.goodMenus.includes(exerciseId)) {
      exerciseScale *= 0.92;
    }

    if (answers.weakMenus.includes(exerciseId)) {
      exerciseScale *= 1.16;
    }

    recommendedConfig.exerciseCoefficients[exerciseId].time = roundConfigNumber(
      DEFAULT_SCORING_CONFIG.exerciseCoefficients[exerciseId].time * exerciseScale,
      1
    );
    recommendedConfig.exerciseCoefficients[exerciseId].reps = roundConfigNumber(
      DEFAULT_SCORING_CONFIG.exerciseCoefficients[exerciseId].reps * exerciseScale,
      1
    );
  });

  if (profile === "beginner" && answers.sessionLength === "5") {
    const squatAdjustment = (answers.weakMenus.includes("squat") ? 1.12 : 1)
      * (answers.goodMenus.includes("squat") ? 0.92 : 1);
    recommendedConfig.exerciseCoefficients.squat.time = roundConfigNumber(16.7 * squatAdjustment, 1);
    recommendedConfig.exerciseCoefficients.squat.reps = roundConfigNumber(1.4 * squatAdjustment, 1);
  }

  if (answers.strictness === "loose") {
    recommendedConfig.intensityMultipliers = { 1: 0.9, 2: 1, 3: 1.08, 4: 1.16, 5: 1.25 };
  }

  if (answers.strictness === "strict") {
    recommendedConfig.intensityMultipliers = { 1: 0.7, 2: 0.85, 3: 1, 4: 1.15, 5: 1.35 };
  }

  return normalizeScoringConfig(recommendedConfig);
}

function calculateRecommendationScore(config, exerciseId, mode, amount, intensity = 3, profile = "standard") {
  const coefficient = Number(config.exerciseCoefficients[exerciseId]?.[mode] || 0);
  const intensityMultiplier = Number(config.intensityMultipliers[intensity] || 1);
  const profileMultiplier = Number(config.evaluationProfileMultipliers[profile] || 1);
  return Math.round(Number(amount) * coefficient * intensityMultiplier * profileMultiplier);
}

function getCounselingTimeLabel(exerciseId, minutes) {
  if (exerciseId === "plank" && minutes === 1) {
    return "60秒";
  }

  return `${minutes}分`;
}

function buildRecommendationGuides(config, profile) {
  return COUNSELING_EXERCISE_IDS.map((exerciseId) => {
    const definition = EXERCISE_DEFINITIONS[exerciseId];
    const amounts = COUNSELING_GUIDE_AMOUNTS[exerciseId];
    const timeScore = amounts.time > 0
      ? calculateRecommendationScore(config, exerciseId, "time", amounts.time, 3, profile)
      : 0;
    const repsScore = amounts.reps > 0
      ? calculateRecommendationScore(config, exerciseId, "reps", amounts.reps, 3, profile)
      : 0;
    const timeCoefficient = Number(config.exerciseCoefficients[exerciseId].time || 0);
    const repsCoefficient = Number(config.exerciseCoefficients[exerciseId].reps || 0);
    const profileMultiplier = Number(config.evaluationProfileMultipliers[profile] || 1);
    const intensityMultiplier = Number(config.intensityMultipliers[3] || 1);
    const timeForGoal = timeCoefficient > 0
      ? Math.ceil(100 / (timeCoefficient * intensityMultiplier * profileMultiplier))
      : null;
    const repsForGoal = repsCoefficient > 0
      ? Math.ceil(100 / (repsCoefficient * intensityMultiplier * profileMultiplier))
      : null;

    return {
      exerciseId,
      exerciseName: definition.name,
      timeText: amounts.time > 0 ? `${getCounselingTimeLabel(exerciseId, amounts.time)}で約${timeScore}pt` : "",
      repsText: amounts.reps > 0 ? `${amounts.reps}回で約${repsScore}pt` : "",
      goalText: [
        timeForGoal ? `${timeForGoal}分で約100pt` : "",
        repsForGoal ? `${repsForGoal}回で約100pt` : ""
      ].filter(Boolean).join(" / ")
    };
  });
}

function buildCounselingTrainerComment(answers, profile) {
  if (answers.goal === "continuity" || answers.goal === "habit") {
    return "まずは続けやすさ重視で調整したよ。慣れてきたら少しずつ厳しめにしていこう！";
  }

  if (answers.goal === "strength" || profile === "hard") {
    return "しっかり積み上げたい方向けに、少し手応えが出る設定にしたよ。フォーム優先でいこう！";
  }

  if (answers.goal === "diet") {
    return "消費量を意識しつつ、毎日戻ってきやすい点数にしたよ。短めでも記録して流れを作ろう！";
  }

  return "体力作りに向けて、無理なく伸ばせる設定にしたよ。今日はできる範囲から始めよう！";
}

function generateScoringRecommendation(answers) {
  const normalizedAnswers = { ...getDefaultCounselingAnswers(), ...answers };
  const profile = chooseCounselingProfile(normalizedAnswers);
  const config = buildRecommendationConfig(normalizedAnswers, profile);

  return {
    generatedAt: new Date().toISOString(),
    answers: normalizedAnswers,
    evaluationProfile: profile,
    dailyGoalScore: config.dailyGoalScore,
    intensityMultipliers: cloneScoringConfig(config.intensityMultipliers),
    evaluationProfileMultipliers: cloneScoringConfig(config.evaluationProfileMultipliers),
    exerciseCoefficients: cloneScoringConfig(config.exerciseCoefficients),
    scoringConfig: config,
    guides: buildRecommendationGuides(config, profile),
    trainerComment: buildCounselingTrainerComment(normalizedAnswers, profile)
  };
}

function normalizeScoringRecommendation(recommendation) {
  if (!recommendation || typeof recommendation !== "object") {
    return null;
  }

  const answers = { ...getDefaultCounselingAnswers(), ...(recommendation.answers || {}) };
  const config = normalizeScoringConfig(recommendation.scoringConfig || {
    dailyGoalScore: recommendation.dailyGoalScore,
    intensityMultipliers: recommendation.intensityMultipliers,
    evaluationProfileMultipliers: recommendation.evaluationProfileMultipliers,
    exerciseCoefficients: recommendation.exerciseCoefficients
  });
  const profile = evaluationProfiles[recommendation.evaluationProfile]
    ? recommendation.evaluationProfile
    : chooseCounselingProfile(answers);

  return {
    generatedAt: recommendation.generatedAt || new Date().toISOString(),
    answers,
    evaluationProfile: profile,
    dailyGoalScore: config.dailyGoalScore,
    intensityMultipliers: cloneScoringConfig(config.intensityMultipliers),
    evaluationProfileMultipliers: cloneScoringConfig(config.evaluationProfileMultipliers),
    exerciseCoefficients: cloneScoringConfig(config.exerciseCoefficients),
    scoringConfig: config,
    guides: Array.isArray(recommendation.guides) ? recommendation.guides : buildRecommendationGuides(config, profile),
    trainerComment: recommendation.trainerComment || buildCounselingTrainerComment(answers, profile)
  };
}

function loadCounselingState() {
  const savedState = localStorage.getItem(counselingStorageKey);

  if (!savedState) {
    return null;
  }

  try {
    const parsedState = JSON.parse(savedState);
    return {
      answers: parsedState.answers ? { ...getDefaultCounselingAnswers(), ...parsedState.answers } : null,
      scoringRecommendation: normalizeScoringRecommendation(parsedState.scoringRecommendation),
      appliedScoringConfig: parsedState.appliedScoringConfig
        ? normalizeScoringConfig(parsedState.appliedScoringConfig)
        : null,
      updatedAt: parsedState.updatedAt || null
    };
  } catch (error) {
    return null;
  }
}

function saveCounselingState(state) {
  localStorage.setItem(counselingStorageKey, JSON.stringify({
    answers: state.answers || null,
    scoringRecommendation: state.scoringRecommendation || null,
    appliedScoringConfig: state.appliedScoringConfig || null,
    updatedAt: new Date().toISOString()
  }));
}

function createRecommendationFromEditedInputs() {
  const recommendation = normalizeScoringRecommendation(currentCounselingRecommendation);

  if (!recommendation || !counselingResult) {
    return null;
  }

  const editedConfig = cloneScoringConfig(recommendation.scoringConfig);
  const profileInput = counselingResult.querySelector("[data-counseling-profile]");
  const profile = evaluationProfiles[profileInput?.value] ? profileInput.value : recommendation.evaluationProfile;

  counselingResult.querySelectorAll("[data-counseling-config]").forEach((input) => {
    const value = Number(input.value);

    if (!Number.isFinite(value)) {
      return;
    }

    if (input.dataset.counselingConfig === "dailyGoalScore") {
      editedConfig.dailyGoalScore = value;
    }

    if (input.dataset.counselingConfig === "intensity") {
      editedConfig.intensityMultipliers[input.dataset.configKey] = value;
    }

    if (input.dataset.counselingConfig === "exercise") {
      editedConfig.exerciseCoefficients[input.dataset.exerciseId][input.dataset.configKey] = value;
    }
  });

  const normalizedConfig = normalizeScoringConfig(editedConfig);

  return normalizeScoringRecommendation({
    ...recommendation,
    evaluationProfile: profile,
    scoringConfig: normalizedConfig,
    guides: buildRecommendationGuides(normalizedConfig, profile)
  });
}

function renderCounselingResult(recommendation) {
  const normalizedRecommendation = normalizeScoringRecommendation(recommendation);

  if (!normalizedRecommendation || !counselingResult) {
    return;
  }

  currentCounselingRecommendation = normalizedRecommendation;
  const config = normalizedRecommendation.scoringConfig;
  const answerSummary = [
    `経験: ${evaluationProfiles[normalizedRecommendation.answers.experience]?.label || "標準"}`,
    `目的: ${COUNSELING_GOAL_LABELS[normalizedRecommendation.answers.goal] || "継続重視"}`,
    `頻度: ${COUNSELING_WEEKLY_DAY_LABELS[normalizedRecommendation.answers.weeklyDays] || "3〜4日"}`,
    `時間: ${COUNSELING_SESSION_LENGTH_LABELS[normalizedRecommendation.answers.sessionLength] || "5分"}`,
    `評価: ${COUNSELING_STRICTNESS_LABELS[normalizedRecommendation.answers.strictness] || "標準"}`
  ].join(" / ");
  const profileOptions = Object.keys(evaluationProfiles)
    .map((profile) => `
      <option value="${profile}" ${profile === normalizedRecommendation.evaluationProfile ? "selected" : ""}>${evaluationProfiles[profile].label}</option>
    `).join("");
  const intensityFields = Object.keys(DEFAULT_SCORING_CONFIG.intensityMultipliers)
    .map((level) => `
      <label>
        <span>きつさ${level}</span>
        <input class="score-config-input" type="number" step="0.05" data-counseling-config="intensity" data-config-key="${level}" value="${config.intensityMultipliers[level]}">
      </label>
    `).join("");
  const exerciseFields = COUNSELING_EXERCISE_IDS
    .map((exerciseId) => {
      const definition = EXERCISE_DEFINITIONS[exerciseId];
      return `
        <div class="counseling-exercise-card">
          <h4>${definition.name}</h4>
          <label>
            <span>時間係数</span>
            <input class="score-config-input" type="number" step="0.1" data-counseling-config="exercise" data-exercise-id="${exerciseId}" data-config-key="time" value="${config.exerciseCoefficients[exerciseId].time}">
          </label>
          <label>
            <span>回数係数</span>
            <input class="score-config-input" type="number" step="0.1" data-counseling-config="exercise" data-exercise-id="${exerciseId}" data-config-key="reps" value="${config.exerciseCoefficients[exerciseId].reps}">
          </label>
        </div>
      `;
    }).join("");
  const guideItems = normalizedRecommendation.guides
    .map((guide) => `
      <li>
        <strong>${escapeHtml(guide.exerciseName)}</strong>
        <span>${escapeHtml([guide.timeText, guide.repsText].filter(Boolean).join(" / "))}</span>
        <small>${escapeHtml(guide.goalText)}</small>
      </li>
    `).join("");

  counselingResult.classList.remove("hidden");
  counselingResult.innerHTML = `
    <div class="counseling-summary">
      <strong>おすすめ評価プロファイル: ${evaluationProfiles[normalizedRecommendation.evaluationProfile].label}</strong>
      <span>今日の目標スコア: ${config.dailyGoalScore}pt</span>
      <small>${escapeHtml(answerSummary)}</small>
      <p>${escapeHtml(normalizedRecommendation.trainerComment)}</p>
    </div>

    <ul class="counseling-guide-list">${guideItems}</ul>

    <div class="counseling-editor">
      <label>
        <span>今日の目標スコア</span>
        <input class="score-config-input" type="number" step="1" data-counseling-config="dailyGoalScore" value="${config.dailyGoalScore}">
      </label>
      <label>
        <span>評価プロファイル</span>
        <select class="select-field" data-counseling-profile>${profileOptions}</select>
      </label>
      <div class="counseling-editor-group">
        <h3>きつさ倍率</h3>
        <div class="score-config-grid">${intensityFields}</div>
      </div>
      <div class="counseling-editor-group">
        <h3>種目ごとの係数</h3>
        <div class="counseling-exercise-grid">${exerciseFields}</div>
      </div>
    </div>
  `;
  applyCounselingButton.disabled = false;
}

function updateCounselingResultFromInputs() {
  const editedRecommendation = createRecommendationFromEditedInputs();

  if (!editedRecommendation) {
    return;
  }

  currentCounselingRecommendation = editedRecommendation;
  saveCounselingState({
    answers: editedRecommendation.answers,
    scoringRecommendation: editedRecommendation,
    appliedScoringConfig: loadCounselingState()?.appliedScoringConfig || null
  });
  renderCounselingResult(editedRecommendation);
}

function applyScoringRecommendation(recommendation) {
  const editedRecommendation = normalizeScoringRecommendation(recommendation);

  if (!editedRecommendation) {
    showMessage("適用できるカウンセリング結果がありません。", false);
    return;
  }

  scoringConfig = normalizeScoringConfig(editedRecommendation.scoringConfig);
  appState.evaluationProfile = editedRecommendation.evaluationProfile;
  saveDevScoringConfig();
  saveState();
  saveCounselingState({
    answers: editedRecommendation.answers,
    scoringRecommendation: editedRecommendation,
    appliedScoringConfig: scoringConfig
  });
  renderScoringConfigPanel();
  updateEvaluationProfileDisplay();
  updateGoalRecommendation();
  renderHistory();
  updateAllStats();
  updateSessionDisplay();
  updateDebugStorageOutput();
  counselingStatus.textContent = "カウンセリング結果を今後の記録用スコア設定に適用しました。過去ログは再計算しません。";
  showMessage("カウンセリング設定を適用しました。", true);
}

function handleGenerateCounselingRecommendation() {
  const answers = buildCounselingAnswers();
  const recommendation = generateScoringRecommendation(answers);

  saveCounselingState({
    answers,
    scoringRecommendation: recommendation,
    appliedScoringConfig: loadCounselingState()?.appliedScoringConfig || null
  });
  renderCounselingResult(recommendation);
  counselingStatus.textContent = "提案を作成しました。数値を確認してから適用できます。";
  showMessage("スコア設定案を作成しました。", true);
}

function discardCounselingResult() {
  localStorage.removeItem(counselingStorageKey);
  currentCounselingRecommendation = null;
  counselingResult.classList.add("hidden");
  counselingResult.innerHTML = "";
  applyCounselingButton.disabled = true;
  counselingStatus.textContent = "カウンセリング結果を破棄しました。適用済みのスコア設定は変更していません。";
  updateDebugStorageOutput();
  showMessage("カウンセリング結果を破棄しました。", true);
}

function resetCounselingToDefault() {
  localStorage.removeItem(counselingStorageKey);
  scoringConfig = cloneScoringConfig(DEFAULT_SCORING_CONFIG);
  isDevScoringConfigActive = false;
  appState.evaluationProfile = "standard";
  localStorage.removeItem(devScoringConfigStorageKey);
  saveState();
  setCounselingFormAnswers(getDefaultCounselingAnswers());
  counselingResult.classList.add("hidden");
  counselingResult.innerHTML = "";
  applyCounselingButton.disabled = true;
  renderScoringConfigPanel();
  renderHistory();
  updateAllStats();
  updateSessionDisplay();
  updateDebugStorageOutput();
  counselingStatus.textContent = "スコア設定とカウンセリング結果をデフォルトに戻しました。";
  showMessage("スコア設定をデフォルトに戻しました。", true);
}

function setupCounselingPanel() {
  const counselingState = loadCounselingState();

  if (counselingState?.answers) {
    setCounselingFormAnswers(counselingState.answers);
  } else {
    setCounselingFormAnswers(getDefaultCounselingAnswers());
  }

  if (counselingState?.scoringRecommendation) {
    renderCounselingResult(counselingState.scoringRecommendation);
    counselingStatus.textContent = counselingState.appliedScoringConfig
      ? "保存済みのカウンセリング結果があります。必要なら再編集して適用できます。"
      : "前回作成した提案があります。数値を確認してから適用できます。";
  } else {
    currentCounselingRecommendation = null;
    counselingResult.classList.add("hidden");
    counselingResult.innerHTML = "";
    applyCounselingButton.disabled = true;
    counselingStatus.textContent = "まだ提案は作成されていません。";
  }
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
  updateTrainerComment(getTrainerLineGroup("result", RESULT_TRAINER_LINES).goalReached({}));
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
  return calculateDailyScore(today);
}

function calculateDailyScore(dateText) {
  return records
    .filter((record) => record.date === dateText)
    .reduce((total, record) => total + Number(record.score || 0), 0);
}

function isGoalReachedOnDate(dateText) {
  return calculateDailyScore(dateText) >= getDailyGoalScore();
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
    updateTrainerComment(getTrainerLineGroup("result", RESULT_TRAINER_LINES).reward({}));
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

function createRestTicketEvent(dateText, type = "auto-used") {
  return {
    id: `rest-event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: dateText,
    type,
    createdAt: new Date().toISOString()
  };
}

function consumeRestTicketsForMissedDays() {
  const today = getTodayDateString();
  const yesterday = addDays(today, -1);
  const continuityDates = getContinuityDateSet();
  const missedRestDates = [];
  const previousCheckDate = appState.lastContinuityCheckDate;
  const earliestContinuityDate = getEarliestContinuityDate();
  let cursor = previousCheckDate
    ? addDays(previousCheckDate, 1)
    : earliestContinuityDate
      ? addDays(earliestContinuityDate, 1)
      : today;

  if (cursor > yesterday) {
    appState.lastContinuityCheckDate = today;
    saveState();
    return [];
  }

  while (cursor <= yesterday) {
    if (continuityDates.has(cursor)) {
      cursor = addDays(cursor, 1);
      continue;
    }

    if (appState.restTickets > 0) {
      appState.restDates.push(cursor);
      appState.restTickets -= 1;
      appState.restTicketEvents.push(createRestTicketEvent(cursor));
      continuityDates.add(cursor);
      missedRestDates.push(cursor);
    }

    cursor = addDays(cursor, 1);
  }

  appState.restDates = Array.from(new Set(appState.restDates)).sort();
  appState.restTicketEvents = appState.restTicketEvents
    .filter((event) => event && isValidDateString(event.date))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  appState.lastContinuityCheckDate = today;
  saveState();

  if (missedRestDates.length > 0) {
    const latestUsedDate = missedRestDates[missedRestDates.length - 1];
    const dateLabel = latestUsedDate === yesterday ? "昨日" : latestUsedDate;
    updateTrainerComment(`${dateLabel}は${getTrainerLineGroup("rest", {}).autoUsed?.({}) || "休憩チケットで継続を守ったよ。今日は少しだけ動いてみよう！"}`);
  }

  return missedRestDates;
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

function getDefaultSettingsSectionsState() {
  return {
    basic: true,
    trainer: false,
    counseling: false,
    scoring: false,
    data: false,
    "app-update": false,
    debug: false
  };
}

function loadSettingsSectionsState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(settingsSectionsStateKey) || "{}");
    return {
      ...getDefaultSettingsSectionsState(),
      ...(savedState && typeof savedState === "object" ? savedState : {})
    };
  } catch (error) {
    return getDefaultSettingsSectionsState();
  }
}

function saveSettingsSectionsState() {
  const sectionState = {};

  settingsSectionDetails.forEach((section) => {
    sectionState[section.dataset.settingsSection] = section.open;
  });

  localStorage.setItem(settingsSectionsStateKey, JSON.stringify(sectionState));
}

function setupSettingsSections() {
  if (!settingsSectionDetails.length) {
    return;
  }

  const sectionState = loadSettingsSectionsState();

  settingsSectionDetails.forEach((section) => {
    const key = section.dataset.settingsSection;
    section.open = Boolean(sectionState[key]);
    section.addEventListener("toggle", saveSettingsSectionsState);
  });
}

function updateSettingsBasicSummary() {
  if (settingsGoalScoreDisplay) {
    settingsGoalScoreDisplay.textContent = `${getDailyGoalScore()} pt`;
  }

  if (settingsBuildDisplay) {
    settingsBuildDisplay.textContent = `v${APP_VERSION}`;
  }
}

function updateAllStats() {
  updateGoalCard();
  updateDashboard();
  updateSettingsBasicSummary();
  updateHomeTrainerComment();
  renderRestDates();
  renderRecentRestEvent();
  renderContinuityCalendar();
  updateDebugStorageOutput();
  updateSessionDisplay();
}

function renderRestDates() {
  restDatesArea.innerHTML = "";

  if (appState.restDates.length === 0) {
    return;
  }

  const restLine = getTrainerLineGroup("rest", {}).usedDay?.({}) || "休憩日も継続として守られています。";

  appState.restDates
    .slice()
    .sort()
    .forEach((date) => {
      const restDate = document.createElement("span");
      restDate.textContent = `休憩日：${date}`;
      restDate.title = restLine;
      restDate.setAttribute("aria-label", `休憩日：${date}。${restLine}`);
      restDatesArea.appendChild(restDate);
    });
}

function renderRecentRestEvent() {
  if (!recentRestEventText) {
    return;
  }

  const latestEvent = appState.restTicketEvents
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

  if (!latestEvent) {
    recentRestEventText.textContent = "休憩チケットの使用履歴はまだありません。";
    return;
  }

  const restLine = getTrainerLineGroup("rest", {}).protected?.({}) || "休憩チケットで継続を守りました。";
  recentRestEventText.textContent = `直近の休憩：${latestEvent.date}。${restLine}`;
}

function getMonthLabel(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

function createCalendarDayCell(dateText) {
  const cell = document.createElement("div");
  const dateNumber = document.createElement("span");
  const scoreText = document.createElement("span");
  const markText = document.createElement("span");
  const today = getTodayDateString();
  const score = calculateDailyScore(dateText);
  const isRecorded = getRecordedDateSet().has(dateText);
  const isRest = getRestDateSet().has(dateText);
  const isFuture = dateText > today;

  cell.className = "calendar-day";
  cell.classList.toggle("is-recorded", isRecorded);
  cell.classList.toggle("is-rest", !isRecorded && isRest);
  cell.classList.toggle("is-future", isFuture);
  cell.classList.toggle("is-today", dateText === today);
  cell.setAttribute("aria-label", `${dateText} ${isRecorded ? "記録日" : isRest ? "休憩日" : isFuture ? "未来日" : "未記録日"}`);

  dateNumber.className = "calendar-date";
  dateNumber.textContent = String(parseDateString(dateText).getDate());
  scoreText.className = "calendar-score";
  scoreText.textContent = score > 0 ? `${score}pt` : "";
  markText.className = "calendar-mark";
  markText.textContent = [
    isRest ? "休" : "",
    isGoalReachedOnDate(dateText) ? "達" : ""
  ].filter(Boolean).join(" ");

  cell.append(dateNumber, scoreText, markText);
  return cell;
}

function renderContinuityCalendar() {
  if (!continuityCalendar || !calendarMonthLabel) {
    return;
  }

  continuityCalendar.innerHTML = "";
  calendarMonthLabel.textContent = getMonthLabel(calendarMonthDate);

  const year = calendarMonthDate.getFullYear();
  const month = calendarMonthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const leadingBlanks = (firstDay.getDay() + 6) % 7;

  for (let index = 0; index < leadingBlanks; index += 1) {
    const blankCell = document.createElement("div");
    blankCell.className = "calendar-day is-empty";
    continuityCalendar.appendChild(blankCell);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    continuityCalendar.appendChild(createCalendarDayCell(formatDateString(new Date(year, month, day))));
  }
}

function moveCalendarMonth(offset) {
  calendarMonthDate = new Date(calendarMonthDate.getFullYear(), calendarMonthDate.getMonth() + offset, 1);
  renderContinuityCalendar();
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
    lastContinuityCheckDate: null,
    restTickets: 2,
    restDates: [],
    restTicketEvents: [],
    claimedGoalRewardDates: [],
    claimedLevelRewards: [],
    evaluationProfile: "standard",
    selectedTrainerId: DEFAULT_TRAINER_ID,
    musicLoop: false
  };
}

function normalizeDateArray(value) {
  return Array.isArray(value)
    ? Array.from(new Set(value.filter(isValidDateString))).sort()
    : [];
}

function normalizeRestTicketEvents(value) {
  return Array.isArray(value)
    ? value
      .filter((event) => event && isValidDateString(event.date))
      .map((event) => ({
        id: String(event.id || `rest-event-${event.date}`),
        date: event.date,
        type: event.type || "auto-used",
        createdAt: event.createdAt || new Date(`${event.date}T00:00:00`).toISOString()
      }))
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    : [];
}

function normalizeState(parsedState) {
  const defaultState = getDefaultState();
  const restDateSource = Array.isArray(parsedState.restDates)
    ? parsedState.restDates
    : Array.isArray(parsedState.frozenDates)
      ? parsedState.frozenDates
      : defaultState.restDates;

  return {
    lastContinuityCheckDate: isValidDateString(parsedState.lastContinuityCheckDate)
      ? parsedState.lastContinuityCheckDate
      : defaultState.lastContinuityCheckDate,
    restTickets: Math.max(0, Number(parsedState.restTickets ?? parsedState.freezeTickets ?? defaultState.restTickets)),
    restDates: normalizeDateArray(restDateSource),
    restTicketEvents: normalizeRestTicketEvents(parsedState.restTicketEvents),
    claimedGoalRewardDates: Array.isArray(parsedState.claimedGoalRewardDates)
      ? normalizeDateArray(parsedState.claimedGoalRewardDates)
      : defaultState.claimedGoalRewardDates,
    claimedLevelRewards: Array.isArray(parsedState.claimedLevelRewards)
      ? parsedState.claimedLevelRewards
      : defaultState.claimedLevelRewards,
    evaluationProfile: evaluationProfiles[parsedState.evaluationProfile]
      ? parsedState.evaluationProfile
      : defaultState.evaluationProfile,
    selectedTrainerId: getTrainerId(parsedState.selectedTrainerId || defaultState.selectedTrainerId),
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
  const lines = getTrainerLineGroup("result", RESULT_TRAINER_LINES);

  if (result.levelRewards.length > 0) {
    return lines.reward(result);
  }

  if (result.leveledUp) {
    return lines.levelUp(result);
  }

  if (result.goalAchieved) {
    return result.goalMarked
      ? lines.goalReached(result)
      : lines.alreadyGoalReached(result);
  }

  if (result.record.score >= getDailyGoalScore()) {
    return lines.highScore(result);
  }

  if (result.record.intensity <= 2) {
    return lines.lowIntensity(result);
  }

  if (result.record.intensity >= 4) {
    return lines.highIntensity(result);
  }

  return lines.default(result);
}

function getResultTitle(result) {
  if (result.levelRewards.length > 0) {
    return "報酬獲得！";
  }

  if (result.leveledUp) {
    return "レベルアップ！";
  }

  if (result.goalAchieved) {
    return "今日の目標達成！";
  }

  return "ナイス記録！";
}

function getResultAnimationClass(result) {
  if (result.levelRewards.length > 0) {
    return "ticket-reward";
  }

  if (result.leveledUp) {
    return "level-up";
  }

  if (result.goalAchieved) {
    return "goal-complete";
  }

  return "sparkle";
}

function createResultSummary(record, beforeTotalExp, levelRewards, goalMarked) {
  const afterTotalExp = calculateTotalExp();
  const beforeLevel = calculateLevel(beforeTotalExp);
  const afterLevel = calculateLevel(afterTotalExp);
  const beforeLevelProgress = calculateLevelProgress(beforeTotalExp);
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
    beforeTotalExp,
    totalExp: afterTotalExp,
    gainedExp: Number(record.exp || 0),
    beforeLevelProgress,
    afterLevelProgress: levelProgress,
    nextLevelRequiredExp: levelProgress.requiredExp
  };
}

function clearResultAnimationTimers() {
  resultAnimationTimers.forEach((timerId) => clearTimeout(timerId));
  resultAnimationTimers = [];
}

function setResultExpGauge(totalExp, override = {}) {
  const progress = calculateLevelProgress(totalExp);
  const percent = Number.isFinite(Number(override.percent))
    ? Number(override.percent)
    : Math.min(progress.progressRate * 100, 100);
  const label = override.label || `${progress.progressExp} / 100 EXP`;

  resultExpGaugeFill.style.width = `${percent}%`;
  resultExpGaugeLabel.textContent = label;
}

function buildResultExpAnimationSteps(result) {
  const steps = [];
  let level = result.beforeLevel;
  let cursorExp = result.beforeTotalExp;

  steps.push({
    totalExp: cursorExp,
    percent: Math.min(calculateLevelProgress(cursorExp).progressRate * 100, 100),
    label: `Lv.${level} / ${calculateLevelProgress(cursorExp).progressExp} / 100 EXP`
  });

  while (level < result.afterLevel) {
    const levelEndExp = level * 100;
    steps.push({
      totalExp: levelEndExp,
      percent: 100,
      label: `Lv.${level} / 100 / 100 EXP`
    });
    level += 1;
    cursorExp = levelEndExp;
    steps.push({
      totalExp: cursorExp,
      percent: 0,
      label: `Lv.${level} / 0 / 100 EXP`
    });
  }

  const afterProgress = calculateLevelProgress(result.totalExp);
  steps.push({
    totalExp: result.totalExp,
    percent: Math.min(afterProgress.progressRate * 100, 100),
    label: `Lv.${result.afterLevel} / ${afterProgress.progressExp} / 100 EXP`
  });

  return steps;
}

function animateResultExpGauge(result) {
  clearResultAnimationTimers();
  const steps = buildResultExpAnimationSteps(result);

  resultExpGaugeFill.style.transition = "none";
  setResultExpGauge(result.beforeTotalExp, steps[0]);

  resultAnimationTimers.push(setTimeout(() => {
    resultExpGaugeFill.style.transition = "";

    steps.slice(1).forEach((step, index) => {
      const timerId = setTimeout(() => {
        setResultExpGauge(step.totalExp, step);
      }, index * 720);
      resultAnimationTimers.push(timerId);
    });
  }, 80));
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
  resultLevelChange.textContent = result.leveledUp
    ? `Lv.${result.beforeLevel} → Lv.${result.afterLevel}`
    : `Lv.${result.afterLevel}`;
  resultExpBefore.textContent = `${result.beforeTotalExp}`;
  resultExpGain.textContent = `+${result.gainedExp}`;
  resultExpAfter.textContent = `${result.totalExp}`;
  resultNextLevelExp.textContent = `次のレベルまで ${result.nextLevelRequiredExp} EXP`;
  renderResultBadges(result);

  if (result.leveledUp) {
    bonusMessages.push(`Lv.${result.beforeLevel} → Lv.${result.afterLevel} レベルアップ！`);
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
  animateResultExpGauge(result);
}

function closeResultOverlay() {
  clearResultAnimationTimers();
  resultOverlay.classList.add("hidden");
  resultScreen.classList.remove("goal-complete", "level-up", "ticket-reward", "sparkle");
  resultExpGaugeFill.style.transition = "";
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
  const beforeTotalExp = calculateTotalExp();
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
  const result = createResultSummary(record, beforeTotalExp, levelRewards, goalMarked);
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
  localStorage.removeItem(counselingStorageKey);
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
  currentCounselingRecommendation = null;
  saveState();
  scoringConfig = cloneScoringConfig(DEFAULT_SCORING_CONFIG);
  isDevScoringConfigActive = false;
  renderTrainerImageSettings();
  renderTrainerSelectionPanel();
  renderScoringConfigPanel();
  setupCounselingPanel();
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

function removeRecordsOnDate(dateText) {
  records = records.filter((record) => record.date !== dateText);
}

function setDateAsRecord(dateText) {
  if (!dateText) {
    showMessage("日付を選んでください。", false);
    return;
  }

  records.push(createTestRecord(dateText));
  appState.restDates = appState.restDates.filter((date) => date !== dateText);
  refreshAfterDebugAction(`${dateText} を記録日にしました。`);
}

function setDateAsRest(dateText, type = "debug-set") {
  if (!dateText) {
    showMessage("日付を選んでください。", false);
    return;
  }

  removeRecordsOnDate(dateText);
  if (!appState.restDates.includes(dateText)) {
    appState.restDates.push(dateText);
  }
  appState.restDates = Array.from(new Set(appState.restDates)).sort();
  appState.restTicketEvents.push(createRestTicketEvent(dateText, type));
  refreshAfterDebugAction(`${dateText} を休憩日にしました。`);
}

function addPreviousDayToStreak() {
  const continuityDates = getContinuityDateSet();
  let cursor = getTodayDateString();

  if (!continuityDates.has(cursor)) {
    addTestRecord(cursor);
    return;
  }

  while (continuityDates.has(cursor)) {
    cursor = addDays(cursor, -1);
  }

  setDateAsRecord(cursor);
}

function removeLatestContinuityDay() {
  const continuityDates = getContinuityDateSet();
  let cursor = getTodayDateString();

  if (!continuityDates.has(cursor)) {
    cursor = addDays(cursor, -1);
  }

  if (!continuityDates.has(cursor)) {
    showMessage("削除できる直近の継続日がありません。", false);
    return;
  }

  removeRecordsOnDate(cursor);
  appState.restDates = appState.restDates.filter((date) => date !== cursor);
  appState.restTicketEvents = appState.restTicketEvents.filter((event) => event.date !== cursor);
  refreshAfterDebugAction(`${cursor} を未記録状態にしました。`);
}

function clearYesterdayContinuity() {
  const yesterday = addDays(getTodayDateString(), -1);
  removeRecordsOnDate(yesterday);
  appState.restDates = appState.restDates.filter((date) => date !== yesterday);
  appState.restTicketEvents = appState.restTicketEvents.filter((event) => event.date !== yesterday);
  appState.lastContinuityCheckDate = addDays(yesterday, -1);
  refreshAfterDebugAction("昨日を未記録状態にしました。");
}

function runContinuityCheckManually() {
  const yesterday = addDays(getTodayDateString(), -1);
  if (!appState.lastContinuityCheckDate || appState.lastContinuityCheckDate >= yesterday) {
    appState.lastContinuityCheckDate = addDays(yesterday, -1);
  }
  const usedDates = consumeRestTicketsForMissedDays();
  renderHistory();
  updateAllStats();
  showMessage(
    usedDates.length > 0
      ? `日跨ぎ判定で ${usedDates.length} 日分の休憩チケットを使いました。`
      : "日跨ぎ判定を実行しました。消費対象はありませんでした。",
    true
  );
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
    trelog_counseling: JSON.parse(localStorage.getItem(counselingStorageKey) || "null"),
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
      trelog_dev_scoring_config: JSON.parse(localStorage.getItem(devScoringConfigStorageKey) || "null"),
      trelog_counseling: JSON.parse(localStorage.getItem(counselingStorageKey) || "null")
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

  if (backupStorage.trelog_counseling) {
    localStorage.setItem(counselingStorageKey, JSON.stringify(backupStorage.trelog_counseling));
  } else {
    localStorage.removeItem(counselingStorageKey);
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
    renderTrainerSelectionPanel();
    setupCounselingPanel();
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
  document.getElementById("debug-set-record-date").addEventListener("click", () => {
    setDateAsRecord(document.getElementById("debug-continuity-date").value);
  });
  document.getElementById("debug-set-rest-date").addEventListener("click", () => {
    setDateAsRest(document.getElementById("debug-continuity-date").value);
  });
  document.getElementById("debug-streak-plus-one").addEventListener("click", addPreviousDayToStreak);
  document.getElementById("debug-streak-minus-one").addEventListener("click", removeLatestContinuityDay);
  document.getElementById("debug-clear-yesterday").addEventListener("click", clearYesterdayContinuity);
  document.getElementById("debug-run-continuity-check").addEventListener("click", runContinuityCheckManually);
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

function checkDateRollover() {
  const today = getTodayDateString();
  if (appState.lastContinuityCheckDate === today) {
    return;
  }

  todayLabel.textContent = getTodayText();
  consumeRestTicketsForMissedDays();
  markGoalRewardIfNeeded();
  renderHistory();
  updateAllStats();
}

async function initializeApp() {
  records = loadRecords();
  appState = loadState();
  saveState();
  todayLabel.textContent = getTodayText();
  setupSettingsSections();
  await loadCustomTrainerImage();
  updateTrainerImages({ home: "default", session: "cheer", result: "result" });
  renderTrainerSelectionPanel();
  applyMusicLoopSetting();
  updateAppVersionDisplay();
  setupDebugPanel();
  renderScoringConfigPanel();
  setupCounselingPanel();
  updateEvaluationProfileDisplay();
  handleExerciseChange();
  updateRecordUnit();
  updateTimerDisplay();
  consumeRestTicketsForMissedDays();
  markGoalRewardIfNeeded();
  claimLevelRewardsIfNeeded();
  renderHistory();
  updateAllStats();
  setInterval(checkDateRollover, 60 * 1000);
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
counselingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleGenerateCounselingRecommendation();
});
generateCounselingButton.addEventListener("click", handleGenerateCounselingRecommendation);
applyCounselingButton.addEventListener("click", () => {
  applyScoringRecommendation(createRecommendationFromEditedInputs() || currentCounselingRecommendation);
});
discardCounselingButton.addEventListener("click", discardCounselingResult);
resetCounselingDefaultButton.addEventListener("click", resetCounselingToDefault);
trainerSelect.addEventListener("change", () => updateTrainerSelectionPreview(trainerSelect.value));
applyTrainerButton.addEventListener("click", applySelectedTrainer);
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
if (calendarPrevMonthButton) {
  calendarPrevMonthButton.addEventListener("click", () => moveCalendarMonth(-1));
}
if (calendarNextMonthButton) {
  calendarNextMonthButton.addEventListener("click", () => moveCalendarMonth(1));
}

initializeApp();
