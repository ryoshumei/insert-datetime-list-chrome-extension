import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Save, Clock } from 'lucide-react'
import type { Template } from '@/types'

interface TemplateManagerProps {
  onApplyTemplate: (template: Template) => void
}

export default function TemplateManager({ onApplyTemplate }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [newTemplateName, setNewTemplateName] = useState('')
  const [showSaveForm, setShowSaveForm] = useState(false)

  // Load templates from Chrome storage
  useEffect(() => {
    chrome.storage.local.get(['templates'], (result) => {
      if (result.templates) {
        setTemplates(result.templates)
      } else {
        // Set default templates
        const defaultTemplates: Template[] = [
          {
            id: '1',
            name: 'Morning',
            timeRanges: [
              { startTime: '09:00', endTime: '10:00' },
              { startTime: '10:00', endTime: '11:00' },
              { startTime: '11:00', endTime: '12:00' }
            ]
          },
          {
            id: '2',
            name: 'Afternoon',
            timeRanges: [
              { startTime: '14:00', endTime: '15:00' },
              { startTime: '15:00', endTime: '16:00' },
              { startTime: '16:00', endTime: '17:00' }
            ]
          }
        ]
        setTemplates(defaultTemplates)
        chrome.storage.local.set({ templates: defaultTemplates })
      }
    })
  }, [])

  const saveTemplate = (timeRanges: { startTime: string; endTime: string }[]) => {
    if (!newTemplateName.trim()) return

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: newTemplateName,
      timeRanges
    }

    const updatedTemplates = [...templates, newTemplate]
    setTemplates(updatedTemplates)
    chrome.storage.local.set({ templates: updatedTemplates })
    setNewTemplateName('')
    setShowSaveForm(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Time Templates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              size="sm"
              onClick={() => onApplyTemplate(template)}
            >
              <Clock className="h-3 w-3 mr-1" />
              {template.name}
            </Button>
          ))}
        </div>

        {showSaveForm ? (
          <div className="space-y-2 pt-2 border-t">
            <Label>Save Current Times as Template</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Template name"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
              <Button
                size="sm"
                onClick={() => saveTemplate([
                  { startTime: '09:00', endTime: '10:00' }
                ])}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setShowSaveForm(true)}
          >
            <Save className="h-3 w-3 mr-2" />
            Save as Template
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
