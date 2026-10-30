"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BackgroundMusic.module.css";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = new Audio("/sounds/Pocket_Victory.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Браузери блокують автозапуск, тому стартуємо від першої дії користувача
    function startOnFirstInteraction() {
      void audio
        .play()
        .then(function () {
          setPlaying(true);
        })
        .catch(function () {});
      window.removeEventListener("pointerdown", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
    }

    window.addEventListener("pointerdown", startOnFirstInteraction);
    window.addEventListener("keydown", startOnFirstInteraction);

    return function () {
      window.removeEventListener("pointerdown", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
      audio.pause();
    };
  }, []);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(function () {
        setPlaying(true);
      });
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggle}
      aria-label={playing ? "Вимкнути музику" : "Увімкнути музику"}
    >
      {playing ? "Музика: увімк" : "Музика: вимк"}
    </button>
  );
}
