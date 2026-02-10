// Background service worker for Chrome extension
// Handles context menu creation and message passing

// Store the active tab ID when context menu is clicked
let activeTabId: number | null = null

chrome.runtime.onInstalled.addListener(() => {
  // Create context menu item
  chrome.contextMenus.create({
    id: 'insert-datetime-list',
    title: 'Insert Date/Time List',
    contexts: ['editable']
  })
})

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'insert-datetime-list' && tab?.id) {
    // Store the tab ID for later use
    activeTabId = tab.id

    // Store tab info in chrome.storage for popup to access
    await chrome.storage.local.set({
      activeTabId: tab.id,
      contextMenuClicked: true
    })

    // Try to open the popup (this works in Manifest V3)
    try {
      await chrome.action.openPopup()
    } catch (error) {
      // If openPopup fails, notify user to click the extension icon
      chrome.tabs.sendMessage(tab.id, {
        type: 'SHOW_NOTIFICATION',
        payload: {
          message: 'Please click the extension icon to insert date/time'
        }
      })
    }
  }
})

// Handle messages from popup/content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'INSERT_TEXT' && sender.tab?.id) {
    // Forward the insert request to the content script
    chrome.tabs.sendMessage(sender.tab.id, message)
    sendResponse({ success: true })
  }
  return true
})
