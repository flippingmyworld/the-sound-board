import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentGroup } from '../redux/actions/settings';
import { Box, Flex, Button } from 'rebass/styled-components';
import { withTheme } from 'styled-components';
import Icon from './ui/Icon';
import GroupModal from './GroupModal';

const GroupsTabs = ({ theme, groups, dispatch, currentGroup }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const setGroup = (group) => {
    dispatch(setCurrentGroup(group));
  };
  useEffect(() => {
    setGroup(
      groups.filter((groupItem) => groupItem.id === currentGroup).length > 0 ? currentGroup : false,
    );
  }, [groups]);

  return (
    <>
      <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
        <Button
          as="div"
          sx={{ cursor: 'pointer' }}
          variant={currentGroup === false ? 'primary' : 'transparent'}
          mx={1}
          onClick={() => setGroup(false)}
        >
          All
        </Button>
        {groups.map((group, i) => (
          <Button
            as="div"
            sx={{ cursor: 'pointer' }}
            variant={group.id === currentGroup ? 'primary' : 'transparent'}
            mx={1}
            onClick={() => setGroup(group)}
            key={i}
          >
            <Flex justifyContent="center" alignItems="center" minHeight="20px">
              {group.name}
              {group.id === currentGroup && (
                <>
                  <Icon
                    size={20}
                    pl={2}
                    icon="settings"
                    onClick={() => setEditionOpen(!editionOpen)}
                  />
                  <GroupModal
                    group={group}
                    isOpen={editionOpen}
                    onClose={() => setEditionOpen(!editionOpen)}
                    onDelete={() => setGroup(false)}
                  />
                </>
              )}
            </Flex>
          </Button>
        ))}
        <Box sx={{ cursor: 'pointer' }} p={2} mx={1} onClick={() => setSettingsOpen(!settingsOpen)}>
          <Icon icon="plus" />
        </Box>
      </Flex>
      <GroupModal isOpen={settingsOpen} onClose={() => setSettingsOpen(!settingsOpen)} />
    </>
  );
};

const mapStateToProps = ({ groups, settings }) => {
  return {
    groups,
    currentGroup: settings.currentGroup,
  };
};
export default connect(mapStateToProps)(withTheme(GroupsTabs));
