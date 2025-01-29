import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SeverErrorIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <MotionContainer
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        margin: 'auto',
        padding: '40px',
        maxWidth: 600,
      }}
    >
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          500 Internal Server Error
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          There was an error, please try again later.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button
        component={RouterLink}
        href="/"
        sx={{
          fontSize: 18,
          padding: '12px 24px',
          borderRadius: 2,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Go to Home
      </Button>
    </MotionContainer>
  );
}
