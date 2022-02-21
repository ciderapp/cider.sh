function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }
    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }
    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }
    return false;
}
if (isElectron()) { // Detect when running inapp so that we can theme the page with the user's chosen theme -q
    document.getElementsByTagName('body')[0].style = `background: transparent;`
    console.log('Hi Cider! its me, your web companion!')


    try {
        document.getElementById('main-button').innerText = "Installed!"
        document.getElementById('main-button').disabled = true
        document.getElementById('main-button-comment').hidden = true
    }
    catch {

    }
}



