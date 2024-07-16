import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';

function TaskFilter({classes,filterValues,handleFilterChange,getTaskStatus,handleSearchSubmit}){
    return(
        <div style={{ display: 'flex' }}>
          <div className={classes.selectInput} >
            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
              <InputLabel htmlFor="grouped-native-select"></InputLabel>
              <Select native defaultValue="" id="grouped-native-select" label="Grouping" value={filterValues.taskStatus} name='taskStatus' onChange={handleFilterChange}>
                <option value="" >
                  All Status
                </option>
                {getTaskStatus.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.Status_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>

          <TextField
            className={classes.selectInput}
            id="date"
            label="Select Date"
            type="date"
            value={filterValues.selectedDate}
            name='selectedDate'
            onChange={handleFilterChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.selectInput}
            label="Search"
            variant="outlined"
            value={filterValues.searchTerm}
            name='searchTerm'
            onChange={handleFilterChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchSubmit}>
                    <span>-|-</span>               </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
    )
}

export default TaskFilter