const tabs = {};

const apply = (id) => {
  chrome.tabs.insertCSS(id, {
    file: "debugger.css",
  });
  chrome.tabs.executeScript(id, {
    file: "debugger.js",
  });
};

const icons = (id, enabled = true) => {
  chrome.browserAction.setIcon({
    path: {
      16: `icons/16${enabled ? "" : "-disabled"}.png`,
      24: `icons/24${enabled ? "" : "-disabled"}.png`,
      32: `icons/32${enabled ? "" : "-disabled"}.png`,
    },
    tabId: id,
  });
};

chrome.browserAction.onClicked.addListener((tab) => {
  const id = tab.id;

  if (tabs[id]) {
    delete tabs[id];
    icons(id, false);
    chrome.tabs.reload(id);
  } else {
    tabs[id] = true;
    apply(id);
    icons(id, true);
  }
});

chrome.tabs.onUpdated.addListener((id, info, tab) => {
  if (info.status === "complete" && tabs[id]) {
    apply(id);
    icons(id, true);
  }
});
