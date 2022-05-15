import React from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ReactComponent as CloseIcon } from 'assets/images/CloseIcon.svg';
import { ReactComponent as HelpIcon } from 'assets/images/HelpIcon2.svg';
import Moonpay from 'assets/images/Moonpay.svg';
import Transak from 'assets/images/Transak.png';
import { CustomModal } from 'components';
import { useActiveWeb3React, useInitTransak } from 'hooks';
import 'components/styles/BuyFiatModal.scss';

interface BuyFiatModalProps {
  open: boolean;
  onClose: () => void;
  buyMoonpay: () => void;
}

const BuyFiatModal: React.FC<BuyFiatModalProps> = ({
  open,
  onClose,
  buyMoonpay,
}) => {
  const { account } = useActiveWeb3React();
  const { breakpoints } = useTheme();
  const mobileWindowSize = useMediaQuery(breakpoints.down('sm'));
  const { initTransak } = useInitTransak();

  return (
    <CustomModal open={open} onClose={onClose}>
      <Box padding={3}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='subtitle2' color='textPrimary'>
            Fiat gateway providers
          </Typography>
          <CloseIcon style={{ cursor: 'pointer' }} onClick={onClose} />
        </Box>
        <Box className='paymentBox'>
          <img src={Moonpay} alt='moonpay' />
          <Box className='buyButton' onClick={buyMoonpay}>
            Buy
          </Box>
        </Box>
        <Box className='paymentBox'>
          <img src={Transak} alt='transak' />
          <Box
            className='buyButton'
            onClick={() => {
              onClose();
              initTransak(account, mobileWindowSize);
            }}
          >
            Buy
          </Box>
        </Box>
        <Box mt={3} display='flex'>
          <Box display='flex' mt={0.3}>
            <HelpIcon />
          </Box>
          <Box ml={1.5} width='calc(100% - 32px)'>
            <Typography variant='body2'>
              Fiat services on Quickswap are provided by third-parties.
              Quickswap is not associated with, responsible or liable for the
              performance of these third-party services. Any claims & questions
              should be addressed with the selected provider.
            </Typography>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default BuyFiatModal;
