const fs = require("fs");
const { execSync } = require("child_process");

// lees versie
const version = fs.readFileSync("VERSION.md", "utf8").trim();

console.log("Preparing release:", version);

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

// git add alles
execSync("git add .", { stdio: "inherit" });

// commit met versie
execSync(`git commit -m "release ${version}"`, { stdio: "inherit" });

// tag maken
execSync(`git tag ${version}`, { stdio: "inherit" });

// push code
execSync("git push", { stdio: "inherit" });

// push tags
execSync("git push --tags", { stdio: "inherit" });

console.log("Release complete:", version);
