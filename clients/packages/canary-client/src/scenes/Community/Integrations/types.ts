export type Community = {
    id: number
    name: string
}

export type MailchimpLastSync = {
    resyncMailchimpLastSync: {
        date: Date
    }
}

export type MailchimpStatus = {
    resyncMailchimpStatus: {
        completed: number
        waiting: number
        failed: number
        active: number
    }
}

export type MailchimpStart = {
    data: {
        resyncMailchimpStart: {
            status: string
        }
    }
}