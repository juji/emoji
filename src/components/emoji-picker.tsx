"use client";

import { useState } from "react";
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
  const [query, setQuery] = useState("");

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

          <div className={styles.pickerHeader}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search emojis by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search emojis"
            />
            {query && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className={styles.categories}>
            {EMOJI_CATEGORIES.map((c) => {
              const filtered = c.items.filter((item) => {
                const q = query.trim().toLowerCase();
                if (!q) return true;
                return (
                  item.char.includes(q) ||
                  item.name.toLowerCase().includes(q)
                );
              });
              if (filtered.length === 0) return null;

              return (
                <section key={c.id} className={styles.categorySection} aria-labelledby={`cat-${c.id}`}>
                  <div id={`cat-${c.id}`} className={styles.categoryTitle}>{c.title}</div>
                  <div className={styles.emojiGrid}>
                    {filtered.map((item) => (
                      <button
                        key={item.char + item.name}
                        className={styles.emojiCell}
                        onClick={() => {
                          onChange(item.char);
                          setOpen(false);
                        }}
                        title={item.name}
                        aria-label={item.name}
                      >
                        <div className={styles.emojiInner}>
                          <div className={styles.emojiGlyph}>{item.char}</div>
                          <div className={styles.emojiLabel}>{item.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
            {/* show no results when query present and no items found */}
            {query && EMOJI_CATEGORIES.every((c) => c.items.every((i) => !i.name.toLowerCase().includes(query.trim().toLowerCase()) && !i.char.includes(query.trim()))) && (
              <div className={styles.noResults}>No emojis found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
