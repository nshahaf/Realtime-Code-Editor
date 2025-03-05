import { axiosInstance as axios } from "./axios"

const blockService = {
    getCodeBlocks,
    getCodeBlock,
    deleteCodeBlock,
    createCodeBlock,
    updateCodeBlock,
}

//Read
export async function getCodeBlocks() {
    const response = await axios.get('/codeblocks')
    const codeBlocks = response.data
    return codeBlocks
}

export async function getCodeBlock(id) {
    const response = await axios.get(`/codeblocks/${id}`)
    const codeBlock = response.data
    return codeBlock
}

//Create
export async function createCodeBlock(codeBlock) {
    const response = await axios.post(`/codeblocks`, codeBlock)
    const savedCodeBlock = response.data
    return savedCodeBlock
}

//Update
export async function updateCodeBlock(codeBlock) {
    const { _id } = codeBlock
    const response = await axios.post(`/codeblocks/${_id}`, codeBlock)
    const updatedCodeBlock = response.data
    return updatedCodeBlock
}

//Delete
export async function deleteCodeBlock(id) {
    const response = await axios.delete(`/codeblocks/${id}`)
    const deletedCodeBlock = response.data
    return deletedCodeBlock
}

export default blockService