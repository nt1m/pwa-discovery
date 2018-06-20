async function listPWA() {
  let list = document.getElementById("list");
  let {manifests} = await browser.storage.local.get("manifests");
  manifests = manifests || [];
  manifests.forEach(item => {
    let el = document.createElement("div");
    // el.textContent = JSON.stringify(item);
    let icon = document.createElement("img");

    let url = new URL(getBestIcon(128, item.icons).src, item.___manifest_url___);
    icon.src = url.href;
    el.appendChild(icon);

    let title = document.createElement("span");
    title.textContent = item.short_name || item.name;
    el.appendChild(title);

    el.onclick = async () => {
      let start_url = new URL(item.start_url, item.___manifest_url___);
      let win = await browser.windows.create({
        url: start_url.href,
        type: "popup"
      });
      // await new Promise(r => setTimeout(r, 1000));
      // browser.theme.update(win.id, {
      //   colors: {
      //     accentcolor: item.background_color,
      //     textcolor: item.theme_color,
      //   }
      // });
    };
    list.appendChild(el);
  });
}

listPWA();
