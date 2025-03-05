interface TimerState {
  endTime: number | null;
  duration: number;
  isActive: boolean;
}

const DEFAULT_STATE: TimerState = {
  endTime: null,
  duration: 0,
  isActive: false,
};

export default defineBackground(() => {
  // Initialize state from storage
  chrome.storage.local.get(["timerState"], (result) => {
    if (!result.timerState) {
      chrome.storage.local.set({ timerState: DEFAULT_STATE });
    }
  });

  // Handle alarm completion
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "timerComplete") {
      new Audio(chrome.runtime.getURL("assets/timer-complete.mp3")).play();
      chrome.storage.local.set({
        timerState: { ...DEFAULT_STATE },
      });
    }
  });

  // Message handling
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
      case "GET_TIMER_STATE":
        chrome.storage.local.get(["timerState"], (result) => {
          sendResponse(result.timerState || DEFAULT_STATE);
        });
        return true; // Keep channel open for async response

      case "START_TIMER":
        const newState = {
          endTime: message.payload.endTime,
          duration: message.payload.duration,
          isActive: true,
        };

        chrome.storage.local.set({ timerState: newState }, () => {
          chrome.alarms.create("timerComplete", {
            when: message.payload.endTime,
          });
          sendResponse(true);
        });
        return true;

      case "PAUSE_TIMER":
        chrome.storage.local.get(["timerState"], (result) => {
          const currentState = result.timerState || DEFAULT_STATE;
          const pausedState = {
            ...currentState,
            isActive: false,
          };
          chrome.storage.local.set({ timerState: pausedState }, () => {
            chrome.alarms.clear("timerComplete");
            sendResponse(true);
          });
        });
        return true;

      case "STOP_TIMER":
        chrome.storage.local.set({ timerState: DEFAULT_STATE }, () => {
          chrome.alarms.clear("timerComplete");
          sendResponse(true);
        });
        return true;
    }
  });
});
