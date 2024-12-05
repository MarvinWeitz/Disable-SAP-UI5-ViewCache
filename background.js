let isEnabled = false // Track whether the feature is enabled or disabled

chrome.action.onClicked.addListener((tab) => {
  // Toggle the feature
  isEnabled = !isEnabled

  // Change the icon based on the feature state
  if (isEnabled) {
    chrome.action.setIcon({ path: "icons/icon_active.png" })
    addQueryParam(tab)
  } else {
    chrome.action.setIcon({ path: "icons/icon16.png" })
  }
})

chrome.tabs.onUpdated.addListener((tab_id, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    if (isEnabled) addQueryParam(tab)
  }
})

function addQueryParam(tab) {
  // The URL of the current tab
  let newUrl = new URL(tab.url)
  const paramName = "sap-ui-xx-viewCache"
  const paramValue = "false"

  // Check if the query parameter already exists
  if (!newUrl.searchParams.has(paramName)) {
    newUrl.searchParams.append(paramName, paramValue)

    // Update the tab with the new URL
    chrome.tabs.update(tab.id, { url: newUrl.toString() })
  }
}
