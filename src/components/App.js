import React, { useEffect, useState, useCallback } from "react";
import { Box, Flex, Heading } from "rebass/styled-components";
import { Input } from "@rebass/forms/styled-components";
import { lighten } from "khroma";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import Pad from "./Pad";
import EmptyPad from "./EmptyPad";
import { Helmet } from "react-helmet";
import GroupsTabs from "./GroupsTabs";
import { reorderPads, pressKey } from "../redux/actions/pads";
import { updateSettings, loadProject } from "../redux/actions/settings";
import Search from "./Search";
import { GlobalStyle, SiteWrapper } from "../theme/Site.style";
import theme from "../theme";
import themeColors, { groupColors } from "../theme/colors";

import { StaticImage } from "gatsby-plugin-image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const primaryHover = "" + themeColors.primaryHover;

const App = ({ groups, pads, settings, dispatch, state, project }) => {
  const [themeState, setThemeState] = useState(false);
  useEffect(() => {
    const tempTheme = { ...theme };
    setThemeState(tempTheme);
  }, []);
  useEffect(() => {
    if (project) {
      if (project.settings.id !== settings.id) {
        dispatch(loadProject(project));
      }
    }
  }, [project]);
  useEffect(() => {
    const tempTheme = { ...theme };
    tempTheme.colors.background = settings.darkmode ? "#0F2026" : "#eaeaea";
    tempTheme.colors.text = settings.darkmode ? "#fff" : "#0F2026";
    // console.log(theme);
    setThemeState(tempTheme);
  }, [settings.darkmode]);

  useEffect(() => {
    const tempTheme = { ...theme };
    const newColor = settings.currentGroup
      ? groups.filter((groupItem) => groupItem.id === settings.currentGroup)
          .length > 0
        ? groups.filter(
            (groupItem) => groupItem.id === settings.currentGroup
          )[0].color
        : groupColors[0]
      : groupColors[0];
    tempTheme.colors.primary = newColor;
    tempTheme.colors.primaryHover = settings.currentGroup
      ? lighten(newColor, 10)
      : primaryHover;
    setThemeState(tempTheme);
  }, [settings.currentGroup]);

  useEffect(() => {
    window.removeEventListener("keydown", keyPress);
    window.addEventListener("keydown", keyPress);
  }, [settings.lastKeyPress]);

  const keyPress = useCallback((e) => {
    window.removeEventListener("keydown", keyPress);
    window.addEventListener("keydown", keyPress);
    e = e || window.event;
    var key = String.fromCharCode(e.keyCode);
    if (document.activeElement.nodeName !== "INPUT") {
      dispatch(pressKey(key.toLowerCase()));
    }
  }, []);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = pads.findIndex((o) => o.id === active.id);
      const newIndex = pads.findIndex((o) => o.id === over.id);
      dispatch(reorderPads(arrayMove(pads, oldIndex, newIndex)));
    }
  };
  if (!themeState) {
    return (
      <div
        style={{
          background: "#0F2026",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    );
  }
  const title = "Soundboard App";
  const description = "A soundboard made with Appwrite.";
  return (
    <ThemeProvider theme={themeState}>
      <GlobalStyle />
      <SiteWrapper>
        <Helmet>
          <html lang="en" />
          <title>
            {title}
            {settings.name !== "" ? " - " + settings.name : ""}
          </title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta
            property="og:image"
            content="https://soundboard.gatsbyjs.io/img/image-og.jpg"
          />
        </Helmet>
        <Box minHeight="100vh" width="100%" bg="background" color="text">
          <Flex alignItems="center" flexWrap={["wrap", "nowrap"]}>
            <Flex p={2} alignItems="center" justifyContent="left" width="100%">
              <a href="/" target="_blank" rel="noreferrer">
                <StaticImage
                  src="../../static/img/soundboard.png"
                  alt="Soundboard"
                  placeholder="blurred"
                  height={50}
                />
              </a>
              <Heading as="h1" width="100%">
                <Input
                  sx={{ border: "none", fontWeight: "bold" }}
                  type="text"
                  placeholder="Soundboard's Name"
                  onChange={(e) =>
                    dispatch(
                      updateSettings({
                        name: e.target.value,
                        timestamp: Date.now(),
                      })
                    )
                  }
                  value={settings.name}
                />
              </Heading>
            </Flex>
            <Search />
          </Flex>
          <GroupsTabs />
          <Flex
            flexWrap="wrap"
            sx={{
              '[aria-pressed="true"]': { zIndex: 5 },
            }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={pads.filter((pad) => {
                  if (settings.currentGroup) {
                    return pad.groups.indexOf(settings.currentGroup) >= 0;
                  }
                  return true;
                })}
              >
                {pads.map((pad, index) => {
                  return (
                    <Pad
                      className="pad"
                      width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]}
                      display={
                        settings.search
                          ? pad.name
                              .toLowerCase()
                              .indexOf(settings.search.toLowerCase()) < 0
                            ? "none"
                            : "block"
                          : settings.currentGroup &&
                            pad.groups.indexOf(settings.currentGroup) < 0
                          ? "none"
                          : "block"
                      }
                      key={"pad-" + pad.id}
                      p={4}
                      index={index}
                      pad={pad}
                      theme={
                        pad.groups.length &&
                        groups.filter(
                          (groupItem) => groupItem.id === pad.groups[0]
                        ).length
                          ? {
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: groups.filter(
                                  (groupItem) => groupItem.id === pad.groups[0]
                                )[0].color,
                                primaryHover: lighten(
                                  groups.filter(
                                    (groupItem) =>
                                      groupItem.id === pad.groups[0]
                                  )[0].color,
                                  10
                                ),
                              },
                            }
                          : theme
                      }
                    />
                  );
                })}
                <Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} p={4}>
                  <EmptyPad theme={theme} />
                </Box>
              </SortableContext>
            </DndContext>
          </Flex>
        </Box>
      </SiteWrapper>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    pads: state.pads,
    settings: state.settings,
    state: state,
  };
};
export default connect(mapStateToProps)(App);
