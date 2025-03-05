import { useState, useEffect, useCallback } from "react";
import { BackgroundTimer } from "@/services/backgroundTimer";

export const useTimer = (initialDuration) => {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Sync with background state
  useEffect(() => {
    const syncWithBackground = async () => {
      const state = await BackgroundTimer.getTimerState();
      if (state.endTime && state.isActive) {
        const remaining = Math.max(
          0,
          Math.ceil((state.endTime - Date.now()) / 1000)
        );
        setTimeRemaining(remaining);
        setIsActive(true);
        setIsComplete(remaining === 0);
      }
    };

    // Initial sync
    syncWithBackground();

    // Setup periodic sync
    const syncInterval = setInterval(syncWithBackground, 1000);

    return () => clearInterval(syncInterval);
  }, []);

  const start = useCallback(async () => {
    await BackgroundTimer.startTimer(initialDuration);
    setTimeRemaining(initialDuration);
    setIsActive(true);
    setIsComplete(false);
  }, [initialDuration]);

  const pause = useCallback(async () => {
    await BackgroundTimer.pauseTimer();
    setIsActive(false);
  }, []);

  const stop = useCallback(async () => {
    await BackgroundTimer.stopTimer();
    setTimeRemaining(initialDuration);
    setIsActive(false);
    setIsComplete(false);
  }, [initialDuration]);

  const getProgress = useCallback(() => {
    return 1 - timeRemaining / initialDuration;
  }, [timeRemaining, initialDuration]);

  return {
    timeRemaining,
    isActive,
    start,
    pause,
    stop,
    getProgress,
    isComplete,
  };
};
