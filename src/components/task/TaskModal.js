import React from 'react';
import {
  FormControl,
  TextField,
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';


function TasKModal({classes,open,taskValues,taskInputChange,editTaskId,handleModal,handleSubmit}){
    console.log(classes)
    return(
        <Dialog open={open} onClose={() => handleModal(false)} PaperProps={{ className: classes.largerModal }}>
        <DialogTitle>{editTaskId === '' ? 'Create' : 'Edit'} Task</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <FormControl fullWidth
              className={classes.addTaskInput} >
              <TextField
                id="outlined-basic"
                label="Title"
                value={taskValues.taskTitle}
                name="taskTitle"
                onChange={taskInputChange}
                required
              />
            </FormControl>

            <TextField fullWidth
              className={classes.addTaskInput}
              id="date"
              type="date"
              value={taskValues.dueDate}
              name="dueDate"
              onChange={taskInputChange}
              required
            />

            <TextField fullWidth
              className={classes.addTaskInput}
              placeholder="text area"
              multiline
              rows={1}
              maxRows={4}
              label="Description"
              value={taskValues.description}
              name="description"
              onChange={taskInputChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleModal(false)} color="primary">
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editTaskId === '' ? 'Add' : 'Update'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
}

export default TasKModal