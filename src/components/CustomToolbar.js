import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import GradeModal from "./GradeModal";



export default function CustomToolbar({ editModalOpen, setEditModalOpen, addedData, setAddedData, onSubmit }) {
    /*  adding a new assignment */
    const OptionButton = styled(Button)(() => ({
        backgroundColor: 'lightblue'
    }))

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