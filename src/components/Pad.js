/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Box, Flex, Text, Heading, Button } from "rebass/styled-components";
import { Label, Input, Select, Slider } from "@rebass/forms/styled-components";
import styled, { ThemeProvider } from "styled-components";
import {
  updatePad,
  removePad,
  addPad,
  defaultPad,
} from "../redux/actions/pads";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ConfirmModal from "./ConfirmModal";

import ReactPlayer from "react-player";
import "rc-slider/assets/index.css";
import loadable from "@loadable/component";
const Range = loadable(() => import("rc-slider"), {
  resolveComponent: (components) => components.Range,
});
const LoadingBar = styled.div.attrs((props) => ({
  style: {
    width: props.progression,
    background: props.theme.colors.success,
  },
}))`
  height: 10px;
  background-color: green;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: 100ms all ease;
`;

const Pad = ({
  mainVolume,
  dispatch,
  files,
  groups,
  index,
  pad,
  theme,
  currentGroup,
  ...props
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: pad.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const videoPlayer = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [progression, setProgression] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [playerState, setPlayerState] = useState({
    url: null,
    ready: false,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    played: 0,
    playedSeconds: 0,
  });
  const videoTogglePlayStop = () => {
    setPlayerState({
      ...playerState,
      volume: !playerState.playing && pad.fadeIn > 0 ? 0 : getVolume(),
      playing: !playerState.playing,
    });
  };
  // useEffect(() => {
  //   console.log(playerState);
  // }, [playerState]);
  useEffect(() => {
    if (!playerState.playing && playerState.ready && videoPlayer.current) {
      videoPlayer.current.seekTo(pad.start);
    }
  }, [playerState.playing, pad.start]);

  useEffect(() => {
    setPlayerState({ ...playerState, volume: getVolume() });
  }, [pad.volume, mainVolume]);

  const syncPad = () => {
    if (pad.url && videoPlayer.current) {
      setPlayerState({
        ...playerState,
        start: pad.start,
        end: pad.end === 0 ? videoPlayer.current.getDuration() : pad.end,
        loop: pad.loop,
      });
      if (pad.end === 0) {
        setPad({
          duration: parseFloat(videoPlayer.current.getDuration() - pad.start),
          end: videoPlayer.current.getDuration(),
        });
      }
    }
  };

  useEffect(() => {
    setSettingsOpen(false);
  }, [pad.id]);
  useEffect(() => {
    if (!ReactPlayer.canPlay(pad.url)) {
      // console.log(pad, 'can play');
      setPad({
        ...defaultPad,
        name: pad.name,
        groups: pad.groups,
        id: pad.id,
      });
      setPlayerState({
        url: null,
        ready: false,
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        played: 0,
        playedSeconds: 0,
      });
    }
  }, [pad.url]);
  useEffect(syncPad, [pad.start, pad.end, pad.loop]);

  const getVolume = () => {
    return parseFloat((pad.volume / 100) * (mainVolume / 100));
  };
  const progress = (state) => {
    const currentTime = state.playedSeconds;
    if (pad.end <= currentTime) {
      setPlayerState({
        ...playerState,
        playing: false,
        played: 0,
        playedSeconds: 0,
      });
      return;
    }
    const played = {
      played: state.played,
      playedSeconds: state.playedSeconds,
    };
    const duration = pad.end - pad.start;
    const prog = ((state.playedSeconds - pad.start) / duration) * 100;
    if (duration < 60) {
      setProgression(Math.round(prog));
    }
    if (duration >= 60 && duration < 120) {
      setProgression(Math.round(prog * 10) / 10);
    }
    if (duration >= 120) {
      setProgression(Math.round((prog + Number.EPSILON) * 100) / 100);
    }

    const fadeInTime = pad.start + parseFloat(pad.fadeIn);
    const fadeOutTime = pad.start + parseFloat(duration - pad.fadeOut);

    if (currentTime < fadeInTime || currentTime > fadeOutTime) {
      if (currentTime < fadeInTime) {
        const fadePercent = (currentTime - pad.start) / parseFloat(pad.fadeIn);
        const volumeLev = getVolume() * fadePercent;
        setPlayerState({ ...playerState, volume: volumeLev, ...played });
        // console.log(volumeLev, "volume")
      }
      if (currentTime > fadeOutTime) {
        const fadePercent =
          (parseFloat(duration) + pad.start - currentTime) /
          parseFloat(pad.fadeOut);
        const volumeLev = getVolume() * fadePercent;
        setPlayerState({ ...playerState, volume: volumeLev, ...played });
      }
    } else {
      setPlayerState({ ...playerState, volume: getVolume(), ...played });
    }
  };

  const setPad = (padEdit) => {
    dispatch(updatePad({ ...pad, ...padEdit }));
  };
  const duplicatePad = () => {
    const newPad = { ...pad };
    newPad.id = Date.now();
    newPad.name = newPad.name + " (clone)";
    dispatch(addPad(newPad, index + 1));
    setSettingsOpen(false);
  };

  return (
    <Box {...props} ref={setNodeRef} style={style} {...attributes}>
      <ThemeProvider theme={theme}>
        <Box>
          <Box
            variant="pad"
            bg={
              dragOver
                ? "rgba(255, 255, 255, 0.2)"
                : playerState.playing
                ? "primary"
                : "background"
            }
            sx={{
              overflow: "hidden",
              borderColor:
                pad.groups.length &&
                groups.filter((groupItem) => groupItem.id === pad.groups[0])
                  .length
                  ? groups.filter(
                      (groupItem) => groupItem.id === pad.groups[0]
                    )[0].color
                  : "primary",
            }}
          >
            <Flex
              onDragOver={() => setDragOver(true)}
              sx={{
                opacity: pad.url ? 1 : 0.5,
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  ".hover-grad": { top: 0 },
                  ".hover-icon": { opacity: 1 },
                  ".hover-player": {
                    transform: [
                      "scale(1.5) rotate(-5deg)",
                      "scale(1.5) rotate(-5deg)",
                      "scale(1.5) rotate(-5deg)",
                      "scale(1.5) rotate(-5deg)",
                      "scale(1.8) rotate(-5deg)",
                    ],
                  },
                },
              }}
              flexWrap="wrap"
            >
              <Text
                width={1}
                textAlign="center"
                pt={2}
                px={8}
                color="#fff"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  fontSize: "14px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  zIndex: 3,
                }}
              >
                {pad.name}
              </Text>
              <Button
                variant="ninja"
                p={2}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontSize: "20px",
                  zIndex: 4,
                }}
                onClick={() => {
                  setSettingsOpen(!settingsOpen);
                }}
              >
                <Icon icon="settings" color="#fff" />
              </Button>
              <Button
                variant="ninja"
                p={2}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  fontSize: "20px",
                  zIndex: 4,
                }}
                {...listeners}
              >
                <Icon icon="move" color="#fff" />
              </Button>
              <Box width={1}>
                <Box
                  height="100px"
                  className="hover-grad"
                  sx={{
                    transition: "all 200ms ease",
                    position: "absolute",
                    top: "-100px",
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    background:
                      "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
                  }}
                ></Box>
                <Button
                  sx={{ border: "none !important" }}
                  width={1}
                  variant="transparent"
                  onClick={videoTogglePlayStop}
                >
                  <Box variant="squareBox">
                    <Flex
                      sx={{
                        position: "absolute",
                        fontSize: ["10vw", "10vw", "10vw", "5vw"],
                        transform: ["", "", "", "", "scale(1.5)"],
                        transition: "all 200ms ease",
                        "&>div": {
                          margin: "-15px",
                        },
                        ".ytp-show-cards-title,.ytp-chrome-top.ytp-show-cards-title":
                          {
                            display: "none !important",
                          },
                      }}
                      className="hover-player"
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      height="100%"
                    >
                      <ReactPlayer
                        ref={videoPlayer}
                        {...playerState}
                        url={pad.url}
                        progressInterval={100}
                        onProgress={progress}
                        onReady={() =>
                          setPlayerState({ ...playerState, ready: true })
                        }
                        onPause={() =>
                          setPlayerState({ ...playerState, playing: false })
                        }
                        onDuration={(duration) => {
                          if (pad.end === 0 || pad.end === null) {
                            setPad({ end: duration });
                          }
                        }}
                      />
                    </Flex>
                    <Flex
                      sx={{
                        position: "absolute",
                        zIndex: 3,
                        fontSize: ["10vw", "10vw", "10vw", "5vw"],
                        opacity: 0,
                        transition: "all 100ms ease",
                      }}
                      className="hover-icon"
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      height="100%"
                    >
                      <Icon
                        size={["10vw", "10vw", "10vw", "5vw"]}
                        color="#fff"
                        icon={!playerState.playing ? "ui-play" : "square"}
                      />
                    </Flex>
                  </Box>
                </Button>
              </Box>
              <LoadingBar progression={`${progression}%`} theme={theme} />
            </Flex>
            <Modal
              isOpen={settingsOpen}
              onClickBg={() => {
                setSettingsOpen(!settingsOpen);
              }}
            >
              <Box
                onDragOver={() => setDragOver(true)}
                width={1}
                p={2}
                variant="card"
                sx={{ position: "relative", zIndex: "2" }}
              >
                <Heading textAlign="center" pb={1}>
                  {pad.name === "" ? " " : pad.name}
                </Heading>
                <Button
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    fontSize: "20px",
                  }}
                  onClick={() => {
                    videoTogglePlayStop();
                  }}
                >
                  <Icon icon={!playerState.playing ? "ui-play" : "square"} />
                </Button>
                <Button
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 2,
                    fontSize: "20px",
                  }}
                  onClick={() => {
                    setSettingsOpen(!settingsOpen);
                  }}
                >
                  <Icon icon="close" />
                </Button>

                <Flex flexWrap="wrap" mx={-2}>
                  <Box width={1 / 2} p={2}>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={pad.name}
                      onChange={(e) =>
                        setPad({
                          name: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box width={1 / 2} p={2}>
                    <Label htmlFor="name">Url</Label>
                    <Input
                      name="url"
                      type="text"
                      placeholder="Url"
                      value={pad.url}
                      onChange={(e) =>
                        setPad({
                          url: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box
                    width={4 / 4}
                    p={2}
                    py={6}
                    sx={{
                      ".rc-slider-handle:after": {
                        whiteSpace: "nowrap",
                        position: "absolute",
                      },
                      ".rc-slider-handle-1:after": {
                        content: `"Start"`,
                        top: "-25px",
                      },
                      ".rc-slider-handle-2:after": {
                        content: `"Fade in"`,
                        top: "20px",
                      },
                      ".rc-slider-handle-3:after": {
                        content: `"Fade Out"`,
                        top: "20px",
                        right: 0,
                      },
                      ".rc-slider-handle-4:after": {
                        content: `"End"`,
                        top: "-25px",
                        right: 0,
                      },
                    }}
                  >
                    <Label htmlFor="start"></Label>
                    <Box
                      width={4 / 4}
                      sx={{
                        position: "relative",
                        "&>div": { top: "2px", borderRadius: "4px" },
                      }}
                    >
                      <LoadingBar
                        progression={`${playerState.played * 100}%`}
                      />
                    </Box>

                    <Range
                      count={3}
                      defaultValue={[
                        pad.start,
                        pad.start + pad.fadeIn,
                        pad.end - pad.fadeOut,
                        pad.end,
                      ]}
                      value={[
                        pad.start,
                        pad.start + pad.fadeIn,
                        pad.end - pad.fadeOut,
                        pad.end,
                      ]}
                      pushable={0}
                      step={0.1}
                      max={
                        videoPlayer.current
                          ? videoPlayer.current.getDuration()
                          : null
                      }
                      trackStyle={[
                        { backgroundColor: theme.colors.text },
                        { backgroundColor: theme.colors.primary },
                        { backgroundColor: theme.colors.text },
                      ]}
                      handleStyle={[
                        {
                          backgroundColor: theme.colors.primary,
                          borderColor: theme.colors.primary,
                        },
                        {
                          backgroundColor: theme.colors.text,
                          borderColor: theme.colors.text,
                        },
                        {
                          backgroundColor: theme.colors.text,
                          borderColor: theme.colors.text,
                          zIndex: 1,
                        },
                        {
                          backgroundColor: theme.colors.primary,
                          borderColor: theme.colors.primary,
                        },
                      ]}
                      railStyle={{
                        backgroundColor: "black",
                        opacity: 0.4,
                      }}
                      onChange={(value) =>
                        setPad({
                          start: parseFloat(value[0]) || 0,
                          fadeIn: parseFloat(value[1] - value[0]) || 0,
                          fadeOut: parseFloat(value[3] - value[2]) || 0,
                          end: parseFloat(value[3]) || 0,
                        })
                      }
                    />
                  </Box>
                  <Box width={1 / 2} p={2}>
                    <Box>
                      <Label htmlFor="volume">Volume ( {pad.volume}% )</Label>
                    </Box>

                    <Slider
                      name="volume"
                      type="range"
                      value={pad.volume}
                      min="0"
                      max="100"
                      step="1"
                      onChange={(e) =>
                        setPad({ volume: Number(parseInt(e.target.value)) })
                      }
                    />
                  </Box>
                  <Box width={1 / 2} p={2}>
                    <Label htmlFor="goups">Group</Label>
                    <Select
                      id="goups"
                      name="goups"
                      value={pad.groups ? pad.groups[0] : "false"}
                      onChange={(e) => {
                        if (currentGroup) {
                          setSettingsOpen(false);
                        }
                        setPad({
                          groups:
                            e.target.value === "false" ? [] : [e.target.value],
                        });
                      }}
                    >
                      <option value={false}>none</option>
                      {groups.map((group, i) => (
                        <option key={i} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  {/* <Box width={1 / 8} p={2}>
                    <Label htmlFor="key-pad">Touche</Label>
                    <Input
                      name="key-pad"
                      type="text"
                      placeholder="Touche"
                      value={pad.keypad}
                      onChange={(e) => {
                        setPad({
                          keypad: e.target.value.substring(0, 1),
                        });
                        dispatch(newKeyPress());
                      }}
                    />
                  </Box> */}
                  <Flex width={1} p={2}>
                    <Button onClick={() => duplicatePad()} mr={1}>
                      <Icon icon="ui-copy" />
                    </Button>

                    <Button mx={1}>
                      <a href={pad.url} target="_blank" rel="noreferrer">
                        <Icon icon="external" />
                      </a>
                    </Button>
                    <Button onClick={() => setConfirmOpen(true)} mx={1}>
                      <Icon icon="ui-delete" />
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            </Modal>
          </Box>
        </Box>
        <ConfirmModal
          isOpen={confirmOpen}
          onValidate={() => {
            dispatch(removePad(pad));
            setConfirmOpen(false);
          }}
          onClose={() => setConfirmOpen(false)}
          message="Are you sure you want to delete this pad?"
        />
      </ThemeProvider>
    </Box>
  );
};
const mapStateToProps = ({ groups, settings, files }) => {
  return {
    groups,
    mainVolume: settings.volume,
    currentGroup: settings.currentGroup,
    files,
  };
};
export default connect(mapStateToProps)(Pad);
