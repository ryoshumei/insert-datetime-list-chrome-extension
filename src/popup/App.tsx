import { useState } from 'react'
import DateTimeSelector from '@/components/DateTimeSelector'
import PreviewEditor from '@/components/PreviewEditor'
import TemplateManager from '@/components/TemplateManager'
import type { TimeSlot } from '@/types'

function App() {
  const [slots, setSlots] = useState<TimeSlot[]>([
    { id: '1', date: undefined, startTime: '09:00', endTime: '10:00' },
    { id: '2', date: undefined, startTime: '14:00', endTime: '15:00' },
    { id: '3', date: undefined, startTime: '16:00', endTime: '17:00' },
  ])

  const [previewText, setPreviewText] = useState('')

  return (
    <div className="w-[480px] h-[600px] flex flex-col bg-background">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Date/Time List Inserter</h1>
        <p className="text-sm text-muted-foreground">
          Select dates and times for your scheduling preferences
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <DateTimeSelector
          slots={slots}
          onSlotsChange={setSlots}
          onPreviewChange={setPreviewText}
        />

        <PreviewEditor
          text={previewText}
          onTextChange={setPreviewText}
        />

        <TemplateManager
          onApplyTemplate={(template) => {
            // Apply template logic will be implemented
            console.log('Apply template:', template)
          }}
        />
      </div>
    </div>
  )
}

export default App
