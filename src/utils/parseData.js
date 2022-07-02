export const parseData = (data) => {
  const dataMaped = data.results.map((x) => {
    const urlSplited = x.url.split("/");
    const nameParsed = x.name
      .split("-")
      .map((x) => {
        const xSplited = x.split("");
        xSplited[0] = xSplited[0].toUpperCase();
        return xSplited.join("");
      })
      .join(" ");
    return { ...x, id: Number(urlSplited[6]), nameParsed };
  });
  return dataMaped;
};
