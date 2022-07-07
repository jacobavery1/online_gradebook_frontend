import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import utils from '../utils/utils'
import HomeToolBar from './HomeToolBar'

export default function Home() {
    const navigate = useNavigate()
    
    // all students in database
    const [students, setStudents] = useState([])

    const defaultObj = utils.studentSchemaObj

    // added student when user clicks add student 
    const [addedStudent, setAddedStudent] = useState(defaultObj)
    // sets weather the modal is open passed in the toolbar componentsProps 
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        (async () => {
            const s = await utils.getStudents()
            setStudents(s)
        })()
    }, [addedStudent, modalOpen])

    async function addPersonToDB() {
        let allOk = true 
        for (const property in addedStudent) {
            if (addedStudent[property] == '') {
                alert('please fill out all fields')
                allOk = false
                break 
            }
        }

        if (allOk) {
            await utils.addPerson(addedStudent)
            setModalOpen(false)
            setAddedStudent(defaultObj)
        }
    }

    const columns = [
        { field: 'last_name', headerName: 'Last Name', width: 250 }, 
        { field: 'first_name', headerName: 'First Name', width: 250 },
        { field: 'grade_level', headerName: 'Grade Level', width: 100 }, 
        { field: 'student_email', headerName: 'Student Email', width: 300} 
    ]
    
    return (
        <div style={{height: 650, width: '100%'}}>
            <DataGrid
                /* main datagrid on the homepage */
                sx={utils.sxProp}
                rowHeight={25}
                rows={students}
                columns={columns}
                getRowId={(row) => row.student_id}
                onCellDoubleClick={(params, event) => navigate(`/${params.row.student_id}`)}
                components={{ Toolbar: HomeToolBar }}
                componentsProps={{toolbar: { addedPerson: addedStudent, setAddedPerson: setAddedStudent, modalOpen, setModalOpen, addPersonToDB }}}
            />
        </div>
    )
}