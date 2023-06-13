import React, { useState } from 'react';
import { Box, Flex, Button, Heading } from 'rebass/styled-components';
import { connect } from 'react-redux';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import { withTheme } from 'styled-components';
import { Label, Input } from '@rebass/forms/styled-components';
import { updateSettings, loadProject } from '../redux/actions/settings';

const MainMenu = ({ state, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getFile = () => {
    const pads = state.pads.map((pad) => {
      return { ...pad, isPlaying: false };
    });
  };
  const onFileLoad = (event) => {
    if (event.target.files.length > 0) {
      var file = event.target.files[0];
      saveFile(file);
    }
  };
  const saveFile = (file) => {
    if (file.name.split('.').pop() === 'json') {
      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        if (e.target.readyState === FileReader.DONE) {
          var obj = JSON.parse(e.target.result);
          reader = null;
          dispatch(loadProject(obj));
        }
      });
      reader.readAsText(file);
    }
  };
  const saveSettings = (settingsToSave) => {
    dispatch(updateSettings(settingsToSave));
  };
  return (
    <>
      <Flex
        p={4}
        pt={[4]}
        width={['56px', '56px', 1]}
        sx={{
          position: ['relative', 'relative', 'absolute'],
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <Button variant="ninja" onClick={() => setIsOpen(!isOpen)}>
          <Icon icon="settings" />
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClickBg={() => setIsOpen(!isOpen)}>
        <Box width={1} p={2} variant="card" sx={{ position: 'relative', zIndex: '2' }}>
          <Box>
            <Heading pb={1}>Menu principal</Heading>
            <Button
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 2,
                fontSize: '20px',
              }}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <Icon icon="close" />
            </Button>
          </Box>
          <Flex flexWrap="wrap" mx={-2}>
            <Box width={[1]} p={2}>
              <Label htmlFor="name">Nom</Label>
              <Input
                name="name"
                type="text"
                placeholder="Nom"
                value={state.settings.name}
                onChange={(e) => {
                  saveSettings({ name: e.target.value });
                }}
              />
            </Box>
            <Box width={[1, 1 / 2]} p={2}>
              <Label>{' '}</Label>
              <Button onClick={() => getFile()}>
                <Flex flexWrap="wrap">
                  <Icon icon="save" mr={2} />
                  Sauvegarder le projet
                </Flex>
              </Button>
            </Box>
            <Box width={[1, 1 / 2]} p={2}>
              <Label>Ouvrir un projet</Label>
              <Input type="file" value="" accept=".json" onChange={(e) => onFileLoad(e)} />
            </Box>
          </Flex>
        </Box>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return { state };
};
export default connect(mapStateToProps)(withTheme(MainMenu));
