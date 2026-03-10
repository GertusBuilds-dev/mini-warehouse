const fs = require("fs");

const version = fs.readFileSync("VERSION.md", "utf8").trim();

// update version.js
fs.writeFileSync(
  "version.js",
  `let APP_VERSION = "${version}"

fetch("VERSION.md")
.then(r=>r.text())
.then(v=>{

APP_VERSION = v.trim()

document.getElementById("version").innerText = APP_VERSION

const script = document.createElement("script")
script.src = "app.js?v=" + APP_VERSION

document.body.appendChild(script)

})
`,
);

// update release file header
const releaseNotes = fs.readFileSync("RELEASE.md", "utf8");

if (!releaseNotes.includes(version)) {
  fs.writeFileSync(
    "RELEASE.md",
    `# Release ${version}

${releaseNotes}`,
  );
}

console.log("Release updated to", version);
