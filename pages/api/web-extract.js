import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk-2e6be5baf9594746a8cfd3b2783e5286',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url_path: req.body.url_path }), 
    };

    try {
      const response = await fetch(
        'https://api.worqhat.com/api/ai/v2/web-extract',
        options
      );

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        res.status(response.status).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
