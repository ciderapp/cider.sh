const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);
if (!urlParams.has('url')) document.location.href = '/remote'
let url = decodeURI(atob(urlParams.get('url')))

document.getElementById('qr-code-link').href = url;
document.getElementById('qr-code').src = "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=" + url + '&bgcolor=255-33-86&color=0-0-0&margin=10';
document.getElementById('button').addEventListener('click', function () {
    //Clipboard.writeText(url);
    Clipboard.writeText = url
    document.getElementById('button').innerHTML = "Copied!";
});

if (isElectron()) document.getElementById('header').remove();


// I know, this is cancer
//if (isElectron()) { // Detect when running inapp so that we can open in browser instead -q
//    const shell = require('electron').shell
//    document.getElementById('url').addEventListener('click', () => {
//        shell.openExternal(url)
//    })
//    document.getElementById('url').href = '#'
//} else {
