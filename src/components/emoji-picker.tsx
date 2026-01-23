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

  // Note: picker is now inline — it opens/closes only via the Emoji Picker button (toggle)
  return (
    <div className={styles.emojiField}>

      <div className={styles.emojiPreview} aria-label="Selected emoji">

        <input
          className={styles.emojiInput}
          value={emoji}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Emoji"
        />

        <button
          type="button"
          className={styles.emojiPickerButton}
          aria-label="Toggle emoji picker"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close Emoji Picker" : "Emoji Picker"}
        </button>
      </div>

      {open && (
        <div className={styles.picker} role="dialog" aria-label="Emoji picker">

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
