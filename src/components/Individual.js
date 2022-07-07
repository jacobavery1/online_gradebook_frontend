import { IconButton, Modal, Paper, Button } from "@mui/material"
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

    const defaultObj = utils.defaultObj
    const defaultObjII = utils.defaultObjII

    // all assignments associated with the student 
    const [assignments, setAssignments] = useState([])
    // the actual student themselves 
    const [student, setStudent] = useState({})

    // stores props of current row when edit is clicked 
    const [gradeModalProps, setGradeModalProps] = useState(defaultObj)
    // determines weather grade edit modal should be opened or closed 
    const [gradeModalOpen, setGradeModalOpen] = useState()

    // makes sure user wants to delete item 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    // id of the item to delete to pass to the api 
    const [deleteItem, setDeleteItem] = useState('')

    // opens the modal to add data on the datagrid toolbar 
    const [editModalOpen, setEditModalOpen] = useState(false)

    // the data to add to the database 
    const [addedData, setAddedData] = useState(defaultObjII)
    
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

    // runs when you click edit in specific cell
    function handleEditClick(e, cellVals) {
        setGradeModalOpen(!gradeModalOpen)
        setGradeModalProps({...cellVals.row, assignment_date: utils.formatDate(cellVals.row.assignment_date)})
    }
    // runs when you click delete in certian cell 
    function handleDeleteClick(e, cellVals) {
        setDeleteModalOpen(true)
        setDeleteItem(cellVals.row.assignment_id) // sets the item to delete to the delete id
    }

    async function deleteItemFromDB() {
        await utils.deleteAssignment(deleteItem)

        setDeleteItem('')
        setDeleteModalOpen(false)
    }

    // passes function to GradeModal -- runs when submit button is clicked 
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
            await utils.updateAssignment(gradeModalProps.assignment_id, gradeModalProps)
            
            setGradeModalOpen(false)
            setGradeModalProps(defaultObj)
        } 
    }

    // adds new assignment based on the current student id 
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
            await utils.addAssignment(id, addedData)

            setAddedData(defaultObjII)
            setEditModalOpen(false)
        }
    }

    return (
        <div style={{ height: 550, width: '100%', fontFamily: 'Roboto' }}>
            <h3>{student.last_name}, {student.first_name}</h3>
            <p><strong>Grade: </strong>{student.grade_level}</p>
            <p>{student.student_email}</p>
            <DataGrid
                /* the main datagrid that stores the student assignments */
                rows={assignments}
                getRowId={(row) => row.assignment_id}
                rowHeight={25}
                columns={columns}
                sx={utils.sxProp}
                // THIS CONTAINS THE ADD BUTTON
                components={{ Toolbar: CustomToolbar }} // in cutom toolbar another empty grade modal is there to add the new assignment 
                componentsProps={{toolbar: {editModalOpen, setEditModalOpen, addedData, setAddedData, onSubmit}}}
            />
            <GradeModal
                /* opens when edit button is clicked and loads current row's props */
                editModalOpen={gradeModalOpen}
                setEditModalOpen={setGradeModalOpen}
                onSubmit={onSubmitEditModal}
                addedData={gradeModalProps}
                setAddedData={setGradeModalProps}
            />
            <Modal open={deleteModalOpen} >
                <Paper
                    elevation={3}
                    sx={utils.paperSxProps}
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