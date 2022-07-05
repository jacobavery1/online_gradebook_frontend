import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import utils from '../utils/utils'

export default function Home() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        (async () => {
            const s = await utils.getStudents()
            setStudents(s)
        })()
    }, [])

    const columns = [
        { field: 'last_name', headerName: 'Last Name', width: 250 }, 
        { field: 'first_name', headerName: 'First Name', width: 250 },
        { field: 'grade_level', headerName: 'Grade Level', width: 100 }, 
        { field: 'student_email', headerName: 'Student Email', width: 300}
        
    ]
    
    return (
        <div style={{height: 650, width: '100%'}}>
            <DataGrid
                sx={{
                    boxShadow: 2, 
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: "lightblue"
                    }
                }}
                rowHeight={25}
                rows={students}
                columns={columns}
                getRowId={(row) => row.student_id}
                onCellClick={(params, event) => {
                    console.log(params.row)
                }}
            />
        </div>
    )
}