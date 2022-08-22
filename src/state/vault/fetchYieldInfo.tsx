export const fetchYieldInfo = async () => {
  try {
    const apiUrl = `https://www.avault.network/api/v0/yield/info`;
    const r = await fetch(apiUrl);
    const body = await r.json();
    return body.data;
  } catch (e: any) {
    return {};
  }
};
