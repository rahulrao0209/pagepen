// Add a sidepanel.
chrome.action.onClicked.addListener((tab) => {
    console.log('Tab: ', tab);
    chrome.sidePanel.open({ tabId: tab.id });
});
