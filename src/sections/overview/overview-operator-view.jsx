import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
  List,
  Grid,
  Stack,
  Drawer,
  Select,
  Dialog,
  Divider,
  Tooltip,
  Checkbox,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
  useTheme,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import OperatorContext from 'src/auth/context/cameraGroupManagement/operator-context';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { DeleteIcon, EditPencilIcon } from 'src/components/ui-icons';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

const OverviewOperatorView = () => {
  const selectedTabFromStorage = sessionStorage.getItem('selectedTab');
  const getNewGroupID = sessionStorage.getItem('newTab');

  const {
    groups,
    camera,
    cameraBrand,
    CreateGroup,
    UpdateGroup,
    DeleteGroup,
    fetchCameraData,
    DeleteCamera,
    UpdateCamera,
  } = useContext(OperatorContext);

  const [currentTab, setCurrentTab] = useState(
    selectedTabFromStorage ? Number(selectedTabFromStorage) : groups[0]?.id
  );
  const [cycleTime, setCycleTime] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [editGroupVal, setEditGroupVal] = useState('');
  const [selectedTabs, setSelectedTabs] = useState();
  const [cameraId, setCameraId] = useState();
  const intervalRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  // const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [nameVal, setNameVal] = useState();
  const [ipAdressVal, setIpAdressVal] = useState();
  const [groupsVal, setGroupsVal] = useState();
  const [brandVal, setBrandVal] = useState();
  const [enabledVal, setEnabledVal] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const theme = useTheme();

  const popover = usePopover();

  const handleChangeTab = useCallback(
    (event, newValue) => {
      setCurrentTab(newValue);
      sessionStorage.setItem('selectedTab', newValue);
      fetchCameraData(newValue);
    },
    [fetchCameraData]
  );

  const handelAddNewGroup = (e) => {
    setInputValue(e.target.value);
  };

  const handelEditGroup = (e) => {
    setEditGroupVal(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen('addTabs');
  };

  const handleCloseModal = () => {
    setIsModalOpen('');
  };

  const handleCameraClick = (el) => {
    setSelectedCamera(el);
    setIsCameraModalOpen(true);
  };

  const handleCloseCameraModal = () => {
    setIsCameraModalOpen(false);
    setSelectedCamera(null);
  };

  const handleSaveNewGroup = () => {
    if (isModalOpen === 'EditTabs') {
      UpdateGroup(selectedTabs, editGroupVal, editGroupVal)
        .then((res) => {
          enqueueSnackbar('Group Edit Successfully', { variant: 'success' });
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
    } else {
      CreateGroup(inputValue)
        .then((res) => {
          enqueueSnackbar('Group Add Successfully', { variant: 'success' });
          console.log('res', res.data.id);
          const grpID = res?.data?.id;
          if (groups && groups.length === 0) {
            setTimeout(() => {
              setCurrentTab(grpID);
              sessionStorage.setItem('selectedTab', grpID);
            }, 1);
          } else {
            setTimeout(() => {
              setCurrentTab(currentTab);
            }, 1);
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: 'error' });
          console.log('err', err);
        });
    }

    setInputValue('');
    handleCloseModal();
  };

  const handelOpenEditModal = () => {
    setIsModalOpen('EditTabs');
    popover.onClose();
  };

  const handelDeleteTabs = () => {
    DeleteGroup(selectedTabs, currentTab, setCurrentTab)
      .then((res) => {
        enqueueSnackbar('Group Delete Successfully', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Failed To Delete Group', { variant: 'error' });
      });

    popover.onClose();
  };

  const handelOpenPopover = (event, index) => {
    event.stopPropagation();
    popover.onOpen(event);
    setSelectedTabs(index);
  };

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{ fontSize: '20px', padding: '20px', margin: '20px' }}
    >
      {groups &&
        groups.length > 0 &&
        groups?.map((tab, index) => (
          <Tab
            key={tab.id}
            iconPosition="end"
            value={tab.id}
            label={
              <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {tab.name}
                <IconButton
                  onClick={(e) => {
                    handelOpenPopover(e, index);
                  }}
                  color="default"
                >
                  <EditPencilIcon height={15} width={15} color="#737373" />
                </IconButton>
              </Box>
            }
            sx={{
              '&:not(:last-of-type)': {
                marginRight: 3,
              },
              fontSize: '16px',
              padding: '12px 20px',
            }}
          />
        ))}
    </Tabs>
  );

  const handleCycleTimeChange = (event) => {
    const newCycleTime = parseInt(event.target.value, 10);
    setCycleTime(newCycleTime);
    if (newCycleTime !== 0) {
      fetchCameraData(currentTab);
    }
  };

  useEffect(() => {
    if (cycleTime !== 0) {
      clearInterval(intervalRef.current);

      const id = setInterval(() => {
        const currentIndex = groups.findIndex((tab) => tab.id === currentTab);
        const nextIndex = (currentIndex + 1) % groups.length;
        setCurrentTab(groups[nextIndex].id);
      }, cycleTime * 1000);

      intervalRef.current = id;
    }
    fetchCameraData(currentTab);
    return () => clearInterval(intervalRef.current);
  }, [cycleTime, currentTab, groups, fetchCameraData]);

  useEffect(() => {
    if (selectedTabFromStorage) {
      setCurrentTab(Number(selectedTabFromStorage));
    } else {
      setCurrentTab(groups[0]?.id);
    }
  }, [groups, selectedTabFromStorage, getNewGroupID]);

  const drawer = useBoolean();

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Edit A Camera
      </Typography>
    </Stack>
  );

  const handleChangeName = (event) => {
    setNameVal(event.target.value);
  };
  const handleChangeEdit = (event) => {
    setIpAdressVal(event.target.value);
  };
  const handleChangeGroup = (event) => {
    setGroupsVal(event.target.value);
  };
  const handelCameraBrand = (event) => {
    setBrandVal(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    setEnabledVal(event.target.checked);
  };

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '50px 15px' }}>
          <TextField
            value={nameVal}
            id="outlined-basic-name"
            label="Name"
            variant="outlined"
            name="name"
            onChange={handleChangeName}
          />
          <TextField
            value={ipAdressVal}
            id="outlined-basic-ip"
            label="Camera IP Address"
            variant="outlined"
            name="ipAdress"
            onChange={handleChangeEdit}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Group"
              name="group"
              value={groupsVal}
              onChange={handleChangeGroup}
            >
              {groups &&
                groups.length > 0 &&
                groups?.map((tab) => (
                  <MenuItem key={tab.id} value={tab.id}>
                    {tab.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Camera Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Camera Brand"
              name="brand"
              value={brandVal}
              onChange={handelCameraBrand}
            >
              {cameraBrand?.map((brand) => (
                <MenuItem key={brand.value} value={brand.label}>
                  {brand.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enabledVal} // Controlled checkbox state
                  onChange={handleCheckboxChange} // Handle toggle changes
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

  const handleEditClick = (item, index) => {
    // setSelectedItemIndex(index);
    drawer.onTrue();

    setCameraId(item);
    const selectedName = camera[index]?.name;
    setNameVal(selectedName);
    const selectedIpAdress = camera[index]?.ipAddress;
    setIpAdressVal(selectedIpAdress);
    const selectedGroups = camera[index]?.groupId;
    setGroupsVal(selectedGroups);
    const selectedBrand = camera[index]?.type;
    setBrandVal(selectedBrand);
    const selectedEnabled = camera[index]?.enabled; // Initialize enabled state
    setEnabledVal(selectedEnabled);
  };

  const [imageData, setImageData] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteCameraItem, setDeleteCameraItem] = useState(null);
  const timeoutRefs = useRef({}); // To track timeouts for each camera

  useEffect(() => {
    if (!camera?.length) return () => {};

    const socket = new WebSocket('wss://0220677409dd.ngrok.app/streamImage');
    const timeoutMap = timeoutRefs.current; // Save current ref to a local variable

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      camera.forEach((item) => {
        const currentCameraId = item.id;

        if (data[currentCameraId]) {
          if (timeoutMap[currentCameraId]) {
            clearTimeout(timeoutMap[currentCameraId]);
          }

          setImageData((prevData) => ({
            ...prevData,
            [currentCameraId]: {
              data: data[currentCameraId],
              lastUpdated: Date.now(),
            },
          }));

          timeoutMap[currentCameraId] = setTimeout(() => {
            setImageData((prevData) => ({
              ...prevData,
              [currentCameraId]: {
                ...prevData[currentCameraId],
                data: null,
              },
            }));
          }, 2000);
        }
      });
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
      Object.values(timeoutMap).forEach((timeout) => clearTimeout(timeout));
    };
  }, [camera]);

  // console.log(camera, imageData);
  const renderCameraContent = (item) => {
    if (item.enabled && imageData[item.id]?.data) {
      return (
        <embed
          src={`data:image/jpeg;charset=utf-8;base64,${imageData[item.id].data}`}
          type="image/jpeg"
          style={{ width: '300px', height: '300px' }}
        />
      );
    }

    if (item.enabled && !imageData[item.id]?.data) {
      return (
        <iframe
          style={{
            pointerEvents: 'none',
            border: 'none',
            borderRadius: '0',
          }}
          width="100%"
          height="360"
          src={`http://${item.ipAddress}/axis-cgi/mjpg/video.cgi?resolution=480x360&color=1`}
          title="Video 1"
          scrolling="no"
          allowFullScreen
        />
      );
    }

    return <div style={{ height: '100%', width: '100%', background: 'black' }} />;
  };
  const renderCameraModal = (item) => {
    if (!item) return null; // Return null if no item is provided
    console.log(item);
    let content;

    if (item.enabled && imageData[item.id]?.data) {
      // Case 1: Camera is enabled, and image data is available
      content = (
        <embed
          src={`data:image/jpeg;charset=utf-8;base64,${imageData[item.id].data}`}
          type="image/jpeg"
          style={{ width: '100%', height: '600px', pointerEvents: 'none' }}
        />
      );
    } else if (item.enabled && !imageData[item.id]?.data) {
      // Case 2: Camera is enabled, but no image data
      content = (
        <iframe
          style={{ pointerEvents: 'none', border: 'none', borderRadius: '0' }}
          width="100%"
          height="600px"
          src={`http://${item.ipAddress}/axis-cgi/mjpg/video.cgi?resolution=480x360&color=1`}
          title="Camera Video Stream"
          scrolling="no"
          allowFullScreen
        />
      );
    } else {
      // Case 3: Camera is disabled
      content = (
        <Box
          sx={{
            height: 600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" color="white">
            Camera is disabled
          </Typography>
        </Box>
      );
    }

    return (
      <Modal
        open={isCameraModalOpen}
        onClose={handleCloseCameraModal}
        sx={{ outline: 'none' }}
        BackdropProps={{
          sx: {
            backgroundColor:
              theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : '', // White for light mode, black for dark mode
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 2,

            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleCloseCameraModal}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              height: '10px',
              width: '10px',
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
          {content}
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            width: '100%',
          }}
        >
          {renderTabs}
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{ minWidth: '100px', maxWidth: '100px', marginRight: '20px' }}
          >
            Add Group
          </Button>
        </Box>
        <Box>
          <FormControl sx={{ width: '200px' }}>
            <InputLabel htmlFor="cycle-time-select">Cycle Time</InputLabel>
            <Select
              id="cycle-time-select"
              onChange={handleCycleTimeChange}
              value={cycleTime.toString()}
              label="Cycle Time"
            >
              <MenuItem value="0">None</MenuItem>
              <MenuItem value="15">15</MenuItem>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="45">45</MenuItem>
              <MenuItem value="60">60</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {camera?.map((item, itemIndex) => (
            <Grid item xs={12} sm={4} md={4} lg={4} key={itemIndex}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {item?.name}
                  </Typography>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditClick(item, itemIndex)} color="default">
                      <EditPencilIcon height={24} width={24} color="#737373" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        setDeleteCameraItem(item);
                        setIsConfirmOpen(true);
                      }}
                      color="#737373"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                      <Typography>Are you sure you want to delete this camera?</Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setIsConfirmOpen(false)} color="inherit">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          DeleteCamera(deleteCameraItem, itemIndex)
                            .then((res) => {
                              fetchCameraData(currentTab);
                              enqueueSnackbar('Camera Delete Successfully', { variant: 'success' });
                            })
                            .catch((err) => {
                              enqueueSnackbar('Failed To Delete Camera', { variant: 'error' });
                            });
                          setIsConfirmOpen(false); // Close the dialog
                        }}
                        color="error"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    height: '360px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: imageData[item.id]?.data ? 'transparent' : 'transparent', // Black box if no data
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCameraClick(item)}
                >
                  {renderCameraContent(item)}
                </Box>
              </Box>
              {renderCameraModal(selectedCamera)}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={isModalOpen !== ''} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 3,
            outline: 'none',
            borderRadius: 2,
          }}
        >
          {isModalOpen === 'addTabs' && (
            <>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Add Group
              </Typography>
              <TextField
                onChange={handelAddNewGroup}
                value={inputValue}
                label="Enter Group Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </>
          )}

          {isModalOpen === 'EditTabs' && (
            <>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Edit Group
              </Typography>
              <TextField
                onChange={handelEditGroup}
                label="Enter Group Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '8px',
            }}
          >
            <Button variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewGroup} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
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
        {renderHead} <Divider />
        <Divider />
        {renderList}
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            size="large"
            onClick={() => {
              const updatedCamera = {
                name: nameVal,
                ipAddress: ipAdressVal,
                groupId: groupsVal,
                type: brandVal,
                enabled: enabledVal,
              };
              UpdateCamera(cameraId, updatedCamera)
                .then((res) => {
                  enqueueSnackbar('Camera Edit Successfully', { variant: 'success' });
                })
                .catch((err) => {
                  enqueueSnackbar(err.message, { variant: 'error' });
                });
              drawer.onFalse();
            }}
          >
            Save
          </Button>
        </Box>
      </Drawer>
      <CustomPopover
        arrow="top-left"
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 150, p: 0 }}
      >
        <MenuItem
          onClick={handelOpenEditModal}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'seagreen' }}
        >
          Edit
        </MenuItem>

        <MenuItem
          onClick={handelDeleteTabs}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
};

export default OverviewOperatorView;
