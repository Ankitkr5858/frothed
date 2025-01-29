import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Switch, FormControlLabel } from '@mui/material';

const StreamingButton = () => {
  // State to manage the streaming status and loading state
  const [isStreaming, setIsStreaming] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the current streaming status when the component mounts
  useEffect(() => {
    const fetchStreamingStatus = async () => {
      try {
        setIsLoading(true); // Start loading before fetching
        const response = await axios.get(`${window.API_URL}/v1/configurations`);
        setIsStreaming(response.data.streaming);
      } catch (error) {
        console.error('Error fetching initial streaming status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamingStatus();
  }, []);

  // Function to handle the toggle switch change and make the PUT API call
  const handleStreamingToggle = async (event) => {
    try {
      setIsLoading(true); // Show loading spinner while making the API call
      const newStreamingStatus = event.target.checked;

      const putResponse = await axios.put(`${window.API_URL}/v1/configurations`, {
        streaming: newStreamingStatus,
      });

      if (putResponse.status === 200) {
        setIsStreaming(newStreamingStatus); // Update the streaming status based on the toggle
        // Refresh the page to reflect the new status
        window.location.reload();
      } else {
        console.error('Failed to toggle streaming');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setIsLoading(false); // End loading once the PUT request is complete
    }
  };

  // Loading spinner while fetching the initial state
  // if (isStreaming === null) {
  //   return (
  //     <div>
  //       <CircularProgress size={20} />
  //     </div>
  //   );
  // }

  // Set label text based on loading state and streaming status
  let labelText;
  if (isLoading) {
    labelText = '';
  } else if (isStreaming) {
    labelText = 'Streaming On';
  } else {
    labelText = 'Streaming Off';
  }

  return (
    <div>
      <FormControlLabel
        label={labelText} // Set the label based on conditional logic
        control={
          <Switch
            checked={isStreaming} // Bind the switch state to isStreaming
            onChange={handleStreamingToggle} // Handle the change event
            disabled={isLoading} // Disable the switch while loading
            color="primary"
            name="streaming"
            inputProps={{ 'aria-label': 'streaming toggle' }}
          />
        }
      />
    </div>
  );
};

export default StreamingButton;
