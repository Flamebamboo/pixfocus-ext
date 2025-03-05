export interface TimerState {
  endTime: number | null;
  duration: number;
  isActive: boolean;
}

export class BackgroundTimer {
  static async getTimerState(): Promise<TimerState> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "GET_TIMER_STATE" }, (response) => {
        resolve(response);
      });
    });
  }

  static async startTimer(duration: number): Promise<void> {
    return new Promise((resolve) => {
      const endTime = Date.now() + duration * 1000;
      chrome.runtime.sendMessage(
        {
          type: "START_TIMER",
          payload: { duration, endTime },
        },
        () => resolve()
      );
    });
  }

  static async pauseTimer(): Promise<void> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "PAUSE_TIMER" }, () => resolve());
    });
  }

  static async stopTimer(): Promise<void> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "STOP_TIMER" }, () => resolve());
    });
  }
}
