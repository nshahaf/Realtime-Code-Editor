import styles from './CodeBlockPage.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RoomInfoCard from '@/components/RoomInfoCard'
import CodeEditor from '../../components/CodeEditor'
import { axiosInstance as axios } from '../../services/axios'
import { useSocket } from '../../socket/useSocket'


export default function CodeBlockPage() {
    const { emitEvent, role } = useSocket()
    const params = useParams()
    const [codeBlock, setCodeBlocks] = useState(null)

    useEffect(() => {
        emitEvent('client:join-room', params.id)
        async function fetchCodeBlock() {
            try {
                const response = await axios(`/codeblocks/${params.id}`)
                setCodeBlocks(response.data)
            } catch (error) {
                console.error('Error fetching code block:', error)
            }
        }

        fetchCodeBlock()

        return () => {
            emitEvent('client:leave-room', params.id)
        }

    }, [params.id])



    return (
        <div className={styles.page}>
            {codeBlock ? (
                <>
                    <div className={styles.heading}>
                        <div className={styles.blockInfo}>
                            <h1 className={styles.title}>{codeBlock.title}</h1>
                            <p className={styles.description}>{codeBlock.description}</p>
                        </div>
                        <RoomInfoCard />
                    </div>
                    <CodeEditor codeBlock={codeBlock} />
                    {role === 'mentor' &&
                        <div className={styles.note}>
                            <span>Note:&nbsp;</span>As a mentor, you are in read-only mode. You can see the code but cannot modify it.
                            If you leave this page, all students will be redirected to the lobby.
                        </div>
                    }
                </>
            ) : (
                <p>Code block not found</p>
            )}
        </div>
    )
}

