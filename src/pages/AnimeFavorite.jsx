import { useContext } from "react";
import { CardAnime } from "../components/CardAnime";
import { FavoritesContext } from "../context/FavoritesContext";
import menheraChibi from "../assets/gif/cry-menhera.gif";

const AnimeFavorite = () => {
  const { favoriteAnimes } = useContext(FavoritesContext);
  return (
    <main className="md:pt-26 pt-20 min-h-screen">
      <div className="lg:m-auto min-h-screen  mx-2 py-5 max-w-6xl bg-neutral-900 border border-1 border-neutral-700/60 rounded-xl">
        <div className="px-2">
          <div className="w-full overflow-hidden h-10 md:h-12 bg-neutral-700 rounded-md flex justify-center items-center">
            <h1 className="font-bold md:text-xl text-elipsis line-clamp-1">Anime Favorite</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center items-center mt-5">
          {favoriteAnimes.length > 0 ? (
            favoriteAnimes.map((anime, i) => <CardAnime key={i} {...anime} />)
          ) : (
            <span className="w-full min-h-screen flex justify-center items-center flex-col">
              <h2 className="font-semibold">Belum Ada Anime Favorite :(</h2>
              <img className="w-50 me-8" src={menheraChibi} alt="gif" />
            </span>
          )}
        </div>
        <div className="h-10"></div>
      </div>
      <div className="h-10"></div>
    </main>
  );
};

export default AnimeFavorite;
