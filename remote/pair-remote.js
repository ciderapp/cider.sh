const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);
if (!urlParams.has('url')) document.location.href = '/remote'
const url = decodeURI(atob(urlParams.get('url')))
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
    document.getElementById('qr-code').src = "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=" + url + '&bgcolor=250-35-59&color=235-235-235&margin=10';

}
else{
    document.getElementById('qr-code').src = "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=" + url + '&bgcolor=255-33-86&color=0-0-0&margin=10';

}
document.getElementById('button').addEventListener('click', function () {
    navigator.clipboard.writeText(url)
    document.getElementById('button').innerHTML = "Copied!";
});

if (navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) {
    document.getElementById('header').remove();
    document.getElementById('qr-code-link').addEventListener('click', () => {
        window.open(url) // its as simple as this :)
    })
} else {
    document.getElementById('qr-code-link').href = url
}