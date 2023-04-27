export interface Target {
  id: number
  name: string
}

export interface Campaign {
  title: string
  group: string
  resource_name: string
  details: {
    total: number
    targets: Target[]
  }
}

export type StatusCall = 'created' | 'queued' | 'initiated' | 'ringing' | 'in-progress' | 'completed'

export interface Call {
  action_id?: number
  status: StatusCall
  url: string
}