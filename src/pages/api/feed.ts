import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const CATEGORY_QUERIES: Record<string, string> = {
  Gadgets: 'latest tech gadgets 2024',
  Fashion: 'trending fashion summer 2024',
  Skincare: 'best skincare products 2024',
  Kitchen: 'innovative kitchen tools',
  Gaming: 'popular gaming gear 2024',
  Books: 'bestselling books 2024',
  Luxury: 'luxury accessories 2024',
  Tech: 'tech accessories 2024',
  Decor: 'modern home decor'
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category = 'Gadgets' } = req.query;
  const query = CATEGORY_QUERIES[category as string] || CATEGORY_QUERIES.Gadgets;
  
  try {
    const params = {
      api_key: process.env.SERPAPI_KEY,
      q: query,
      tbm: 'shop',
      location: 'United States',
      hl: 'en',
      gl: 'us',
      num: 20,
      delivery_days: '1-3',
      in_stock: true,
      sort_by: 'review_score'
    };

    const response = await axios.get('https://serpapi.com/search', { params });
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
    console.error('Feed API error:', error);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
  }
