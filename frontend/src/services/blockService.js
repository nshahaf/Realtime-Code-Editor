import { axiosInstance as axios } from "../lib/axios"

const blockService = {
    getCodeBlocks,
    getCodeBlock,
    deleteCodeBlock
}

//Read all
export async function getCodeBlocks() {
    const response = await axios.get('/codeblocks')
    const codeBlocks = response.data
    return codeBlocks
}

//Read by ID
export async function getCodeBlock(id) {
    const response = await axios.get(`/codeblocks/${id}`)
    const codeBlock = response.data
    return codeBlock
}

//Delete by id
export async function deleteCodeBlock(id) {
    const response = await axios.delete(`/codeblocks/${id}`)
    const deletedCodeBlock = response.data
    return deletedCodeBlock
}

export default blockService