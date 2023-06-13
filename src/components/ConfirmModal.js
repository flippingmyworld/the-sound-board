import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex, Button, Text } from 'rebass/styled-components';
import { withTheme } from 'styled-components';
import Icon from './ui/Icon';
import Modal from './ui/Modal';

const ConfirmModal = ({ message, isOpen, onClose, onValidate }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClickBg={() => {
        onClose(!isOpen);
      }}
      modalPops={{ width: '400px' }}
    >
      <Box
        width={1}
        p={2}
        variant="card"
        sx={{ position: 'relative', zIndex: '2' }}
      >
        <Box>
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
        <Flex flexWrap="wrap" justifyContent="center" mx={-2} mt={6}>
          <Text width={[1]} p={2} textAlign="center" mt={2}>
            {message}
          </Text>
          <Box p={2}>
            <Button onClick={() => onValidate()}>Yes</Button>
          </Box>
          <Box p={2}>
            <Button
              ml={2}
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              No
            </Button>
          </Box>
        </Flex>
      </Box>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.any,
  message: PropTypes.any,
  onClose: PropTypes.func,
  onValidate: PropTypes.func,
};

export default withTheme(ConfirmModal);
