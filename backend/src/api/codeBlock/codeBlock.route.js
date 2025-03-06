import express from "express"
import { getCodeBlocks, getCodeBlockById, deleteCodeBlockById, createCodeBlock } from "./codeBlock.controller.js"

const router = express.Router()

router.get("/ping", (req, res) => res.send("pong")) // test codeBlock routing connection

router.get("/", getCodeBlocks) // fetching all codeBlocks
router.get("/:id", getCodeBlockById) // fetching a single codeBlock by id
router.delete("/:id", deleteCodeBlockById) // deleting a codeBlock by id
router.post("/", createCodeBlock) // creating new code block

export default router