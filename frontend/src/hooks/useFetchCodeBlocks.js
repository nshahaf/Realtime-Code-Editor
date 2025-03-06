import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getCodeBlocks } from '../services/blockService'

export function useFetchCodeBlocks() {
    const [codeBlocks, setCodeBlocks] = useState([])

    useEffect(() => {
        async function fetchCodeBlocks() {
            try {
                const fetchedCodeBlocks = await getCodeBlocks()
                setCodeBlocks(fetchedCodeBlocks)
            } catch (error) {
                console.error('Error fetching code blocks:', error)
                toast.error('Error fetching code blocks')
            }
        }

        fetchCodeBlocks()
    }, [])

    return codeBlocks
}