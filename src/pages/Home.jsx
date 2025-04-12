import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { dataJumbotron } from "../utils/dataJumbotron";
import { Link } from "react-router-dom";
import menheraChibi from "../assets/gif/menhera-chibi.gif";

// component
import { ContainerJumbotron } from "../components/home/ContainerJumbotron";
import { CardAnime } from "../components/CardAnime";
import useFetch from "../services/api";

// Konfigurasi responsive
const resJumbotron = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const resMovie = {
  desktop: { breakpoint: { max: 4000, min: 1179 }, items: 6, partialVisibilityGutter: -20 },
  tablet: { breakpoint: { max: 1179, min: 895 }, items: 5, partialVisibilityGutter: -40 },
  mobile: { breakpoint: { max: 895, min: 575 }, items: 4, partialVisibilityGutter: -40 },
  hpsm: { breakpoint: { max: 575, min: 447 }, items: 3, partialVisibilityGutter: -30 },
  hpxs: { breakpoint: { max: 447, min: 412 }, items: 2, partialVisibilityGutter: 0 },
  hp: { breakpoint: { max: 412, min: 345 }, items: 2, partialVisibilityGutter: -15 },
  minmobile: { breakpoint: { max: 345, min: 0 }, items: 2, partialVisibilityGutter: -30 },
};

// Komponen custom dot
const CustomDot = ({ onClick, active }) => {
  return <button onClick={() => onClick()} className={`w-2 h-2 mx-1 lg:mb-10 mb-4 rounded-full transition-all ${active ? "bg-yellow-300 scale-110" : "bg-neutral-200/30"}`} />;
};

const Home = () => {
  const { datas, loading, error } = useFetch("/home");
  return (
    <>
      {loading ? (
        <span className="w-full bt-20 min-h-screen flex justify-center items-center">
          <img className="w-50" src={menheraChibi} alt="gif" />
        </span>
      ) : (
        <main>
          <section>
            <Carousel responsive={resJumbotron} autoPlay={true} autoPlaySpeed={10000} infinite={true} arrows={false} renderDotsOutside={false} showDots={true} customDot={<CustomDot />} slidesToSlide={1}>
              {dataJumbotron.map((data) => (
                <ContainerJumbotron key={data.animeId} data={data} />
              ))}
            </Carousel>
          </section>
          <section className="mt-5 mx-3 md:mx-10">
            <div className="flex justify-between md:mb-10 mb-5 mx-3 md:mx-15 items-center">
              <h2 className="md:text-2xl text-xl font-semibold">
                Anime <span className="text-yellow-300">Ongoing</span>
              </h2>
              <Link to="/ongoing" className="hover:text-yellow-300 pt-2 text-sm md:text-[16px]" href="">
                Lihat Semua
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {datas?.data?.ongoing?.animeList.map((anime, i) => (
                <CardAnime key={i} {...anime} />
              ))}
            </div>
          </section>
          <section className="mt-8 mx-3 md:mx-10">
            <div className="flex justify-between md:mb-10 mb-5 mx-3 md:mx-15 items-center">
              <h2 className="md:text-2xl text-xl font-semibold">
                Anime <span className="text-yellow-300">Complated</span>
              </h2>
              <Link to="/completed" className="hover:text-yellow-300 pt-2 text-sm md:text-[16px]" href="">
                Lihat Semua
              </Link>
            </div>
            <Carousel className="lg:mx-14 mx-3" arrows={false} partialVisible centerMode={false} draggable focusOnSelect={false} infinite keyBoardControl minimumTouchDrag={80} responsive={resMovie} swipeable>
              {datas?.data?.completed?.animeList ? (
                datas?.data?.completed?.animeList.map((anime) => (
                  <div key={anime.animeId} className="">
                    <CardAnime {...anime} />
                  </div>
                ))
              ) : (
                <div className="text-neutral-200">Notting data</div>
              )}
            </Carousel>
          </section>
          <div className="h-20"></div>
        </main>
      )}
    </>
  );
};

export default Home;
