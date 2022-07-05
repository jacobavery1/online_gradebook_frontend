import axios from 'axios'

const utils = {
    getStudents: async () => {
        const { data } = await axios.get('/students')
        return data
    }
}

export default utils