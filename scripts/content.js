// content.js

// 1. Get saved options from storage, and hide accordingly
chrome.storage.sync.get('focusYouTubeOptions', function (data) {
    hide(data.focusYouTubeOptions);
});

// 2. Update view on change chrome.storage.focusYouTubeOptions
chrome.storage.onChanged.addListener(function(changes) {
    for (key in changes) {
        if (key === 'focusYouTubeOptions') {
            hide(changes[key].newValue);
        }
    }
});

function hide(options) {
    if (options.active) {
        var h = options.hiding;
        apply_css('hide_feed.css', h.hideFeed);
        apply_css('hide_sidebar.css', h.hideSidebar);
        apply_css('hide_subbar.css', h.hideSubBar);
        apply_css('hide_comments.css', h.hideComments);
        apply_css('hide_related.css', h.hideRelated);
        apply_css('hide_meta.css', h.hideMeta);
    } else {
        apply_css('hide_feed.css', false);
        apply_css('hide_sidebar.css', false);
        apply_css('hide_subbar.css', false);
        apply_css('hide_comments.css', false);
        apply_css('hide_related.css', false);
        apply_css('hide_meta.css', false);
    }
}

function apply_css(file, doApply) {
    console.debug('apply_css:' + file);

    // get <link> elements with attribute href="xyz.css"
    var cssPath = chrome.extension.getURL("css/" + file);
    var links = document.querySelectorAll('link[href="' + cssPath + '"]');

    // append <link> element to <head>
    if (doApply && links.length === 0) {
        var link = document.createElement("link");
        link.href = cssPath;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen";
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    // remove all existing <link> elements
    else if (!doApply) {
        for (var i = 0; i < links.length; i++) {
            links[i].parentNode.removeChild(links[i]);
        }
    }
}
