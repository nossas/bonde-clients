import getConfig from 'next/config'

interface Request {
    method: 'GET',
    query: {
        widget_id: number
    }
}

const {
    publicRuntimeConfig: {
        openApiUrl,
        openApiToken
    }
} = getConfig()

const campaign_id = 1;

export default async (req: Request, res: any) => {
    if (req.method === 'GET') {
        // const { widget_id } = req.query
        const endpoint = `${openApiUrl}/api/campaigns/${campaign_id}/phone/targets/`;
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'OpenAPI-Token': openApiToken }
        })

        return res.status(200).json(await response.json())
    }

    return res.status(400)
}