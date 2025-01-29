import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function NotFoundView() {
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
          Sorry, Page Not Found!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography
          sx={{
            color: 'text.secondary',
            marginBottom: 4,
            width: '70%',
            marginLeft: '88px',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
          }}
        >
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration
          sx={{
            height: 260,
            marginY: { xs: 5, sm: 10 },
          }}
        />
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
