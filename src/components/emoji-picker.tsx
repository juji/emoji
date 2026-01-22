"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./emoji-picker.module.css";
import { EMOJI_CATEGORIES } from "../lib/emojis";

export default function EmojiPicker({
  emoji,
  onChange,
}: {
  emoji: string;
  onChange: (e: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className={styles.emojiField} ref={ref}>
      <input
        className={styles.emojiInput}
        value={emoji}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Emoji"
      />

      <button
        type="button"
        className={styles.emojiPickerButton}
        aria-label="Open emoji picker"
        onClick={() => setOpen((v) => !v)}
      >
        Emoji Picker
      </button>

      {open && (
        <div className={styles.picker} role="dialog" aria-label="Emoji picker">
          <div className={styles.pickerHeader}>
            <div>Emojis</div>
            <button className={styles.pickerClose} onClick={() => setOpen(false)} aria-label="Close picker">✕</button>
          </div>

          <div className={styles.categories}>
            {EMOJI_CATEGORIES.map((c) => (
              <section key={c.id} className={styles.categorySection} aria-labelledby={`cat-${c.id}`}>
                <div id={`cat-${c.id}`} className={styles.categoryTitle}>{c.title}</div>
                <div className={styles.emojiGrid}>
                  {c.items.map((e) => (
                    <button
                      key={e}
                      className={styles.emojiCell}
                      onClick={() => {
                        onChange(e);
                        setOpen(false);
                      }}
                      title={e}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
