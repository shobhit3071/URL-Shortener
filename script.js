const shortenBtn = document.getElementById('shorten-btn');
const originalUrlInput = document.getElementById('original-url');
const errorMsg = document.getElementById('error-msg');
const shortUrl = document.getElementById('short-url');

shortenBtn.addEventListener('click', () => {
    const originalUrl = originalUrlInput.value.trim();

    if (originalUrl === '') {
        showError('Please enter a valid URL');
        return;
    }


    shortenUrl(originalUrl)
        .then(data => {
            showShortUrl(data.shortUrl);
        })
        .catch(error => {
            showError('An error occurred while shortening the URL');
        });
});

function shortenUrl(url) {
    return new Promise((resolve, reject) => {

        const endpoint = 'https://example.com/shorten';
        const request = new XMLHttpRequest();
        request.open('POST', endpoint);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function () {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else {
                reject(Error(request.statusText));
            }
        };

        request.onerror = function () {
            reject(Error('Network Error'));
        };

        request.send(JSON.stringify({ url: url }));
    });
}

function showError(message) {
    errorMsg.textContent = message;
    shortUrl.textContent = '';
}

function showShortUrl(url) {
    shortUrl.textContent = `Short URL: ${url}`;
    errorMsg.textContent = '';
}
