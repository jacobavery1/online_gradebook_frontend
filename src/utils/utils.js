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
    }, 

    defaultObj: {
        assignment_date: '', 
        assignment_grade: '', 
        assignment_name: '', 
        class_name: '', 
        semester: '', 
        assignment_id: ''
    },

    defaultObjII: {
        assignment_date: '', 
        assignment_grade: '', 
        assignment_name: '', 
        class_name: '', 
        semester: ''
    }, 

    studentSchemaObj: {
        last_name: '', 
        first_name: '', 
        grade_level: '', 
        student_email: ''
    },

    paperSxProps: {
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: 550, 
        bgcolor: 'whitesmoke',
        padding: 5, 
        display: 'flex', 
        flexDirection: 'column'
    }, 

    gradeModalDivStyle: {
        display: 'flex', 
        justifyContent: 'center',
        margin: 20, 
        gap: 10
    }
}

export default utils