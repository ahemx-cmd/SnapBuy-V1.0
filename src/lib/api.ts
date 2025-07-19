export const analyzeImage = async (imageData: string) => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageData })
  });
  return response.json();
};

export const searchProducts = async (query: string, exactMatch: boolean) => {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, exactMatch })
  });
  return response.json();
};

export const fetchFeed = async (category: string) => {
  const response = await fetch(`/api/feed?category=${category}`);
  return response.json();
};
