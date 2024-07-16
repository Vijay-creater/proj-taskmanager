import {
    Card,
    CardActionArea,
    Typography,
    CardContent,
    CardActions,
    Button,
    Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const statusColors = {
    "Not Started": "#FF6347", // Tomato
    "In Progress": "#FFD700", // Gold
    "On Hold": "#87CEEB", // SkyBlue
    "Completed": "#32CD32", // LimeGreen
    "Canceled": "#808080", // Gray
};

const useStyles = makeStyles((theme) => ({
    marginRight: {
      marginRight: theme.spacing(1), // You can adjust the spacing as needed
    },
  }));

function TaskDetail({ TaskDetail, getTaskStatus, handlestatusChange, edittaskApi,deleteTaskApi }) {
    const classes = useStyles();

    const { id, title, description, due_date, Status_name, status } = TaskDetail;

    const getStatusColor = (statusName) => {
        return statusColors[statusName] || "#000000"; // Default to black if no matching color
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            deleteTaskApi(id)
        }
      };

    return (
        <Card>
            <CardActionArea>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Typography gutterBottom variant="h5" component="div" style={{ color: getStatusColor(Status_name) }} >
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            Date: {due_date}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button size="small" variant="outlined" color="primary" className={classes.marginRight} onClick={() => edittaskApi(id)}>
                        Edit
                    </Button>
                    <Button size="small"  variant="outlined" style={{ color:"#FF6347" }} onClick={()=>handleDelete(id)}>
                        Delete
                    </Button>
                </div>
                <div>
                    <Select native defaultValue="" id="grouped-native-select" label="Grouping" value={status} name='taskStatus' onChange={(event) => handlestatusChange(event, id)} >
                        {getTaskStatus.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.Status_name}
                            </option>
                        ))}
                    </Select>
                </div>
            </CardActions>
        </Card>
    )
}

export default TaskDetail;