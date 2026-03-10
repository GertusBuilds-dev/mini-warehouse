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
    if (result && scannerActive) {
      scannerActive = false;

      const scanBox = document.querySelector(".scan-box");
      scanBox.style.borderColor = "red";

      lastScan = result.text;

      log("SCAN: " + lastScan);

      handleScan(lastScan);

      setTimeout(() => {
        scannerActive = true;
        scanBox.style.borderColor = "lime";

        log("Scanner ready");
      }, scanCooldown);
    }
  });
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
