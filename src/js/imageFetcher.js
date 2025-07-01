import "/src/styles/main.css";

export async function fetchImages(query, count) {
  const accessKey = "U0Idyxs9bDIH4_sgybQiaXfMDlw16_VSI8BLM9sSueU";
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${accessKey}`;

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
