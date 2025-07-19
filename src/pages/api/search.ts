import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { query, exactMatch } = req.body;
  
  try {
    const apiKey = exactMatch 
      ? process.env.SERPAPI_KEY 
      : process.env.SCALESERPAPI_KEY;
    
    const endpoint = exactMatch
      ? 'https://serpapi.com/search'
      : 'https://api.scaleserp.com/search';
    
    const params = {
      api_key: apiKey,
      q: query,
      tbm: 'shop',
      location: 'United States',
      hl: 'en',
      gl: 'us',
      num: 20,
      delivery_days: '1-3',
      in_stock: true,
      sort_by: exactMatch ? 'relevance' : 'review_score'
    };

    const response = await axios.get(endpoint, { params });
    const products = response.data.shopping_results?.map((item: any) => ({
      id: item.position,
      title: item.title,
      price: item.price?.value || item.price,
      rating: item.rating,
      reviews: item.reviews,
      store: item.source,
      thumbnail: item.thumbnail,
      link: item.link,
      description: item.description || ''
    })) || [];

    res.status(200).json({ products });
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: 'Product search failed' });
  }
      }
