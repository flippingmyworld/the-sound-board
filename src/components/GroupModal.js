import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Button, Heading } from 'rebass/styled-components';
import { connect } from 'react-redux';
import { removeGroup, updateGroup, addGroup } from '../redux/actions/groups';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import { withTheme } from 'styled-components';
import { Label, Input } from '@rebass/forms/styled-components';
import { groupColors } from '../theme/colors';
import ConfirmModal from './ConfirmModal';

const GroupModal = ({ group, isOpen, onClose, onDelete, dispatch }) => {
  group = group || {
    name: false,
    id: false,
    color: groupColors[0],
  };
  const [newGroupName, setNewGroupName] = useState(group.name);
  const [newGroupColor, setNewGroupColor] = useState(group.color);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  useEffect(() => {
    if (isOpen) {
      setInputFocus();
    }
  }, [isOpen]);
  const [inputRef, setInputFocus] = useFocus();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveGroup();
    }
  };
  const saveGroup = () => {
    if (newGroupName) {
      let newGroup = {
        name: newGroupName,
        id: group.id ? group.id : '' + Math.floor(Date.now() / 1000),
        color: newGroupColor,
      };
      if (!group.id) {
        setNewGroupName(false);
        setNewGroupColor(groupColors[0]);
        dispatch(addGroup(newGroup));
      } else {
        dispatch(updateGroup(newGroup));
      }
      onClose(!isOpen);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClickBg={() => {
          onClose(!isOpen);
        }}
      >
        <Box width={1} p={2} variant="card" sx={{ position: 'relative', zIndex: '2' }}>
          <Box>
            <Heading pb={1} color="text" textAlign="center">
              Group
            </Heading>
            <Button
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 2,
                fontSize: '20px',
              }}
              onClick={() => {
                onClose(!isOpen);
              }}
            >
              <Icon icon="close" />
            </Button>
          </Box>
          <Flex flexWrap="wrap" mx={-2}>
            <Box width={[1, 1 / 2]} p={2}>
              <Label htmlFor="name">Name</Label>
              <Input
                ref={inputRef}
                name="name"
                type="text"
                placeholder="Name"
                value={newGroupName ? newGroupName : ''}
                onChange={(e) => {
                  setNewGroupName(e.target.value);
                }}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </Box>
            <Box width={[1, 1 / 2]} p={2}>
              <Label>Color</Label>
              <Flex pt={1} flexWrap="wrap">
                {groupColors.map((color, i) => (
                  <Flex
                    bg={color}
                    width="25px"
                    height="25px"
                    justifyContent="center"
                    alignItems="center"
                    mx={2}
                    mb={2}
                    sx={{
                      borderRadius: 25,
                      cursor: 'pointer',
                      fontSize: '20px',
                    }}
                    key={i}
                    onClick={() => setNewGroupColor(color)}
                  >
                    {color === newGroupColor && <Icon color="#fff" icon="check" />}
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Flex>
          <Button onClick={() => saveGroup()}>Ok</Button>
          {group.id && (
            <Button
              ml={2}
              type="button"
              onClick={() => {
                setConfirmOpen(true);
              }}
            >
              <Icon icon="ui-delete" />
            </Button>
          )}
        </Box>
      </Modal>
      <ConfirmModal
        isOpen={confirmOpen}
        onValidate={() => {
          setConfirmOpen(false);
          onDelete();
          dispatch(removeGroup(group));
        }}
        onClose={() => setConfirmOpen(false)}
        message="Are you sure you want to delete this group?"
      />
    </>
  );
};

export default connect()(withTheme(GroupModal));
