let lastScan = "";
let scanLocked = false;

const warehouse = {
  products: [],
  locations: [],
  transactions: [],
};

let currentProduct = null;
let currentLocation = null;

function startScan() {
  const codeReader = new ZXing.BrowserBarcodeReader();
  const video = document.getElementById("video");

  codeReader.decodeFromVideoDevice(null, video, (result, err) => {
    if (result && !scanLocked) {
      scanLocked = true;

      lastScan = result.text;

      handleScan(lastScan);

      setTimeout(() => {
        scanLocked = false;
      }, 1500);
    }
  });
}

function saveScan() {
  const qty = document.getElementById("qty").value;

  if (!currentProduct || !currentLocation) {
    alert("Scan product AND location first");
    return;
  }

  const transaction = {
    product: currentProduct,
    location: currentLocation,
    quantity: qty,
    time: new Date().toISOString(),
  };

  warehouse.transactions.push(transaction);

  console.log("Transactions:", warehouse.transactions);
  log("Saved scan: " + lastScan);
  //   alert("Transaction saved");

  currentProduct = null;
  currentLocation = null;
}

function handleScan(code) {
  document.getElementById("result").innerText = code;

  if (code.startsWith("PRD")) {
    currentProduct = code;
    alert("Product scanned: " + code);
  }

  if (code.startsWith("LOC")) {
    currentLocation = code;
    alert("Location scanned: " + code);
  }
}

function log(msg) {
  const debug = document.getElementById("debug");

  debug.innerHTML += "<br>" + msg;

  debug.scrollTop = debug.scrollHeight;
}
