import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "rebass/styled-components";
import { Link } from "gatsby";
import { databases } from "../utils/appwriteClient";

function get_youtube_thumbnail(url, quality) {
  if (url) {
    var video_id, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop();
    }

    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }

      var quality_key = "maxresdefault"; // Max quality
      if (quality === "low") {
        quality_key = "sddefault";
      } else if (quality === "medium") {
        quality_key = "mqdefault";
      } else if (quality === "high") {
        quality_key = "hqdefault";
      }

      return (
        "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg"
      );
    }
  }
  return false;
}
const BoardList = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const promise = databases.listDocuments("soundboard", "boards");

    promise.then(
      function (response) {
        console.log(response); // Success

        const boardList = response.documents.map((doc) => {
          const boardData = JSON.parse(doc.data);
          if (boardData.settings) {
            boardData.settings.id = doc.$id;
          }
          return boardData;
        });
        setBoards(boardList);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }, []);
  return (
    <Flex flexWrap="wrap" mx={-2}>
      {boards.map((board) => {
        console.log(board);
        const ytPads = board.pads.filter((pad) =>
          get_youtube_thumbnail(pad.url)
        );
        const imageUrl = ytPads.length
          ? get_youtube_thumbnail(ytPads[0].url)
          : "/img/image-og.jpg";
        return (
          <Box key={board.settings.id} width={[1, 1 / 2, 1 / 3]}>
            <Link to={"/board/" + board.settings.id}>
              <Box
                p={2}
                sx={{
                  img: {
                    transition: "all 200ms ease",
                  },
                  "&:hover": {
                    ".hover-grad": {
                      bottom: "0",
                    },
                    img: {
                      transform: "scale(1.1) rotate(-5deg)",
                    },
                  },
                }}
              >
                <Box
                  variant="squareBox"
                  sx={{ overflow: "hidden", borderRadius: "big" }}
                >
                  {" "}
                  <Box
                    height="100px"
                    className="hover-grad"
                    sx={{
                      transition: "all 200ms ease",
                      position: "absolute",
                      bottom: "-100px",
                      left: 0,
                      right: 0,
                      zIndex: 1,
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    }}
                  ></Box>
                  <Flex
                    sx={{
                      position: "absolute",
                      fontSize: ["10vw", "10vw", "10vw", "5vw"],
                      transform: ["scale(1.8)"],
                      transition: "all 200ms ease",
                      "&>div": {
                        margin: "-15px",
                      },
                    }}
                    className="hover-player"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                  >
                    <img src={imageUrl} alt={board.settings.name} />
                  </Flex>
                  <Text
                    sx={{
                      position: "absolute",
                      bottom: "10px",
                      left: 0,
                      right: 0,
                      zIndex: 3,
                      padding: "10px",
                    }}
                  >
                    {board.settings.name}
                  </Text>
                </Box>
              </Box>
            </Link>
          </Box>
        );
      })}
    </Flex>
  );
};
export default BoardList;
