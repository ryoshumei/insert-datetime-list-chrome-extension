import { useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Plus, Trash2 } from 'lucide-react'
import type { TimeSlot } from '@/types'
import { formatAllPreferences } from '@/lib/dateUtils'
import 'react-day-picker/dist/style.css'

interface DateTimeSelectorProps {
  slots: TimeSlot[]
  onSlotsChange: (slots: TimeSlot[]) => void
  onPreviewChange: (text: string) => void
}

export default function DateTimeSelector({
  slots,
  onSlotsChange,
  onPreviewChange
}: DateTimeSelectorProps) {

  // Update preview whenever slots change
  useEffect(() => {
    const preview = formatAllPreferences(slots)
    onPreviewChange(preview)
  }, [slots, onPreviewChange])

  const handleDateSelect = (index: number, date: Date | undefined) => {
    const newSlots = [...slots]
    newSlots[index].date = date
    onSlotsChange(newSlots)
  }

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const newSlots = [...slots]
    newSlots[index][field] = value
    onSlotsChange(newSlots)
  }

  const addSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      date: undefined,
      startTime: '09:00',
      endTime: '10:00'
    }
    onSlotsChange([...slots, newSlot])
  }

  const removeSlot = (index: number) => {
    if (slots.length > 1) {
      onSlotsChange(slots.filter((_, i) => i !== index))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Select Date & Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {slots.map((slot, index) => (
          <div key={slot.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">第{index + 1}希望</h3>
              {slots.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSlot(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div>
              <Label>Date</Label>
              <DayPicker
                mode="single"
                selected={slot.date}
                onSelect={(date) => handleDateSelect(index, date)}
                className="border rounded p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                />
              </div>
              <div>
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={addSlot}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Preference
        </Button>
      </CardContent>
    </Card>
  )
}
