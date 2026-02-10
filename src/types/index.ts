export interface TimeSlot {
  id: string
  date: Date | undefined
  startTime: string
  endTime: string
}

export interface DateTimePreference {
  slots: TimeSlot[]
}

export interface Template {
  id: string
  name: string
  timeRanges: {
    startTime: string
    endTime: string
  }[]
}

export interface StorageData {
  templates: Template[]
  preferences: {
    defaultSlotCount: number
    customFormat: string
  }
}

export type MessageType = 'INSERT_TEXT' | 'OPEN_POPUP'

export interface Message {
  type: MessageType
  payload?: any
}
