let manifestMap = new Map();

browser.runtime.onMessage.addListener(async (message, {tab}) => {
  let tabId = tab.id;
  if (message.type == "manifest-found") {
    let manifest = await fetch(message.url);
    let json = await manifest.json();
    let name = json.short_name || json.name;
    browser.pageAction.setTitle({
      tabId,
      title: "Add " + name + " to Firefox"
    });

    let icon = getBestIcon(32, json.icons);
    let url = new URL(icon.src, message.url);
    browser.pageAction.setIcon({
      tabId,
      path: url.href,
    });
    json.___manifest_url___ = message.url;
    manifestMap.set(tabId, json);
    browser.pageAction.show(tabId);
  }
});

browser.pageAction.onClicked.addListener(async tab => {
  let manifest = manifestMap.get(tab.id);
  let {manifests} = await browser.storage.local.get("manifests");
  manifests = manifests || [];
  manifests.push(manifest);
  browser.storage.local.set({ manifests });
});

browser.tabs.onUpdated.addListener(async (tabId) => {
  browser.tabs.sendMessage(tabId, {type: "request-manifest"})
});
