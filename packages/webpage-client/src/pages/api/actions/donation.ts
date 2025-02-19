import api from '../../../redux-app/apiClient';

interface Request {
  method: 'POST' | string;
  body: any;
}

interface Response {
  status: (_: number) => any | { json: (vars: any) => any };
}

const ActionDonation = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const endpoint = `/mobilizations/${req.body.mobilization_id}/donations`;
    const body = { donation: req.body };

    const result = await api.post(endpoint, body);

    return res.status(200).json({ data: result.data });
  }

  return res.status(200).json({ message: 'request GET' });
};


export default ActionDonation;
