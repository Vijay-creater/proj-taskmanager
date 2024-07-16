import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  CardContent,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopNavBar from './TopNavBar';
import TaskDetail from './TaskDetail';
import TaskModal from './TaskModal';
import config from '../../config';
import TaskFilter from './TaskFilter';

const useStyles = makeStyles((theme) => ({
  taskListContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  selectInput: {
    marginRight: theme.spacing(2),
    width: '13rem',
    background: '#F4F4F4',
    borderRadius: theme.shape.borderRadius,
  },
  addCard: {
    width: '95%',
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  plusIcon: {
    fontSize: 40,
    color: theme.palette.primary.main,
  },
  tasklistdiv: {
    margin: theme.spacing(3),
  },
  largerModal: {
    width: '40%',
    maxWidth: 'none',
  },
  addTaskInput: {
    marginBottom: theme.spacing(2),
    background: '#F4F4F4',
    borderRadius: theme.shape.borderRadius,
  },
}));

function TaskList() {
  const classes = useStyles();
  const { apiUrl } = config;
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName');
  if (!userId) {
    window.location.href = '/';
  }

  // task filter ---------------------------------------------------------------------
  const initialFilterValues = {
    taskStatus: '',
    selectedDate: '',
    searchTerm: '',
  };
  const [filterValues, setFilterValues] = useState(initialFilterValues);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    getTaskListApi()
  }, [filterValues]);

  // task statue -----------------------------------------------------------------
  const [getTaskStatus, setGetTaskStatus] = useState([])
  useEffect(() => {
    getTaskStatusList()
  }, []);

  const getTaskStatusList = async () => {
    try {
      const response = await fetch(`${apiUrl}task/status/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch task statuses. Status: ${response.status}`);
      }
      const data = await response.json();
      setGetTaskStatus(data);
    } catch (error) {
      console.error('Error fetching task statuses:', error.message);
    }
  };


  // change task status -------------------------------------------------------------
  const handlestatusChange = (event, taskid) => {
    const value = event.target.value;
    changeTaskStatus(value, taskid)
  };

  const changeTaskStatus = async (value, taskid) => {
    try {
      const formData = new FormData();
      formData.append('status', value);
      formData.append('id', taskid);
      const response = await fetch(`${apiUrl}task/status/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch task statuses. Status: ${response.status}`);
      } else {
        getTaskListApi()
      }
    } catch (error) {
      console.error('Error fetching task statuses:', error.message);
    }
  };

  //get task list ---------------------------------------------------------------------
  const [getTaskList, setGetTaskList] = useState([])
  const [getTaskCount, setGetTaskCount] = useState(0)
  useEffect(() => {
    getTaskListApi()
  }, []);

  const getTaskListApi = async () => {
    try {
      const url = `${apiUrl}task/?taskStatus=${filterValues.taskStatus}&selectedDate=${filterValues.selectedDate}&searchTerm=${filterValues.searchTerm}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch task statuses. Status: ${response.status}`);
      }
      const data = await response.json();
      setGetTaskCount(data.length);
      setGetTaskList(data);
    } catch (error) {
      console.error('Error fetching task statuses:', error.message);
    }
  };

  const handleSearchSubmit = () => {
    console.log('Search term:', filterValues.searchTerm);
  };

  // model handleing -------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');
  const handleModal = (value, taskid = '') => {
    setOpen(value);
    if (value && taskid !== '') {
      setEditTaskId(taskid)
    } else {
      setEditTaskId('')
      setTaskValues((prevValues) => ({
        ...prevValues,
        taskTitle: '',
        dueDate: '',
        description: '',
      }));
    }
  };

  // const handleCancel = () => {
  //   // setFormData(initialFormData);
  // };

  // add task -------------------------------------------------------------
  const initialTaskValues = {
    taskTitle: '',
    dueDate: '',
    description: '',
  };
  const [taskValues, setTaskValues] = useState(initialTaskValues);

  const taskInputChange = (event) => {
    const { name, value } = event.target;
    setTaskValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    console.log(taskValues);
  }, [taskValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      description: data.get('description'),
      dueDate: data.get('dueDate'),
      taskTitle: data.get('taskTitle'),
    });
    addTaskApi(data.get('taskTitle'), data.get('description'), data.get('dueDate'))
  };

  const addTaskApi = async (title, description, dueDate) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('due_date', dueDate);
      const methodtype = editTaskId === '' ? 'POST' : 'PUT';
      if (editTaskId !== '') {
        formData.append('id', editTaskId);
      }
      const response = await fetch(`${apiUrl}task/`, {
        method: methodtype,
        body: formData,
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        // alert('hi')
        // showAlert('success',`Task ${editTaskId === ''?'Created':'Updated'} Successfully`)
        getTaskListApi()
        setTaskValues(initialTaskValues)
        handleModal(false)
      } else {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            let value = data[key];
            if (typeof value === 'object' && value !== null && Array.isArray(value)) {
              alert(value[0])
            } else {
              alert(value)
            }
          }
        }
      }
    } catch (error) { 
      console.log(error.message)
      console.error('Error fetching task statuses:', error.message);
    }
  }

  // task edit --------------------------------------------------------------------------------------------
  const edittaskApi = async (taskid) => {
    try {
      const url = `${apiUrl}task/?id=${taskid}`
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch task statuses. Status: ${response.status}`);
      } else {
        const data = await response.json();
        setTaskValues((prevValues) => ({
          ...prevValues,
          taskTitle: data.title,
          dueDate: data.due_date,
          description: data.description
        }));
        handleModal(true, taskid)

      }
    } catch (error) {
      console.error('Error fetching task statuses:', error.message);
    }
  }

  // task delete --------------------------------------------------------------------------------------------
  const deleteTaskApi = async (taskid) => {
    try {
      const url = `${apiUrl}task/?id=${taskid}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch task statuses. Status: ${response.status}`);
      } else {
        getTaskListApi()

      }
    } catch (error) {
      console.error('Error fetching task statuses:', error.message);
    }
  }

  return (
    <div>
      < TopNavBar userName={userName} />
      <div className={classes.taskListContainer}>
        <div>
          <h2>Task List ({getTaskCount})</h2>
        </div>
        <TaskFilter classes={classes}  filterValues={filterValues} handleFilterChange={handleFilterChange} getTaskStatus={getTaskStatus} handleSearchSubmit={handleSearchSubmit}/>
      </div>
      <div className={classes.tasklistdiv}>
        <Grid container spacing={2}>
          {getTaskList.map((task) => (
            <Grid item xs={6} md={4} xl={3} key={task.id}>
              <TaskDetail TaskDetail={task} getTaskStatus={getTaskStatus} handlestatusChange={handlestatusChange} edittaskApi={edittaskApi} deleteTaskApi={deleteTaskApi} />
            </Grid>
          ))}
          <Grid item xs={6} md={4} xl={3}>
            <Card className={classes.addCard}>
              <CardContent>
                <Button onClick={() => handleModal(true)} >
                  <span className={classes.plusIcon}>+</span>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <TaskModal classes={classes} open={open} taskValues={taskValues} 
                 taskInputChange={taskInputChange} editTaskId={editTaskId} 
                 handleModal = {handleModal} handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default TaskList;
