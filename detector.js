browser.runtime.onMessage.addListener((message) => {
  if (message.type == "request-manifest") {
    let manifest = document.querySelector('link[rel="manifest"]');
    if (manifest) {
      let url = new URL(manifest.href, window.location.href);
      browser.runtime.sendMessage({
        type: "manifest-found",
        url: url.href,
      });
    }
  }
});
