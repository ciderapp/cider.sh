function isElectron(){return"undefined"!=typeof window&&"object"==typeof window.process&&"renderer"===window.process.type||(!("undefined"==typeof process||"object"!=typeof process.versions||!process.versions.electron)||"object"==typeof navigator&&"string"==typeof navigator.userAgent&&navigator.userAgent.indexOf("Electron")>=0)}if(isElectron()){document.getElementsByTagName("body")[0].style="background: transparent;",console.log("Hi Cider! its me, your web companion!");try{document.getElementById("main-button").innerText="Installed!",document.getElementById("main-button").disabled=!0,document.getElementById("main-button-comment").hidden=!0}catch{}}