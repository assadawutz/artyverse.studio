(() => {
  const manifest = document.querySelector('link[rel="manifest"]');
  const appBase = manifest ? new URL(".", manifest.href) : new URL("./", location.href);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(new URL("service-worker.js", appBase), {
        scope: appBase.pathname,
      }).catch((error) => {
        console.error("ARTYVERSE could not enable offline support.", error);
      });
    });
  }

  let pendingInstall;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    pendingInstall = event;

    let button = document.getElementById("artyverse-install");
    if (!button) {
      button = document.createElement("button");
      button.id = "artyverse-install";
      button.type = "button";
      button.textContent = "Install ARTYVERSE";
      button.setAttribute("aria-label", "Install ARTYVERSE as an app");
      Object.assign(button.style, {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: "10000",
        border: "0",
        borderRadius: "999px",
        padding: "13px 20px",
        background: "#c6f000",
        color: "#111",
        font: "600 14px/1.2 system-ui, sans-serif",
        boxShadow: "0 8px 28px rgba(0,0,0,.18)",
        cursor: "pointer",
      });
      document.body.append(button);
      button.addEventListener("click", async () => {
        if (!pendingInstall) return;
        await pendingInstall.prompt();
        await pendingInstall.userChoice;
        pendingInstall = undefined;
        button?.remove();
      });
    }
  });

  window.addEventListener("appinstalled", () => {
    pendingInstall = undefined;
    document.getElementById("artyverse-install")?.remove();
  });
})();
