import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  presentRoutineLog,
  updateRoutineLog,
  deleteRoutineLog,
} from '../../redux/actions/logActions';
import MaterialTable from 'material-table';
// MUI
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// Icons
import tableIcons from './RoutineLogTableIcons';
import InsertChartIcon from '@material-ui/icons/InsertChart';

const RoutineLog = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) =>
    state.ui.errors ? state.ui.errors : ''
  );
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
  const tableTitle = (
    <React.Fragment>
      <Box component='h3' marginBottom='5px'>
        Daily Routine Log
      </Box>
      {errors.logTable && (
        <Box component='span' color='red'>
          {errors.logTable}
        </Box>
      )}
    </React.Fragment>
  );

  return (
    <Paper>
      <MaterialTable
        title={tableTitle}
        icons={tableIcons}
        columns={routineTableColumns}
        data={routineLog}
        actions={[
          {
            icon: () => <InsertChartIcon />,
            tooltip: 'Display as chart',
            onClick: (event, rowData) => dispatch(presentRoutineLog(rowData)),
          },
        ]}
        editable={{
          onRowUpdate: (newData) => dispatch(updateRoutineLog(newData)),
          onRowDelete: (oldData) => dispatch(deleteRoutineLog(oldData)),
        }}
      />
    </Paper>
  );
};

export default RoutineLog;
