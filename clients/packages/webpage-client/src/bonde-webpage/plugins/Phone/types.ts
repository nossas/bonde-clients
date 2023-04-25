export interface Target {
  id: number
  name: string
}

export type StatusCall = 'created' | 'queued' | 'initiated' | 'ringing' | 'in-progress' | 'completed'

export interface Call {
  action_id?: number
  status: StatusCall
  url: string
}