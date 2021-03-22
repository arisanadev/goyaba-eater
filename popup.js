chrome.storage.sync.get(['videoUrls'], function (result) {
    setPopInterfaceData(result.videoUrls);
});

function setPopInterfaceData(videoUrls) {
    // Get content container reference
    const container = document.getElementById('container');

    // Clear the container if there we have at least one video url to display
    if (videoUrls && videoUrls.length > 0) {
        container.innerHTML = "";

        videoUrls.forEach(vurl => {
            // Video Item Wrapper
            const divEl = document.createElement('div');
            divEl.classList.add('video-item');

            // Paragraph
            const paragraphEl = document.createElement('p');
            const paragraphText = document.createTextNode(vurl);
            paragraphEl.appendChild(paragraphText);

            // Button
            const buttonEl = document.createElement('button');
            const buttonText = document.createTextNode("GO");
            buttonEl.appendChild(buttonText);

            buttonEl.addEventListener('click', () => {
                chrome.tabs.create({ url: vurl });
            });

            // Build the video item element
            divEl.appendChild(paragraphEl);
            divEl.appendChild(buttonEl);

            // Append data to the content container
            container.appendChild(divEl);
        });
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "videos_url_ready") {
            chrome.storage.sync.get(['videoUrls'], function (result) {
                setPopInterfaceData(result.videoUrls);
            });
            
            sendResponse({ read: true });
        }
    }
);
