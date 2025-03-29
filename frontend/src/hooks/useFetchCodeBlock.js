import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCodeBlock } from '../services/blockService'

export function useFetchCodeBlock() {
    const params = useParams()
    const [codeBlock, setCodeBlock] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function fetchCodeBlock() {
            try {
                setIsLoading(true)
                setError(null)
                const fetchedBlock = await getCodeBlock(params.id)
                setCodeBlock(fetchedBlock)
            } catch (error) {
                setError(error.message)
                console.error('Error fetching code block:', error)
                toast.error('Error fetching code block')
            } finally {
                setIsLoading(false)
            }
        }

        fetchCodeBlock()
    }, [params.id])

    return { codeBlock, isLoading, error }
}