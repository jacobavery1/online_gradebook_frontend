import { Typography, IconButton, Modal, Paper, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CustomToolbar from "./CustomToolbar"
import utils from "../utils/utils"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GradeModal from "./GradeModal"

export default function Individual() {
    const { id } = useParams()

    const defaultObj = {
        assignment_date: '', 
        assignment_grade: '', 
        assignment_name: '', 
        class_name: '', 
        semester: '', 
        assignment_id: ''
    }

    const defaultObjII = {
        assignment_date: '', 
        assignment_grade: '', 
        assignment_name: '', 
        class_name: '', 
        semester: ''
    }

    const [assignments, setAssignments] = useState([])
    const [student, setStudent] = useState({})

    const [gradeModalProps, setGradeModalProps] = useState(defaultObj)
    const [gradeModalOpen, setGradeModalOpen] = useState()

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [deleteItem, setDeleteItem] = useState('')

    const [editModalOpen, setEditModalOpen] = useState(false)

    const [addedData, setAddedData] = useState(defaultObjII)

    //const [editModalOpen, setEditModalOpen]
    
    useEffect(() => {
        (async () => {
            const data = await utils.getStudentGrades(id)
            utils.changeDateFormat(data)
            setAssignments(data)
            const data2 = await utils.getStudent(id)
            setStudent(data2)
        })() 
    }, [deleteItem, gradeModalProps, addedData])

    const columns = [
        { field: 'class_name', headerName: 'Class Name', width: 250 }, 
        { field: 'assignment_name', headerName: 'Assignment Name', width: 250 },
        { field: 'assignment_date', headerName: 'Assignment Date', width: 200 }, 
        { field: 'assignment_grade', headerName: 'Assignment Grade', width: 200},
        {
            field: 'Edit',
            renderCell: (cellValues) => {
                return (
                    <div>
                    <IconButton sx={{height: 24, width: 24}} onClick={(e) => handleEditClick(e, cellValues)}>
                        <EditIcon sx={{height: 15}} />
                    </IconButton>
                    <IconButton sx={{height: 24, width: 24}} onClick={e => handleDeleteClick(e, cellValues)} >
                            <DeleteIcon sx={{height: 15}} />
                        </IconButton>
                        </div>
            )
        }}
    ]

    

    function handleEditClick(e, cellVals) {
        //console.log(cellVals.row)
        setGradeModalOpen(!gradeModalOpen)
        setGradeModalProps({...cellVals.row, assignment_date: utils.formatDate(cellVals.row.assignment_date)})
    }

    async function onSubmitEditModal() {
        let allOk = true 
        for (const property in gradeModalProps) {
            if (gradeModalProps[property] == '') {
                alert('please fill out all fields')
                allOk = false
                break 
            }
        }

        if (allOk) {
            //console.log(addedData)
            const update = await utils.updateAssignment(gradeModalProps.assignment_id, gradeModalProps)
            //console.log(update)

            setGradeModalOpen(false)
            setGradeModalProps(defaultObj)
            //console.log(addedData)
        } 
    }

    function handleDeleteClick(e, cellVals) {
        setDeleteModalOpen(true)
        setDeleteItem(cellVals.row.assignment_id)
    }

    async function deleteItemFromDB() {
        const del = await utils.deleteAssignment(deleteItem)
        //console.log(del)
        setDeleteItem('')
        setDeleteModalOpen(false)
    }

    
    

    // will add in a new assignment and update the data from here calling to the api and then refreshing the page 
    

    async function onSubmit() {
        let allOk = true 
        for (const property in addedData) {
            if (addedData[property] == '') {
                alert('please fill out all fields')
                allOk = false
                break 
            }
        }

        if (allOk) {
            //console.log(addedData)
            const added = await utils.addAssignment(id, addedData)
            //console.log(added)

            setAddedData(defaultObjII)
            setEditModalOpen(false)
            //console.log(addedData)
        }
    }


    return (
        <div style={{ height: 550, width: '100%', fontFamily: 'Roboto' }}>
            <h3>{student.last_name}, {student.first_name}</h3>
            <p><strong>Grade: </strong>{student.grade_level}</p>
            <p>{student.student_email}</p>
            <DataGrid
                rows={assignments}
                getRowId={(row) => row.assignment_id}
                rowHeight={25}
                columns={columns}
                sx={utils.sxProp}
                components={{ Toolbar: CustomToolbar }}
                componentsProps={{toolbar: {editModalOpen, setEditModalOpen, addedData, setAddedData, onSubmit}}}
            />
            <GradeModal
                editModalOpen={gradeModalOpen}
                setEditModalOpen={setGradeModalOpen}
                onSubmit={onSubmitEditModal}
                addedData={gradeModalProps}
                setAddedData={setGradeModalProps}
            />
            <Modal
                open={deleteModalOpen}
            >
                <Paper
                    elevation={3} sx={{
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        width: 550, 
                        bgcolor: 'whitesmoke',
                        padding: 5, 
                        display: 'flex', 
                        flexDirection: 'column'
                    }}
                >
                    <div>
                        <h3 style={{fontFamily: 'Roboto'}}>Are you sure you want to delete this assignment?</h3>
                        <div>
                        <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                        <Button onClick={deleteItemFromDB}>Delete</Button>
                        </div>
                    </div>
                    
                </Paper>
            </Modal>
        </div>
    )
}