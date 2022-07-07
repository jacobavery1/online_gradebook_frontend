import { GridToolbarContainer } from "@mui/x-data-grid"
import { styled } from "@mui/system"
import { Button, Paper, TextField, Modal, MenuItem } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import utils from '../utils/utils'


export default function HomeToolBar({ addedPerson, setAddedPerson, modalOpen, setModalOpen, addPersonToDB }) {
    /* props passed from home.sj */
    
    const OptionButton = styled(Button)(() => ({
        backgroundColor: 'lightblue'
    }))

    return (
        <GridToolbarContainer>
            <OptionButton onClick={() => setModalOpen(!modalOpen)}><AddIcon /> Add</OptionButton>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Paper
                    sx={{...utils.paperSxProps, gap: 2}}
                >
                    <TextField
                        label="Last name"
                        variant="outlined"
                        value={addedPerson.last_name}
                        onChange={(e) => setAddedPerson({...addedPerson, last_name: e.target.value})}
                    />
                    <TextField
                        label="First name"
                        variant="outlined"
                        value={addedPerson.first_name}
                        onChange={(e) => setAddedPerson({...addedPerson, first_name: e.target.value})}
                    />
                    <TextField
                        select
                        label="Grade"
                        variant="outlined"
                        value={addedPerson.grade_level}
                        onChange={(e) => setAddedPerson({...addedPerson, grade_level: e.target.value})}
                    >
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                    </TextField>
                    <TextField
                        label="Student email"
                        variant="outlined"
                        value={addedPerson.student_email}
                        onChange={(e) => setAddedPerson({...addedPerson, student_email: e.target.value})}
                    />
                    <div>
                        <Button onClick={() => addPersonToDB()}>Submit</Button>
                    </div>
                </Paper>
            </Modal>
        </GridToolbarContainer>
    )
}