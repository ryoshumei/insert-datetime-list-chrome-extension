// Content script for inserting text into web pages
// Runs on all pages and handles text insertion

let lastFocusedElement: HTMLElement | null = null

// Track focused element
document.addEventListener('focusin', (event) => {
  const target = event.target as HTMLElement
  if (target.isContentEditable ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA') {
    lastFocusedElement = target
  }
}, true)

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'INSERT_TEXT') {
    const { text } = message.payload

    if (!lastFocusedElement) {
      console.error('No focused element found')
      sendResponse({ success: false, error: 'No focused element' })
      return
    }

    insertText(lastFocusedElement, text)
    sendResponse({ success: true })
  }

  return true
})

function insertText(element: HTMLElement, text: string) {
  if (element.isContentEditable) {
    // For contentEditable elements (like Gmail)
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()

      // Insert text with line breaks
      const lines = text.split('\n')
      lines.forEach((line, index) => {
        range.insertNode(document.createTextNode(line))
        if (index < lines.length - 1) {
          range.insertNode(document.createElement('br'))
        }
      })

      // Move cursor to end
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  } else if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    // For input/textarea elements
    const start = element.selectionStart || 0
    const end = element.selectionEnd || 0
    const currentValue = element.value

    element.value = currentValue.substring(0, start) + text + currentValue.substring(end)
    element.selectionStart = element.selectionEnd = start + text.length

    // Trigger input event for frameworks to detect change
    element.dispatchEvent(new Event('input', { bubbles: true }))
    element.dispatchEvent(new Event('change', { bubbles: true }))
  }
}

export {}
