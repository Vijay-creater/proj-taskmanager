import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const AlertComponent = () => {
  const [alertProps, setAlertProps] = useState({ visible: false, severity: 'error', content: '', onClose: () => {} });

  // const showAlert = (severity, content, onClose) => {
  //   alert('in alert function')
  //   // Set the alert properties
  //   setAlertProps({ visible: true, severity, content, onClose });

  //   // Auto-hide the alert after 3 seconds
  //   setTimeout(() => {
  //     setAlertProps({ ...alertProps, visible: false });
  //     onClose();
  //   }, 3000);
  // };

  // useEffect(() => {
  //   // Clear the timer on component unmount
  //   return () => clearTimeout();
  // }, []);

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {alertProps.visible && (
        <Alert variant="filled" severity={alertProps.severity}>
          {alertProps.content}
        </Alert>
      )}
    </Stack>
  );
};

export default AlertComponent;
