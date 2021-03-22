let keepAlive = 10;

window.addEventListener ("load", getVideoUrls, false);

function getVideoUrls() {
    console.log('CONTENT_SCRIPT getVideoUrls', 'Starting to eat goyaba...');

    let videoUrls = [];
    const a = document.querySelectorAll('script');

    for (const b of a) {
        if (b.text != '') {
            const c = b.text;
            const rgx = new RegExp(/((?:https?(?:%3A%2F%2F|:\/\/))(?:www\.)?(?:[^'"])*\.(m(?:p4|k[va]|4[av]|ov)|a(?:vi|ac)|flv|w(?:mv|ebm)|flac|ogg)(?!\.[a-z]{1,4})(?:[^'"](?!\.[a-z]{1,4}))*?)['"]/, 'g');
            const d = [...b.text.matchAll(rgx)];

            if (d) {
                d.forEach(e => {
                    const f = e[0].replace(/^"/, '').replace(/"$/, '');
                    videoUrls.push(f);
                });
            }
        }
    }

    if (videoUrls && videoUrls.length > 0) {
        // Store the video urls
        chrome.storage.sync.set({ videoUrls });

        chrome.runtime.sendMessage({ message: 'videos_url_ready' }, function (response) {
            console.log('CONTENT_SCRIPT message_response', response.read);
        });

        return; // Success !!! End scraping...
    }

    --keepAlive;

    if (keepAlive > 0) {
        setTimeout(() => getVideoUrls(), 300);
    }
}
