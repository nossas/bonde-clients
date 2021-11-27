import plip from '../../../activists/plip';

export type Activist = {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
  state?: string;
};

export type Payload = {
  email: String;
  pdf_data: any;
  state: String
};

export type Widget = {
  id: number;
};

export interface Args {
  payload: Payload;
  widget: Widget;
}

interface Request {
  method: 'POST' | string;
  body: any;
}

interface Response {
  status: (code: number) => any | { json: (vars: any) => any };
}

const ActionPlip = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    console.log(req.body)
    const result = await plip(req.body);
    return res.status(200).json(result);
  }

  return res.status(200).json({ message: 'request GET' });
};

export default ActionPlip;
