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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(EMOJI_CATEGORIES[0]?.id ?? "");
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
          <div className={styles.pickerSearchWrap}>
            <input
              className={styles.pickerSearch}
              placeholder="Search emoji (by char)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styles.pickerClose} onClick={() => setOpen(false)} aria-label="Close picker">
              ✕
            </button>
          </div>

          <div className={styles.categoryTabs} role="tablist" aria-label="Emoji categories">
            {EMOJI_CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`${styles.categoryTab} ${category === c.id ? styles.categoryActive : ""}`}
                onClick={() => setCategory(c.id)}
                role="tab"
                aria-selected={category === c.id}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className={styles.emojiGrid}>
            {(EMOJI_CATEGORIES.find((c) => c.id === category)?.items || [])
              .filter((e) => !search || e.includes(search))
              .map((e) => (
                <button
                  key={e}
                  className={styles.emojiCell}
                  onClick={() => {
                    onChange(e);
                    setOpen(false);
                    setSearch("");
                  }}
                  title={e}
                >
                  {e}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
