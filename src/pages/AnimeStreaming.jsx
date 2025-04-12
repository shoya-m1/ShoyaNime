import { useParams, Link } from "react-router-dom";
import menheraChibi from "../assets/gif/menhera-chibi.gif";
import menheraEat from "../assets/gif/menhera-eating.gif";
import useStream from "../services/apiStream";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { TableDownload } from "../components/animeStreaming/TableDownload";
import { ListEpisode } from "../components/detailAnime/ListEpisode";
import { ContainerStreaming } from "../components/animeStreaming/ContainerStreaming";

export const AnimeStreaming = () => {
  const { id } = useParams();
  const { animes, loading, error } = useStream(`/episode/${id}`);
  const episodes = animes?.data || [];
  const { animes: datas, loading: loadingDatas } = useStream(`/anime/${episodes?.animeId}`);

  const [selectEpisode, setSelectEpisode] = useState(false);
  const [selectResolution, setSelectResolution] = useState(true);
  const [resolution, setResolution] = useState("");
  const [firstIdResolution, setIdResolution] = useState(null);
  const [selectedServerIndex, setSelectedServerIndex] = useState(null);

  let defaultStreaming = episodes?.defaultStreamingUrl;

  useEffect(() => {
    setResolution("");
  }, [id]);

  useEffect(() => {
    if (selectedServerIndex && firstIdResolution) {
      setResolution(episodes.server.qualities[selectedServerIndex].serverList[firstIdResolution].serverId);
    }
  }, [episodes]);

  return (
    <main className="pt-26">
      <div className="lg:m-auto overflow-hidden px-2 mx-2 py-5 max-w-6xl bg-neutral-900 border border-1 border-neutral-700/60 rounded-xl">
        {loading && loadingDatas ? (
          <span className="w-full pb-20 mr-30 min-h-screen flex justify-center items-center">
            <img className="w-50" src={menheraChibi} alt="gif" />
          </span>
        ) : (
          <>
            <div className="w-full overflow-hidden m-auto h-12 bg-neutral-700 rounded-md flex justify-center items-center">
              <h1 className="font-bold md:text-xl sm:text-base text-sm px-2 text-center text-elipsis line-clamp-2">{episodes.title}</h1>
            </div>
            <section className="relative mt-5 ">
              <div className="rounded-sm bg-neutral-800 w-full h-8 md:h-11 flex items-center justify-around">
                <Link to={`/episode/${episodes?.prevEpisode?.episodeId}`} className={`md:text-3xl text-xl w-[30%] flex justify-center h-full items-center ${!episodes?.hasPrevEpisode ? "pointer-events-none opacity-50" : ""}`}>
                  <IoIosArrowBack />
                </Link>

                <button
                  onClick={() => setSelectResolution(!selectResolution)}
                  className="font-semibold text-base md:text-xl sm:text-base text-sm bg-yellow-500 w-[40%] text-center hover:bg-neutral-800 duration-200 cursor-pointer h-full border-r-1 border-l-1 border-neutral-600"
                >
                  Show Resolution
                </button>
                <Link to={`/episode/${episodes?.nextEpisode?.episodeId}`} className={`md:text-3xl text-xl w-[30%] flex rotate-180 justify-center h-full items-center ${!episodes?.hasNextEpisode ? "pointer-events-none opacity-50" : ""}`}>
                  <IoIosArrowBack />
                </Link>
              </div>

              <div className={` ${selectResolution ? `opacity-0 -z-1` : "opacity-100 z-5"} duration-300 ese-in-out relative mt-3`}>
                <div className="absolute rounded-b-lg z-5 w-full h-auto bg-neutral-800 p-5">
                  <ul className="flex gap-3 justify-start flex-wrap">
                    {episodes?.server?.qualities?.map((resolusi, i) => {
                      if (resolusi.serverId === "default") return null;
                      return resolusi.serverList.map((list, iRes) => (
                        <li
                          onClick={() => {
                            setIdResolution(iRes);
                            setSelectedServerIndex(i);
                            setResolution(list.serverId);
                            setSelectResolution(!selectResolution);
                          }}
                          key={`${i}-${iRes}`}
                          className="w-full sm:w-60 md:w-auto font-semibold"
                        >
                          <p
                            className={`${
                              resolution == list.serverId ? "bg-yellow-500" : "bg-neutral-700"
                            } sm:text-base text-sm h-8 px-5 cursor-pointer duration-300 ease-in-out hover:bg-yellow-400 flex gap-1 items-center justify-center line-clamp-1 text-elipsis`}
                          >
                            <span>{list.title}</span>
                            <span>{resolusi.title}</span>
                          </p>
                        </li>
                      ));
                    })}
                  </ul>
                </div>
              </div>
            </section>
            <section className="mt-5">
              {loading ? (
                <span className="w-full h-50 pb-5 md:pb-20 pr-10 md:pr-20 md:h-120 flex justify-center items-center">
                  <img className="md:w-50 w-20" src={menheraEat} alt="gif" />
                </span>
              ) : (
                <ContainerStreaming resolution={resolution} defaultStreaming={defaultStreaming} />
              )}
            </section>
            <section className="mt-3">
              <h2 className="md:text-2xl text-lg font-semibold">All Episode</h2>
              <div className="relative">
                <div
                  onClick={() => {
                    setSelectEpisode(!selectEpisode);
                  }}
                  className="w-full cursor-pointer bg-neutral-800 mt-2 h-14 flex gap-2 overflow-hidden  items-center justify-between px-4 rounded-sm"
                >
                  <p className="md:text-lg text-sm font-meidum line-clamp-2 text-elipsis">{episodes?.title}</p>
                  <IoIosArrowBack className={` ${selectEpisode ? "rotate-90" : "rotate-270"} duration-300 ese-in-out text-xl`} />
                </div>
                <ul
                  className={`${
                    selectEpisode ? "opacity-100 z-1" : "opacity-0 -z-1"
                  } duration-200 px-3 ese-in-out justify-center flex flex-wrap items-center overflow-x-hidden rounded-b-sm gap-x-5 absolute w-full bg-neutral-800 mt-3 pt-4 max-h-100 `}
                >
                  {datas?.data?.episodeList
                    .slice()
                    .reverse()
                    .map((eps, i) => {
                      return (
                        <li
                          onClick={() => {
                            setSelectEpisode(!selectEpisode);
                          }}
                          key={i}
                          className="w-full sm:w-[45%]"
                        >
                          <ListEpisode {...eps} id={i} activeId={id} />
                        </li>
                      );
                    })}
                </ul>
              </div>
            </section>
            <section className="mt-5">
              <h2 className="font-semibold md:text-2xl text-lg">
                Download <span className="text-yellow-300">Anime</span>
              </h2>
              <TableDownload downloads={episodes?.downloadUrl?.qualities} />
            </section>
          </>
        )}
        <div className="h-5"></div>
      </div>
      <div className="h-10"></div>
    </main>
  );
};
