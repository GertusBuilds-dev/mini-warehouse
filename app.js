let lastScan = "";

function startScan() {
  const codeReader = new ZXing.BrowserBarcodeReader();
  const video = document.getElementById("video");

  codeReader.decodeFromVideoDevice(null, video, (result, err) => {
    if (result) {
      lastScan = result.text;

      document.getElementById("result").innerText = lastScan;

      codeReader.reset();
    }
  });
}

function saveScan() {
  console.log("Saved scan:", lastScan);

  alert("Saved: " + lastScan);
}
