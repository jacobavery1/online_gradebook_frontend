import axios from 'axios'

const utils = {
    getStudents: async () => {
        const { data } = await axios.get('/students')
        return data
    },
    getStudentGrades: async (studentId) => {
        const { data } = await axios.get(`/grades/allAssignments/${studentId}`)
        return data
    },

    sxProp: {
        boxShadow: 2, 
        '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: "lightblue"
        }
    }
}

export default utils