import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card'
import { Copy, Send } from 'lucide-react'

interface PreviewEditorProps {
  text: string
  onTextChange: (text: string) => void
}

export default function PreviewEditor({ text, onTextChange }: PreviewEditorProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleInsert = async () => {
    try {
      // First check if we have a stored tab ID from context menu
      const storage = await chrome.storage.local.get(['activeTabId', 'contextMenuClicked'])
      let tabId = storage.activeTabId

      // If no stored tab ID, get the active tab
      if (!tabId) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        tabId = tab.id
      }

      if (tabId) {
        await chrome.tabs.sendMessage(tabId, {
          type: 'INSERT_TEXT',
          payload: { text }
        })

        // Clear the stored tab ID
        await chrome.storage.local.remove(['activeTabId', 'contextMenuClicked'])

        // Close popup after inserting
        window.close()
      }
    } catch (err) {
      console.error('Failed to insert text:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Preview & Edit</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
          placeholder="Your formatted date/time list will appear here..."
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4 mr-2" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          className="flex-1"
          onClick={handleInsert}
        >
          <Send className="h-4 w-4 mr-2" />
          Insert
        </Button>
      </CardFooter>
    </Card>
  )
}
