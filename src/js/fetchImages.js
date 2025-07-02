export async function fetchImages(query, count) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${apiKey}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
