import { m } from 'framer-motion';
import { useState, useCallback } from 'react';

import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import { TabList, TabPanel, TabContext, LoadingButton } from '@mui/lab';
import {
  Tab,
  Button,
  Dialog,
  Tooltip,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import { varHover } from 'src/components/animate';
import { BackupIcon } from 'src/components/ui-icons';
// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const exportFile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const handleDrop = useCallback((acceptedFiles) => {
    const File = acceptedFiles[0];

    if (File) {
      setFile(
        Object.assign(File, {
          preview: URL.createObjectURL(File),
        })
      );
    }
  }, []);
  console.log(file);
  return (
    <>
      <Tooltip title="Backup">
        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          color={open ? 'inherit' : 'default'}
          onClick={handleClickOpen}
          sx={{
            ...(open && {
              bgcolor: (theme) => theme.palette.action.selected,
            }),
          }}
        >
          {/* <Iconify icon="solar:file-download-bold-duotone" width={24} /> */}
          <BackupIcon color="#737373" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Backup</DialogTitle>
        <DialogContent>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList variant="fullWidth" onChange={handleChange}>
                <Tab label="Export" value="1" />
                <Tab label="Import" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <DialogContentText>
                  This option will export a full backup of the Froth ID configuration. You need to
                  add an export comment to perform this action.
                </DialogContentText>
                <LoadingButton
                  sx={{ px: 5 }}
                  onClick={exportFile}
                  loading={loading}
                  variant="contained"
                  color="primary"
                >
                  <span>Export</span>
                </LoadingButton>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <DialogContentText my={2} sx={{ textAlign: 'center' }}>
                This option will import a previous backup of the Froth ID configuration. Use it
                carefully as the entire configuration will be replaced.
              </DialogContentText>
              {file && file.name ? (
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <LoadingButton
                    sx={{ px: 5 }}
                    onClick={exportFile}
                    loading={loading}
                    variant="contained"
                    color="primary"
                  >
                    <span>Import</span>
                  </LoadingButton>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography>{file && file.name}</Typography>
                    <IconButton onClick={() => setFile(null)} size="small">
                      <Iconify icon="solar:trash-bin-minimalistic-outline" width={20} />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Upload file={file} onDrop={handleDrop} />
              )}
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
