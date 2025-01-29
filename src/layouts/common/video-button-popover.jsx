import { m } from 'framer-motion';
import { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import VideocamIcon from '@mui/icons-material/Videocam';
import {
  Select,
  MenuItem,
  Checkbox,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import OperatorContext from 'src/auth/context/cameraGroupManagement/operator-context';

import { Camera } from 'src/components/ui-icons';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function VideoBtnPopover() {
  const { groups, cameraBrand, CreateCamera } = useContext(OperatorContext);
  const { enqueueSnackbar } = useSnackbar();
  const [operatorDetailsValue, setOperatorDetailsValue] = useState({
    name: '',
    ipAddress: '',
    groupId: '',
    type: '',
    enabled: false,
  });

  const handelOperatorInputField = (e) => {
    const { name, value, checked, type } = e.target;

    setOperatorDetailsValue((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox using "checked"
    }));
  };

  const drawer = useBoolean();

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Add A New Camera
      </Typography>
    </Stack>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '50px 15px' }}>
          <TextField
            onChange={handelOperatorInputField}
            value={operatorDetailsValue.name}
            id="outlined-basic-name"
            label="Name"
            variant="outlined"
            name="name"
          />
          <TextField
            onChange={handelOperatorInputField}
            value={operatorDetailsValue.ipAddress}
            id="outlined-basic-ip"
            label="Camera IP Address"
            variant="outlined"
            name="ipAddress"
          />
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Group"
                name="groupId"
                onChange={handelOperatorInputField}
                value={operatorDetailsValue.groupId}
              >
                {groups &&
                  groups.length > 0 &&
                  groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Camera Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Camera Brand"
                name="type"
                value={operatorDetailsValue.type}
                onChange={handelOperatorInputField}
              >
                {cameraBrand?.map((brand) => (
                  <MenuItem key={brand.value} value={brand.label}>
                    {brand.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={operatorDetailsValue.enabled} // Controlled checkbox state
                  onChange={handelOperatorInputField} // Updated handler for checkbox
                  name="enabled"
                  color="primary"
                />
              }
              label="Enable"
            />
          </FormControl>
        </Box>
      </List>
    </Scrollbar>
  );
  console.log(operatorDetailsValue);

  return (
    <>
      <Tooltip title="Add Camera">
        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          color={drawer.value ? 'primary' : 'default'}
          onClick={drawer.onTrue}
        >
          <Camera color="rgb(99 115 129 / 64%)" />
        </IconButton>
      </Tooltip>
      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Divider />

        {renderList}

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            size="large"
            onClick={() => {
              // setInputfieldValue((prevInputfieldValue) => [
              //   ...prevInputfieldValue,
              //   operatorDetailsValue,
              // ]);
              CreateCamera(operatorDetailsValue)
                .then((res) => {
                  console.log(operatorDetailsValue)
                  enqueueSnackbar('Camera Add Successfully', { variant: 'success' });
                })
                .catch((err) => {
                  enqueueSnackbar(err.message, { variant: 'error' });
                });
              setOperatorDetailsValue({
                name: '',
                ipAddress: '',
                groupId: '',
                type: '',
                enabled: false,
              });
              drawer.onFalse();
            }}
          >
            Save
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
