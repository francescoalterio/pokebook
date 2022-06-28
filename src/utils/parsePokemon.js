export const parsePokemon = (data) => {
  const dataMaped = data.results.map((pokemon) => {
    const urlSplited = pokemon.url.split("/");
    const nameParsed = pokemon.name
      .split("-")
      .map((x) => {
        const xSplited = x.split("");
        xSplited[0] = xSplited[0].toUpperCase();
        return xSplited.join("");
      })
      .join(" ");
    return { ...pokemon, id: Number(urlSplited[6]), nameParsed };
  });
  return dataMaped;
};
