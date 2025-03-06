import CodeBlock from './codeBlock.model.js'

//CodeBlock.find()
//CodeBlock.findById()
//CodeBlock.findOne({key})
//CodeBlock.findByIdAndUpdate()
//CodeBlock.findByIdAndDelete()

//Read all
export const getCodeBlocks = async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find()
        res.status(200).json(codeBlocks) //200 for ok
    } catch (error) {
        console.log("Error in codeBlock controller - Error fetching codeBlocks", error)
        res.status(500).send("Internal server error - Error fetching codeBlocks")
    }
}

//Read one by id
export const getCodeBlockById = async (req, res) => {
    const { id } = req.params
    try {
        const codeBlock = await CodeBlock.findById(id)
        if (!codeBlock) return res.status(404).send('codeBlock not found') //404 for not found

        res.json(codeBlock)
    } catch (error) {
        console.log("Error in codeBlock controller - error fetching codeBlock", error)
        res.status(500).send("Internal server error - error fetching codeBlock")
    }
}

//Delete one by id
export const deleteCodeBlockById = async (req, res) => {
    try {
        const deletedCodeBlock = await CodeBlock.findByIdAndDelete(req.params.id)
        if (!deletedCodeBlock) return res.status(404).send('codeBlock not found') //404 for not found

        res.status(200).json({ message: 'codeBlock deleted successfully' })

    } catch (error) {
        console.log("Error in codeBlock controller - error deleting block", error)
        res.status(500).send("Internal server error - error deleting block")
    }
}

//Create
export const createCodeBlock = async (req, res) => {
    const { title, initialCode, description, testFunction, difficulty } = req.body
    try {
        // Check required fields
        if (!title || !description || !initialCode || !testFunction || !difficulty) {
            return res.status(400).send('All fields are required') //400 for bad request
        }

        const newCodeBlock = new CodeBlock(req.body)
        const savedCodeBlock = await newCodeBlock.save()
        res.status(201).json(savedCodeBlock) //201 for created
    } catch (error) {
        console.log("Error in codeBlock controller", error)
        res.status(500).send("Internal server error")
    }
}

