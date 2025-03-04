import { useState, useEffect } from 'react'
import { getCodeBlocks } from '../services/blockService'
import { codeBlocks } from '../../../backend/data.js'
export default function useCodeBlocks() {
    // const [codeBlocks, setCodeBlocks] = useState([])

    // useEffect(() => {
    //     async function fetchBlocks() {
    //         const codeBlocks = await getCodeBlocks()
    //         setCodeBlocks(codeBlocks)
    //     }
    //     fetchBlocks()
    // }, [])

    return codeBlocks
}