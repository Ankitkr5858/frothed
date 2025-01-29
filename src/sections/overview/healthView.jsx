import { Box, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
// import { TickIcon } from 'src/components/ui-icons';

export default function HealthPageView() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '40px 0',
        height: '72vh',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            height: '200px',
            width: '200px',
            background: '#F8FAF5',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DoneIcon
            sx={{
              color: 'primary.main',
              fontSize: '80px',
            }}
          />
          {/* <TickIcon height={60} width={60} color="primary.main" className="text-[primary.main]" /> */}
        </Box>
        <Typography
          sx={{
            color: 'primary.main',
            fontWeight: 900,
            fontSize: '40px',
            marginBottom: '10px',
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
          }}
        >
          OK
        </Typography>
      </Box>
    </Box>
  );
}
