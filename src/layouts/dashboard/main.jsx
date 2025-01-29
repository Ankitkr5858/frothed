import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          px: 4,
          pt: `${HEADER.H_MOBILE + 24}px`,
          pb: 10,
          ...(lgUp && {
            pt: `${HEADER.H_MOBILE * 2 + 40}px`,
            pb: 15,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        px: 1,
        ...(lgUp && {
          px: 4,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100%)`,
          ...(isNavMini && {
            width: `calc(100%)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
