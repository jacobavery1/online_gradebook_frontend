import { Modal, Paper, TextField, MenuItem, Button } from "@mui/material"
import { styled } from '@mui/material/styles';
import utils from "../utils/utils";

export default function GradeModal({editModalOpen, setEditModalOpen, onSubmit, addedData, setAddedData}) {
    const OptionButton = styled(Button)(() => ({
        backgroundColor: 'lightblue'
    }))
    
    return (
        <Modal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
            >
                <Paper elevation={3} sx={utils.paperSxProps}>
                <TextField
                    label="Class name"
                    variant="outlined" sx={{ margin: 2 }}
                    value={addedData.class_name}
                    onChange={e => setAddedData({...addedData, class_name: e.target.value})}
                />
                <TextField
                    label="Assignment name"
                    variant="outlined" sx={{ margin: 2 }}
                    value={addedData.assignment_name}
                    onChange={e => setAddedData({...addedData, assignment_name: e.target.value})}
                />
                    <div style={utils.gradeModalDivStyle} >
                        <TextField
                            select
                            variant="outlined"
                            label="Semester"
                            sx={{ width: 200 }}
                            value={addedData.semester}
                            onChange={e => setAddedData({...addedData, semester: e.target.value})}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </TextField>
                        <TextField
                            type="date"
                            sx={{ width: 200 }}
                            value={addedData.assignment_date}
                            onChange={e => setAddedData({...addedData, assignment_date: e.target.value })}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <TextField label="Grade" variant="outlined" sx={{ width: 100 }}
                            value={addedData.assignment_grade}
                            onChange={e => setAddedData({...addedData, assignment_grade: e.target.value})}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 10 }}>
                        <OptionButton onClick={onSubmit}>Submit</OptionButton>
                    </div>
                </Paper>
            </Modal>
    )
}