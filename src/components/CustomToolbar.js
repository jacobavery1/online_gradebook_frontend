import { Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { Modal, Box, Paper } from "@mui/material";
import GradeModal from "./GradeModal";
import { useParams } from "react-router-dom";
import utils from '../utils/utils'


export default function CustomToolbar() {
    const OptionButton = styled(Button)(() => ({
        backgroundColor: 'lightblue'
    }))

    const { id } = useParams()

    const [editModalOpen, setEditModalOpen] = useState(false)

    const defaultObj = {
        assignment_date: '', 
        assignment_grade: '', 
        assignment_name: '', 
        class_name: '', 
        semester: ''
    }

    // will add in a new assignment and update the data from here calling to the api and then refreshing the page 
    const [addedData, setAddedData] = useState(defaultObj)

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
            console.log(added)

            setAddedData(defaultObj)
            setEditModalOpen(false)
            //console.log(addedData)
        }
    }
    
    /* onclick open add modal */
    return (
        <GridToolbarContainer>
            <OptionButton onClick={() => setEditModalOpen(!editModalOpen)}><AddIcon />Add</OptionButton>
            <GradeModal
                editModalOpen={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                addedData={addedData}
                setAddedData={setAddedData}
                onSubmit={onSubmit}
            />
        </GridToolbarContainer>
    )
}