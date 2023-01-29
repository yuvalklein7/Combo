import { OpenInNew } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import '../CSS/DataTable.css'
import Trialsmodal from './TrialsModal';
export default function DataTable(props) {
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalData, setModalData] = useState('')
    const removeDuplicates = (arr) => {
        let tmp = [];
        let b = arr.filter(function (v) {
            if (tmp.indexOf(v.toString()) < 0) {
                tmp.push(v.toString());
                return v;
            }
        });
        return b
    }
    const OpenTrials = params => {

        if (params.row.trials.length === 1)
            window.open(`https://clinicaltrials.gov/ct2/show/${params.row.trials[0][0]}`)
        else {
            setOpenModal(true)
            setModalTitle(params.row.drugs)
            setModalData(removeDuplicates(params.row.trials))
        }

    }
    const columns = [{
        field: 'id', headerName: 'ID', flex: 0.3
    },
    {
        field: 'drugs',
        headerName: 'Combination Therapy',
        flex: 2,
        editable: false,
    },
    {
        field: 'drugsCount',
        headerName: '# of drugs',
        flex: 0.5,
        editable: false,
    },
    {
        field: 'occurance',
        headerName: 'Occurrence ',
        flex: 0.5,
        editable: false,
    },
    {
        field: 'trials',
        headerName: 'To Trials',
        flex: 0.5,
        type: 'actions',
        getActions: (params) => [
            <GridActionsCellItem
                icon={< OpenInNew />}
                label="Open"
                onClick={() => OpenTrials(params)}
            />]

    }
    ]
    return (
        <div className="table-content">
            <DataGrid
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
                rows={props.tableRows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
            <Trialsmodal
                open={openModal}
                setOpen={setOpenModal}
                drugs={modalTitle}
                data={modalData}
            />
        </div>)
}