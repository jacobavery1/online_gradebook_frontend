import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import utils from "../utils/utils"

export default function Individual() {
    const { id } = useParams()
    const [assignments, setAssignments] = useState([])
    
    useEffect(() => {
        (async () => {
            const data = await utils.getStudentGrades(id)
            setAssignments(data)
        })() 
    }, [])

    const columns = [
        { field: 'class_name', headerName: 'Class Name', width: 250 }, 
        { field: 'assignment_name', headerName: 'Assignment Name', width: 250 },
        { field: 'assignment_date', headerName: 'Assignment Date', width: 200 }, 
        { field: 'assignment_grade', headerName: 'Assignment Grade', width: 200}
        
    ]


    return (
        <div style={{height: 650, width: '100%'}}>
            <DataGrid
                rows={assignments}
                getRowId={(row) => row.assignment_id}
                rowHeight={25}
                columns={columns}
                sx={utils.sxProp}
            />
        </div>
    )
}