"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { encode } from "../lib/encode";
import { decode } from "../lib/decode";
import EmojiPicker from "../components/emoji-picker";

export default function Home() {
  const [tab, setTab] = useState<"decode" | "encode">("encode");

  // Encode state
  const [emoji, setEmoji] = useState("🙂");
  const [secret, setSecret] = useState("");

  // Emoji picker handled by EmojiPicker component

  // Decode state
  const [payload, setPayload] = useState("");

  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      const encoded = encode({ emoji, secret });
      setOutput(encoded);
    } catch (e) {
      setOutput("Encoding failed.");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decode({ input: payload });
      setOutput(decoded);
    } catch (e) {
      setOutput("Decoding failed—invalid payload.");
    }
  };

  const handleAction = () => {
    if (tab === "encode") handleEncode();
    else handleDecode();
  };

  const handleUseOutput = () => {
    if (!output) return;

    if (tab === "encode") {
      // use encoded payload in decoder
      setTab("decode");
      setPayload(output);
      setOutput("");
    } else {
      // use decoded secret in encoder
      setTab("encode");
      setSecret(output);
      setOutput("");
    }
  };

  const handleClear = () => {
    setEmoji("🙂");
    setSecret("");
    setPayload("");
    setOutput("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // ignore
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Emoji — Encode & Decode</h1>
            <p className={styles.lead}>
              Use invisible variation selectors to hide secrets inside emoji. Choose a tab, enter values, and run.
            </p>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Encode or Decode">
            <button
              className={`${styles.tab} ${tab === "encode" ? styles.active : ""}`}
              role="tab"
              aria-selected={tab === "encode"}
              onClick={() => setTab("encode")}
            >
              Encode
            </button>
            <button
              className={`${styles.tab} ${tab === "decode" ? styles.active : ""}`}
              role="tab"
              aria-selected={tab === "decode"}
              onClick={() => setTab("decode")}
            >
              Decode
            </button>
          </div>

          <div className={styles.panel}>
            {tab === "decode" ? (
              <>
                <label className={styles.label}>Payload</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Paste emoji payload to decode..."
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                />
              </>
            ) : (
              <>
                <label className={styles.label}>Emoji</label>
                <EmojiPicker emoji={emoji} onChange={setEmoji} />

                <label className={styles.label}>Secret</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Type secret text to encode..."
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
              </>
            )}

            <div className={styles.controls}>
              <button className={styles.btn} onClick={handleAction}>
                {tab === "encode" ? "Encode" : "Decode"}
              </button>
              <button className={styles.btnGhost} onClick={handleUseOutput} disabled={!output}>
                Use output as input
              </button>
              <button className={styles.btnGhost} onClick={handleClear}>
                Clear
              </button>
            </div>

            <label className={styles.label}>Output</label>
            <pre className={styles.output} aria-live="polite">{output}</pre>

            <div className={styles.footer}>
              <button className={styles.small} onClick={handleCopy} disabled={!output}>
                Copy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
