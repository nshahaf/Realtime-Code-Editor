import mongoose from "mongoose"

const codeBlockSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        initialCode: { type: String, required: true },
        testFunction: { type: String, required: true },
        difficulty: { type: String, required: true },
    },
    { timestamps: true }
)


const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema)
export default CodeBlock