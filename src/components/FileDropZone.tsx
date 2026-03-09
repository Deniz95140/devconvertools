"use client";

import { useRef, useState } from "react";

type FileDropZoneProps = {
  label: string;
  hint: string;
  onLoaded: (content: string, filename: string) => void;
};

export function FileDropZone({ label, hint, onLoaded }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);

  async function handleFile(file: File) {
    const text = await file.text();
    onLoaded(text, file.name);
  }

  return (
    <div
      className={isOver ? "drop-zone is-over" : "drop-zone"}
      onDragOver={(event) => {
        event.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsOver(false);
        const file = event.dataTransfer.files?.[0];
        if (file) {
          void handleFile(file);
        }
      }}
    >
      <button type="button" className="button ghost" onClick={() => inputRef.current?.click()}>
        {label}
      </button>
      <span>{hint}</span>
      <input
        ref={inputRef}
        className="hidden-input"
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleFile(file);
          }

          event.currentTarget.value = "";
        }}
      />
    </div>
  );
}
