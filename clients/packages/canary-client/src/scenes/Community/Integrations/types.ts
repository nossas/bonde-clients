export type Community = {
    id: number
    name: string
}

export type MailchimpLastSync = {
    date: Date
}

export type MailchimpStatus = {
    completed: number
    waiting: number
    failed: number
    active: number
}