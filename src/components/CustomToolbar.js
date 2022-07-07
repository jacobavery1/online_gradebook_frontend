import { Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { Modal, Box, Paper } from "@mui/material";
import GradeModal from "./GradeModal";
import { useParams } from "react-router-dom";
import utils from '../utils/utils'


export default function CustomToolbar({ editModalOpen, setEditModalOpen, addedData, setAddedData, onSubmit }) {
    const OptionButton = styled(Button)(() => ({
        backgroundColor: 'lightblue'
    }))

    const { id } = useParams()

    
    
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