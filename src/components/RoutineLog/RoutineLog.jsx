import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoutineLog } from '../../redux/actions/logActions';
import MaterialTable from 'material-table';
// MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({}));

const RoutineLog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { routineLog } = useSelector((state) => ({
    routineLog: state.log.routineLog,
  }));
  const routineTableColumns = [
    { title: 'Date', field: 'date' },
    { title: 'Sleep (hour)', field: 'routine.sleep' },
    { title: 'Work (hour)', field: 'routine.work' },
    { title: 'Exercise (hour)', field: 'routine.exercise' },
    { title: 'Relax (hour)', field: 'routine.relax' },
    { title: 'Miscellaneous (hour)', field: 'routine.miscellaneous' },
  ];

  // useEffect(() => {
  //   dispatch(getMediaList());
  //   return () => {};
  // }, [dispatch]);

  return (
    <Paper>
      <MaterialTable
        title='Daily Routine Log'
        icons={tableIcons}
        columns={routineTableColumns}
        data={routineLog}
        editable={{
          // onRowUpdate: (newData) => updateRoutineLog(newData),
          onRowUpdate: (newData) =>
            new Promise((resolve, reject) => {
              console.log(newData);
              resolve();
            }),

          // onRowUpdate: (newData) => dispatch(updateMedia(newData)),

          // onRowDelete: (oldData) => dispatch(deleteMedia(oldData.media_key)),
        }}
      />
    </Paper>
  );
};

export default RoutineLog;
