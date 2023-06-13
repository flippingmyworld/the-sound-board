import React, { useEffect } from 'react';
import { Box, Text, Button } from 'rebass/styled-components';
import Icon from '../ui/Icon';
import { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import {
  updateNotification,
  removeNotification,
} from '../../redux/actions/notifications';

const Notification = ({ notification, zIndex, dispatch }) => {
  useEffect(() => {
    if (notification.status === 'new') {
      setTimeout(() => {
        dispatch(updateNotification({ ...notification, status: 'visible' }));
      }, 100);
    }
  }, []);
  return (
    <Box
      p={notification.status === 'visible' ? 2 : '0.1px'}
      backgroundColor="transparent"
      sx={{
        '.visible': { opacity: 1, mt: 0 },
        '.new,.closing': { opacity: 0, mt: '-300px' },
        zIndex: zIndex * -1,
        position: 'relative',
        transition: 'all 300ms ease',
      }}
    >
      <Box variant="variants.notification" className={'notif ' + notification.status}>
        <Button
          pr={1}
          pt={1}
          color="background"
          variant="ninja"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 2,
            fontSize: '20px',
          }}
          onClick={() => {
            dispatch(updateNotification({ ...notification, status: 'closing' }));
            setTimeout(() => dispatch(removeNotification(notification)), 300);
          }}
        >
          <Icon icon="close" />
        </Button>
        <Text color="background" mt="20px">
          {notification.message}
        </Text>
      </Box>
    </Box>
  );
};
export default connect()(withTheme(Notification));
