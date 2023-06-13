import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Button, Heading } from 'rebass/styled-components';
import { Label, Input } from '@rebass/forms/styled-components';
import Icon from './ui/Icon';
import { addPad, defaultPad } from '../redux/actions/pads';
import { ThemeProvider } from 'styled-components';
import Modal from './ui/Modal';
const EmptyPad = ({ theme, currentGroup, dispatch }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newPad, setNewPad] = useState({ name: '', url: '' });

  const createPad = () => {
    if (newPad.url!=="") {
      dispatch(
        addPad({
          ...defaultPad,
          groups: currentGroup ? [currentGroup] : [],
          ...newPad,
        }),
      );
      setSettingsOpen(false);
      setNewPad({ name: '', url: '' });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box
          variant="pad"
          opacity={0.5}
          bg="background"
          sx={{
            overflow: 'hidden',
            borderColor: 'primary',
          }}
        >
          <Flex
            sx={{
              opacity: 1,
              position: 'relative',
              overflow: 'hidden',
            }}
            flexWrap="wrap"
          >
            <Box width={1}>
              <Button
                sx={{ border: 'none !important' }}
                width={1}
                variant="transparent"
                onClick={() => setSettingsOpen(true)}
              >
                <Box variant="squareBox">
                  <Flex
                    sx={{
                      position: 'absolute',
                      fontSize: ['10vw', '10vw', '10vw', '5vw'],
                    }}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                  >
                    <Icon size={['10vw', '10vw', '10vw', '5vw']} icon="plus" />
                  </Flex>
                </Box>
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Modal
        isOpen={settingsOpen}
        onClickBg={() => {
          setSettingsOpen(!settingsOpen);
        }}
      >
        <Box width={1} p={2} variant="card" sx={{ position: 'relative', zIndex: '2' }}>
          <Heading textAlign="center" pb={1}>
            New pad
          </Heading>

          <Box width={1 / 1} p={2}>
            <Label htmlFor="pad-name">Url</Label>
            <Input
              name="pad-name"
              type="text"
              placeholder="Name"
              value={newPad.name}
              onChange={(e) =>
                setNewPad({
                  ...newPad,
                  name: e.target.value,
                })
              }
            />
          </Box>
          <Box width={1 / 1} p={2}>
            <Label htmlFor="url">Url</Label>
            <Input
              name="url"
              type="text"
              placeholder="Url"
              value={newPad.url}
              onChange={(e) =>
                setNewPad({
                  ...newPad,
                  url: e.target.value,
                })
              }
            />
          </Box>
          <Box width={1 / 1} p={2}>
            <Button opacity={newPad.url!=="" ? 1 : 0.5} onClick={createPad} mr={1}>
              Create a new pad
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
const mapStateToProps = ({ settings }) => {
  return {
    currentGroup: settings.currentGroup,
  };
};
export default connect(mapStateToProps)(EmptyPad);
