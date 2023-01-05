export const fetchPageFromApi = async (query: string) => {
  const req = await fetch("/api/v1/fetch", {
    body: JSON.stringify({ query }),
    method: "POST",
  });
  const res = await req.json();
  return res.data;
};
