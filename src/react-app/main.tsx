import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/react-app/index.css";
import App from "@/react-app/App.tsx";

// Global Mobile & Desktop Keyboard Input Scroll-Into-View Enforcer
if (typeof window !== "undefined") {
  window.addEventListener(
    "focusin",
    (e) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        // Jika input berada di dalam hero auth card, scroll satu container kartu saja
        // sehingga seluruh kotak form tampil pas dan tidak meloncat naik lagi saat klik sandi
        const heroAuthCard = target.closest("#hero-auth-card") as HTMLElement | null;
        if (heroAuthCard) {
          setTimeout(() => {
            heroAuthCard.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 250);
          return;
        }

        // Untuk input form lain di halaman lain
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 280);
      }
    },
    { passive: true }
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
