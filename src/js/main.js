import "/src/styles/main.css";

import { initStart } from "/src/js/start.js";

console.log("main.js działa!");
window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  const modules = [{ class: ".js-start", function: initStart }];
  modules.forEach(({ class: cls, function: fn }) => {
    const element = document.querySelector(cls);
    if (element) {
      fn(element);
    }
  });
}
