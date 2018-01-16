// background.js

var defaultOptions = {
    active: true,
    hiding: {
        hideFeed: true,
        hideSubBar: true,
        hideSidebar: true,
        hideComments: true,
        hideRelated: true,
        hideMeta: false
    }
};

// On start up, Load options from storage
chrome.storage.sync.get('focusYouTubeOptions', function (data) {
    if (typeof data.focusYouTubeOptions === 'undefined') {
        window.options = defaultOptions;
        save_to_storage();
    } else {
        window.options = data.focusYouTubeOptions; // update global
    }
});

// Listen to options change
chrome.runtime.onMessage.addListener(function (request) {
    // 1. popup.js (user) toggles activate button
    if (request.query === 'change active') {
        window.options.active = request.active; // update global
    }
    // 2. popup.js (user) selects checkbox
    else if (request.query === 'change hiding') {
        window.options.hiding[request.component] = request.value; // update global
    }
    save_to_storage(); // update storage
});

function save_to_storage() {
    chrome.storage.sync.set({
        focusYouTubeOptions: window.options
    });
}
