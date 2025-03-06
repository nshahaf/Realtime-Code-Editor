import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCodeBlock } from '../services/blockService'

export function useFetchCodeBlock() {
    const params = useParams()
    const [codeBlock, setCodeBlocks] = useState(null)

    useEffect(() => {
        async function fetchCodeBlock() {
            try {
                const fetchedBlock = await getCodeBlock(params.id)
                setCodeBlocks(fetchedBlock)
            } catch (error) {
                console.error('Error fetching code block:', error)
                toast.error('Error fetching code block')
            }
        }

        fetchCodeBlock()
    }, [params.id])

    return codeBlock
}