"use client";

import { useEffect } from "react";
import { createIcons, icons } from "lucide";
import { animate } from "motion";

declare global {
  interface Window {
    JOIN_CLUB_ENDPOINT?: string;
    lucide?: {
      createIcons: () => void;
    };
    Motion?: {
      animate: typeof animate;
    };
  }
}

type LegacyPageData = {
  title: string;
  headStyle: string;
  tailwindConfig: string;
  bodyHtml: string;
  externalScripts: string[];
  inlineScripts: string[];
};

const MOJIBAKE_PATTERN = /[\u00c2\u00c3\u00e2]/;

const normalizeLegacyText = (input: string): string => {
  if (!MOJIBAKE_PATTERN.test(input)) return input;

  try {
    const bytes = Uint8Array.from(input, (char) => char.charCodeAt(0) & 0xff);
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return input;
  }
};

const findManagedScript = (src: string): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>("script[data-legacy-src]");
  for (const script of scripts) {
    if (script.dataset.legacySrc === src) return script;
  }
  return null;
};

const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const existing = findManagedScript(src);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), {
        once: true
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.legacySrc = src;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), {
      once: true
    });
    document.body.appendChild(script);
  });

export default function LegacyPageRenderer({ page }: { page: LegacyPageData }) {
  useEffect(() => {
    let cancelled = false;
    const injectedScripts: HTMLScriptElement[] = [];
    const injectedGlobals: Array<"lucide" | "Motion"> = [];

    const runScripts = async () => {
      try {
        if (!window.lucide) {
          window.lucide = {
            createIcons: () => createIcons({ icons })
          };
          injectedGlobals.push("lucide");
        }

        if (!window.Motion) {
          window.Motion = { animate };
          injectedGlobals.push("Motion");
        }

        for (const src of page.externalScripts) {
          if (cancelled) return;
          await loadScript(src);
        }
        if (cancelled) return;

        for (const inlineScript of page.inlineScripts) {
          if (cancelled) return;
          const script = document.createElement("script");
          script.text = normalizeLegacyText(inlineScript);
          script.dataset.legacyInline = "true";
          document.body.appendChild(script);
          injectedScripts.push(script);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void runScripts();

    return () => {
      cancelled = true;
      injectedScripts.forEach((script) => script.remove());
      injectedGlobals.forEach((key) => {
        delete window[key];
      });
    };
  }, [page]);

  return <div dangerouslySetInnerHTML={{ __html: normalizeLegacyText(page.bodyHtml) }} />;
}
