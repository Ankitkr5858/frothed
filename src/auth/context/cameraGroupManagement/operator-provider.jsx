import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import axios from 'src/utils/axios';

import OperatorContext from './operator-context';

const OperatorContextProvider = ({ children }) => {
  const [inputfieldValue, setInputfieldValue] = useState({});
  const selectedTabFromStorage = sessionStorage.getItem('selectedTab');
  const [groups, setGroups] = useState([]);
  const [camera, setCamera] = useState([]);
  const [cameraBrand, setCameraBrand] = useState([{ value: '1', label: 'Axis' }]);

  const fetchCameraData = useCallback(async (id) => {
    try {
      const response = await axios.get(`/v1/cameras/groups/${id}`);

      setCamera(response.data);
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  }, []);

  const fetchGroupData = useCallback(async () => {
    try {
      const response = await axios.get('/v1/camera-groups');

      setGroups(response.data ?? []);
      if (selectedTabFromStorage) {
        fetchCameraData(Number(selectedTabFromStorage));
      } else {
        fetchCameraData(response.data[0]?.id);
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
      setGroups([]);
    }
  }, [fetchCameraData, selectedTabFromStorage]);

  const CreateGroup = useCallback(async (name) => {
    try {
      const data = { name };
      const response = await axios.post('/v1/camera-groups', data);
      setGroups((prevGroups) => [...prevGroups, response.data]);
      return response;
    } catch (error) {
      let errorMessage;
      if (name.length < 2) {
        errorMessage = 'Name must be at least 2 characters';
      } else {
        errorMessage = `failed to create group  ${error.detail}`;
      }
      throw new Error(errorMessage);
    }
  }, []);

  const CreateCamera = useCallback(
    async (operatorDetailsValue) => {
      const { name } = operatorDetailsValue;
      try {
        const data = {
          ...operatorDetailsValue,
        };

        const response = await axios.post('/v1/cameras', data);

        fetchCameraData(Number(selectedTabFromStorage));

        setInputfieldValue(operatorDetailsValue);
        return response;
      } catch (error) {
        let errorMessage;
        if (name.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        } else {
          errorMessage = `failed to create Camera ${error.detail}`;
        }
        throw new Error(errorMessage);
      }
    },
    [fetchCameraData, setInputfieldValue, selectedTabFromStorage]
  );

  const UpdateCamera = useCallback(
    async (item, updatedCamera) => {
      try {
        await axios.put(`/v1/cameras/${item.id}`, updatedCamera);
        fetchCameraData(item?.groupId);
      } catch (error) {
        let errorMessage;
        if (updatedCamera?.name?.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        } else {
          errorMessage = 'failed to Edit Camera';
        }
        throw new Error(errorMessage);
      }
    },
    [fetchCameraData]
  );

  const UpdateGroup = useCallback(
    async (selectedTabs, editGroupVal, name) => {
      try {
        const selectedGroup = groups[selectedTabs];
        if (!selectedGroup) return;

        const data = {
          name: editGroupVal,
          id: selectedGroup.id,
        };

        await axios.put(`/v1/camera-groups/${selectedGroup.id}`, data);

        const updatedGroups = [...groups];
        updatedGroups[selectedTabs].name = editGroupVal;
        setGroups(updatedGroups);
      } catch (error) {
        console.error('Error updating group:', error);
        let errorMessage =
          name.length < 2 ? 'Name must be at least 2 characters' : 'Failed to update group';
        if (error.detail) {
          errorMessage = `Failed to update group: ${error.detail}`;
        }
        throw new Error(errorMessage);
      }
    },
    [groups]
  );

  const DeleteGroup = useCallback(
    async (selectedTabIndex, currentTabId, setCurrentTab) => {
      try {
        const deletedGroup = groups[selectedTabIndex];
        if (!deletedGroup) return;

        await axios.delete(`/v1/camera-groups/${deletedGroup.id}`);

        const newGroups = groups.filter((group, index) => index !== selectedTabIndex);

        setGroups(newGroups);

        const newTabIndex = newGroups.findIndex((group) => group.id === currentTabId);
        const newTabId =
          newTabIndex !== -1
            ? newGroups[newTabIndex]?.id
            : newGroups[Math.max(selectedTabIndex - 1, 0)]?.id;

        sessionStorage.setItem('selectedTab', newTabId);
        setTimeout(() => {
          setCurrentTab(newTabId);
        }, 1);
      } catch (error) {
        console.error('Error deleting group:', error);
        throw new Error('Failed to delete group');
      }
    },
    [groups]
  );

  const DeleteCamera = useCallback(async (item, itemIndex) => {
    try {
      const response = await axios.delete(`/v1/cameras/${item.id}`);
      setCamera((pre) => pre.filter((cam, index) => index !== itemIndex));

      return response;
    } catch (error) {
      console.error('Error deleting Camera:', error);
      throw new Error('failed to Delete Camera');
    }
  }, []);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  const contextValue = useMemo(
    () => ({
      inputfieldValue,
      setInputfieldValue,
      groups,
      camera,
      setGroups,
      setCamera,
      cameraBrand,
      setCameraBrand,
      CreateGroup,
      UpdateGroup,
      DeleteGroup,
      CreateCamera,
      fetchCameraData,
      DeleteCamera,
      UpdateCamera,
    }),
    [
      inputfieldValue,
      setInputfieldValue,
      groups,
      camera,
      cameraBrand,
      setCamera,
      setCameraBrand,
      CreateGroup,
      UpdateGroup,
      DeleteGroup,
      CreateCamera,
      fetchCameraData,
      DeleteCamera,
      UpdateCamera,
    ]
  );

  return (
    <div>
      <OperatorContext.Provider value={contextValue}>{children}</OperatorContext.Provider>
    </div>
  );
};

OperatorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OperatorContextProvider;
