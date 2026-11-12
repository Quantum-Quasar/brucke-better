export type QuickRestart = "off" | "esc";
export type StopOnError = "off" | "letter";
export type ConfidenceMode = "off" | "on";
export type ShowCharBar = "always" | "on_focus" | "off";

export interface CustomizationSettings {
  reviewSessionLimit: 5 | 10 | 20 | 0;
  learningGoal: "travel" | "work" | "exam" | "fun";
  dailyMinutes: 5 | 10 | 20 | 30;
  placementTopic: number;
  microphonePractice: boolean;
  voiceGuidanceDismissed: string[];
  // Behavior & Tolerance
  quickRestart: QuickRestart;
  lazyMode: boolean; // umlaut tolerance
  capitalizationTolerance: boolean;

  // Typing Input
  stopOnError: StopOnError;
  confidenceMode: ConfidenceMode;
  showCharBar: ShowCharBar;

  // Sound
  soundVolume: number; // 0.0 - 1.0
  playSoundOnClick: string; // ID from SOUND_CLICK_OPTIONS
  playSoundOnError: string; // ID from SOUND_ERROR_OPTIONS

  // Elements & Accessibility
  showKeyTips: boolean;
  capsLockWarning: boolean;
  showMasteryCounter: boolean;
  increasedContrast: boolean;

  // Posture (TM-4): how the course asks to be taken
  showPostureCues: boolean;
  posturePrimerSeen: boolean;

  // Listening (TM-6): Epoch ms until which dictation exercises are skipped.
  // One skip silences every dictation for 15 minutes — a learner in a quiet
  // library or on a train must never be punished for their environment.
  listeningSkippedUntil: number;
}

export const DEFAULT_SETTINGS: CustomizationSettings = {
  reviewSessionLimit: 10,
  learningGoal: "fun",
  dailyMinutes: 10,
  placementTopic: 1,
  microphonePractice: false,
  voiceGuidanceDismissed: [],
  quickRestart: "off",
  lazyMode: false,
  capitalizationTolerance: false,

  stopOnError: "off",
  confidenceMode: "off",
  showCharBar: "always",

  soundVolume: 0.5,
  playSoundOnClick: "18", // Cherry MX Black ABS default mechanical click
  playSoundOnError: "1", // Damage tone

  showKeyTips: true,
  capsLockWarning: true,
  showMasteryCounter: true,
  increasedContrast: false,

  showPostureCues: true,
  posturePrimerSeen: false,

  listeningSkippedUntil: 0,
};
