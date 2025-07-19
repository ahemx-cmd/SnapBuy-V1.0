import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { image } = req.body;
  if (!image) return res.status(400).json({ error: 'No image provided' });

  try {
    const response = await fetch('https://api.edenai.run/v2/image/object_detection', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EDENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        providers: 'google,amazon,clarifai',
        file_url: image,
        fallback_providers: 'amazon,clarifai'
      })
    });

    const data = await response.json();
    const bestResult = data.google || data.amazon || data.clarifai;

    const products = bestResult.items.map((item: any) => ({
      name: item.label,
      category: item.category || 'general',
      confidence: Math.round(item.confidence * 100),
      brand: item.brand || null,
      color: item.color || null
    }));

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ 
      error: error.message || 'Analysis failed',
      suggestion: 'Try a clearer photo with one dominant object'
    });
  }
        }
