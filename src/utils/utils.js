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

    getStudent: async (studentId) => {
        const { data } = await axios.get(`/students/${studentId}`)
        return data[0] 
    }, 

    changeDateFormat: (data) => {
        for (let x = 0; x < data.length; x++) {
            data[x] = {
                ...data[x], 
                assignment_date: new Date(data[x].assignment_date).toLocaleDateString()
            }
        }
    },

    addAssignment: async (studentId, assignment) => {
        const val = axios.post('/grades/addAssignment', { studentId, assignment })
        return val 
    }, 

    updateAssignment: async (assignmentId, updatedVals) => {
        const val = axios.put(`/grades/updateAssignment/${assignmentId}`, updatedVals)
        return val
    },

    formatDate: function (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    },

    deleteAssignment: async (assignmentId) => {
        const val = axios.delete(`/grades/${assignmentId}`)
        return val
    },

    addPerson: async (person) => {
        const { data } = axios.post('/students/addStudent', person)
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