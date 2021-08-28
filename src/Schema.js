import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect({props}) {
  console.log(props)
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {

    console.log(event.target.value)

    setAge(event.target.value);


  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-controlled-open-select-label">Schema</InputLabel> */}
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>First Name</MenuItem>
          <MenuItem value={20}>Last Name</MenuItem>
          <MenuItem value={30}>Age</MenuItem>
          <MenuItem value={40}>Gender</MenuItem>
          <MenuItem value={50}>Profession</MenuItem>
          <MenuItem value={60}>Contact</MenuItem>
          <MenuItem value={70}>Address</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
    