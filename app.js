let lastScan = "";

const warehouse = {
  products: [],
  locations: [],
  transactions: [],
};

let currentProduct = null;
let currentLocation = null;

let scannerActive = true;
let scanCooldown = 1500;

let paused = false;
let pendingScan = null;

window.onerror = function (err) {
  log("JS ERROR: " + err);
};

function log(msg) {
  const debug = document.getElementById("debug");

  debug.innerHTML += "<br>" + msg;

  debug.scrollTop = debug.scrollHeight;
}

function startScan() {
  const codeReader = new ZXing.BrowserBarcodeReader();

  const video = document.getElementById("video");

  log("Scanner started");

  codeReader.decodeFromVideoDevice(null, video, (result, err) => {
    if (result && scannerActive && !paused) {
      scannerActive = false;

      const scanBox = document.querySelector(".scan-box");
      scanBox.style.borderColor = "red";

      lastScan = result.text;

      const mode = document.getElementById("scanMode").value;

      log("SCAN DETECTED: " + lastScan);

      if (mode === "manual") {
        pendingScan = lastScan;
        log("Waiting for confirmation");
      } else {
        handleScan(lastScan);
      }

      setTimeout(() => {
        scannerActive = true;
        scanBox.style.borderColor = "lime";

        log("Scanner ready");
      }, scanCooldown);
    }
  });
}

function confirmScan() {
  if (!pendingScan) {
    log("No scan to confirm");
    return;
  }

  log("Confirmed scan: " + pendingScan);

  handleScan(pendingScan);

  pendingScan = null;
}

function toggleScanner() {
  paused = !paused;

  const button = document.getElementById("pauseButton");
  const scanBox = document.querySelector(".scan-box");

  if (paused) {
    log("Scanner paused");

    scanBox.style.borderColor = "orange";

    button.classList.add("paused");
    button.textContent = "▶ Resume Scanner";
  } else {
    log("Scanner resumed");

    scanBox.style.borderColor = "lime";

    button.classList.remove("paused");
    button.textContent = "⏸ Pause Scanner";
  }

  /* force redraw for iOS */
  button.offsetHeight;
}

function handleScan(code) {
  document.getElementById("result").innerText = code;

  if (code.startsWith("PRD")) {
    currentProduct = code;
    log("PRODUCT: " + code);
  } else if (code.startsWith("LOC")) {
    currentLocation = code;
    log("LOCATION: " + code);
  }
}

function saveScan() {
  const qty = document.getElementById("qty").value;

  if (!currentProduct || !currentLocation) {
    log("ERROR: scan product and location first");

    return;
  }

  const transaction = {
    product: currentProduct,
    location: currentLocation,
    quantity: qty,
    time: new Date().toISOString(),
  };

  warehouse.transactions.push(transaction);

  log("TRANSACTION SAVED");

  console.log(warehouse.transactions);

  currentProduct = null;
  currentLocation = null;
}

function showReleaseNotes() {
  const box = document.getElementById("releaseNotes");

  if (!box) {
    log("releaseNotes container not found");
    return;
  }

  if (box.style.display === "none" || box.style.display === "") {
    fetch("RELEASE.md")
      .then((r) => r.text())
      .then((text) => {
        box.innerText = text;
        box.style.display = "block";

        log("Release notes loaded");
      });
  } else {
    box.style.display = "none";
    log("Release notes hidden");
  }
}
