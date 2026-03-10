let APP_VERSION = "v0.4.4-dev"

fetch("VERSION.md")
.then(r=>r.text())
.then(v=>{

APP_VERSION = v.trim()

document.getElementById("version").innerText = APP_VERSION

const script = document.createElement("script")
script.src = "app.js?v=" + APP_VERSION

document.body.appendChild(script)

})
