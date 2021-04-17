import React, { useState, useMemo } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper";
import { SwiperSlide } from "swiper/react";
import TextCardItem from "../CardList/TextCardItem.component";
import ImgCardItem from "../CardList/ImgCardItem.component";
import TinderImgCardItem from "../CardList/TinderImgCard.component";
import TinderTextCardItem from "../CardList/TinderTextCard.component";
import { Container } from "react-bootstrap";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { searchState } from "../../common/graphql/client";
import Loading from "../Loading/Loading";
import ImgList from "../ImgList/ImgList.component";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import TextList from "../TextList/TextList.component";
import Fade from "react-reveal/Fade";
import TinderCard from "react-tinder-card";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const Home = () => {
  const GET_CONTENT_ALL = gql`
    query getContentAll {
      getContentAll {
        id
        title
        desc
        type
        views
        photos {
          photoUrl
        }
        question {
          questionBody
          answer {
            body
          }
        }
      }
    }
  `;
  const [viewAll, setViewAll] = useState(true);
  const [contents, setContents] = useState([] as any);
  const [btnState, setBtnState] = useState("all" as string);
  // tinder ---------
  const alreadyRemoved = [] as any[];
  let charactersState = contents;
  const [characters, setCharacters] = useState([] as any);
  const [lastDirection, setLastDirection] = useState();
  useReactiveVar(searchState);

  const {} = useQuery(GET_CONTENT_ALL, {
    onCompleted: (data) => {
      if (data) {
        setContents([...data.getContentAll]);
        setCharacters([...data.getContentAll]);
        return;
      }
      return;
    },
  });

  const views = contents
    .map((item: any) => {
      return item.views;
    })
    .sort((a: number, b: number) => b - a);

  const filterdItem = [] as any;
  views.map((item: any) => {
    contents.map((el: any) => {
      if (item === el.views) {
        filterdItem.push(el);
        return el;
      }
    });
  });
  const btnAll = (e: any) => {
    e.preventDefault();
    setBtnState("all");
  };
  const btnImg = (e: any) => {
    e.preventDefault();
    setBtnState("img");
  };
  const btnText = (e: any) => {
    e.preventDefault();
    setBtnState("text");
  };

  const childRefs = useMemo(
    () =>
      Array(contents.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const swiped = (direction: any, nameToDelete: any) => {
    console.log("removing: " + nameToDelete, lastDirection);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name: any) => {
    // console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character: any) => character.name !== name
    );
    // setCharacters(charactersState);
  };

  // const swipe = (dir: any) => {
  //   const cardsLeft = characters.filter(
  //     (person: any) => !alreadyRemoved.includes(person.name)
  //   );
  //   if (cardsLeft.length) {
  //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
  //     const index = contents
  //       .map((person: any) => person.name)
  //       .indexOf(toBeRemoved); // Find the index of which to make the reference to
  //     alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     childRefs[index].current.swipe(dir); // Swipe the card!
  //   }
  // };

  return (
    <>
      {filterdItem.length === 0 ? (
        <Loading />
      ) : (
        <>
          {!viewAll ? (
            <div className="tinder-root">
              <div className="tinder-div1">
                <div className="tinder-div2">
                  <div className="tinder-card-container">
                    {characters.map((character: any, index: any) => (
                      <>
                        <TinderCard
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          ref={childRefs[index]}
                          className="swipe"
                          key={character.id}
                          onSwipe={(dir) => swiped(dir, character.id)}
                          onCardLeftScreen={() => outOfFrame(character.id)}
                        >
                          {character.photos.length === 0 ? (
                            <TinderTextCardItem
                              d={character}
                              className="tinder-card animate__pulse"
                            />
                          ) : (
                            <TinderImgCardItem
                              d={character}
                              className="tinder-card"
                            />
                          )}
                        </TinderCard>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : contents.item === 0 ? (
            <Loading />
          ) : (
            <>
              <Container fluid className="card-container">
                <div className="swiper-main-title">
                  <button
                    className={btnState === "all" ? "border-bt" : ""}
                    onClick={btnAll}
                  >
                    전체
                  </button>
                  <button
                    className={btnState === "img" ? "border-bt" : ""}
                    onClick={btnImg}
                  >
                    이상형 게임
                  </button>
                  <button
                    className={btnState === "text" ? "border-bt" : ""}
                    onClick={btnText}
                  >
                    밸런스 게임
                  </button>
                </div>
                {btnState === "all" ? (
                  <>
                    <Container fluid className="fluid-item">
                      <div className="gridbox">
                        {contents.map((el: any, index: number) => {
                          return (
                            <SwiperSlide className="slide-width" key={index}>
                              <Fade bottom>
                                {el.photos.length === 0 ? (
                                  <TextCardItem d={el} className="card-item" />
                                ) : (
                                  <ImgCardItem d={el} className="card-item" />
                                )}
                              </Fade>
                            </SwiperSlide>
                          );
                        })}
                      </div>
                    </Container>
                  </>
                ) : btnState === "img" ? (
                  <ImgList />
                ) : (
                  <TextList />
                )}
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
