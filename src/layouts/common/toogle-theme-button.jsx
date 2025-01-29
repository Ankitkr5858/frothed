import { m } from 'framer-motion';

import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

// import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { SunIcon, DarkIcon } from 'src/components/ui-icons';
import { useSettingsContext } from 'src/components/settings';

export default function ToogleThemeButton() {
  const settings = useSettingsContext();
  const theme = useTheme();
  console.log(theme,settings)

  const newTheme = theme.palette.mode === 'light' ? 'dark' : 'light';

  return (
    <IconButton
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(1.05)}
      onClick={() => settings.onUpdate('themeMode', newTheme)}
    >
      {/* <Iconify
        icon={newTheme === 'dark' ? 'solar:sun-bold' : 'solar:moon-stars-bold-duotone'}
        width={24}
      /> */}
      {newTheme === 'dark' ? <SunIcon color="#737373" /> : <DarkIcon color="#737373" />}
    </IconButton>
  );
}
