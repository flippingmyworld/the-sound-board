import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Box, Flex, Button } from "rebass/styled-components";
import Icon from "./ui/Icon";
import { withTheme } from "styled-components";
import { Slider, Input } from "@rebass/forms/styled-components";
import {
  updateSettings,
  search as searchReducer,
} from "../redux/actions/settings";
import SaveModal from "./SaveModal";
// import LoginModal from "./LoginModal";
import ShareModal from "./ShareModal";
const Search = ({ settings, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeOnMute, setVolumeOnMute] = useState(settings.volume);
  const [isVoiceOver, setIsVoiceOver] = useState(false);
  const [volumeOnVoiceOver, setVolumeOnVoiceOver] = useState(settings.volume);
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();
  useEffect(() => {
    if (isOpen) {
      setInputFocus();
    }
  }, [isOpen]);
  const search = (wordTosearch) => {
    dispatch(searchReducer(wordTosearch));
  };
  const saveSettings = (settingsToSave) => {
    dispatch(updateSettings(settingsToSave));
  };
  useEffect(() => {
    if (isMuted) {
      setVolumeOnMute(settings.volume);
      saveSettings({ volume: 0 });
    } else {
      saveSettings({ volume: volumeOnMute });
    }
  }, [isMuted]);
  useEffect(() => {
    if (isVoiceOver) {
      setVolumeOnVoiceOver(settings.volume);
      saveSettings({ volume: 30 });
    } else {
      saveSettings({ volume: volumeOnVoiceOver });
    }
  }, [isVoiceOver]);
  return (
    <Flex
      p={2}
      width={["calc(100% - 56px)", "calc(100% - 56px)", "500px"]}
      justifyContent="flex-end"
    >
      <Box
        width={isOpen ? "200" : 0}
        px={isOpen ? 2 : 0}
        opacity={isOpen ? 1 : 0}
        sx={{ transition: "all 200ms ease", overflow: "hidden" }}
      >
        <Input
          ref={inputRef}
          name="name"
          type="text"
          width="100%"
          sx={{ transition: "all 200ms ease" }}
          placeholder="Search..."
          value={settings.search ? settings.search : ""}
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </Box>
      <Button
        variant="ninja"
        p={2}
        onClick={() => {
          if (isOpen) {
            search(false);
          }
          setIsOpen(!isOpen);
        }}
        width="40px"
      >
        <Icon icon={isOpen ? "close" : "search-1"} />
      </Button>
      <Button
        pl={2}
        variant="ninja"
        onClick={() => {
          saveSettings({ darkmode: !settings.darkmode, timestamp: Date.now() });
        }}
        width="40px"
      >
        <Icon icon={settings.darkmode ? "sun-alt" : "moon"} />
      </Button>

      <Flex alignItems="center" opacity={isMuted ? 0.5 : 1}>
        <Slider
          display={!isMuted ? "none" : "block"}
          width="100px"
          name="zoom"
          type="range"
          value={volumeOnMute}
          min="0"
          max="100"
          step="1"
          onChange={(e) => {
            return null;
          }}
        />
        <Slider
          display={isMuted ? "none" : "block"}
          width="100px"
          name="zoom"
          value={settings.volume}
          type="range"
          min="0"
          max="100"
          step="1"
          onChange={(e) =>
            saveSettings({
              volume: Number(e.target.value),
              timestamp: Date.now(),
            })
          }
        />
      </Flex>
      <Button
        pl={2}
        variant="ninja"
        onClick={() => {
          setIsMuted(!isMuted);
        }}
        width="40px"
      >
        <Icon icon={!isMuted ? "volume-down" : "volume-off"} />
      </Button>
      <Button
        pl={2}
        variant="ninja"
        onClick={() => {
          setIsVoiceOver(!isVoiceOver);
        }}
        width="40px"
      >
        <Icon icon="microphone-alt" color={!isVoiceOver ? "text" : "primary"} />
      </Button>
      {!settings.id ? <SaveModal /> : <ShareModal />}
      {/* <LoginModal /> */}
    </Flex>
  );
};

const mapStateToProps = ({ settings }) => {
  return { settings };
};
export default connect(mapStateToProps)(withTheme(Search));
