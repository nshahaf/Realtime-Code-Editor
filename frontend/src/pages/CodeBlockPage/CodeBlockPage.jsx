import styles from './CodeBlockPage.module.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import RoomInfoCard from '@/components/RoomInfoCard'
import CodeEditor from '../../components/CodeEditor'
import { useSocket } from '../../socket/useSocket'
import { useFetchCodeBlock } from '../../hooks/useFetchCodeBlock'


export default function CodeBlockPage() {
    const { role, socket } = useSocket()
    const params = useParams()
    const codeBlock = useFetchCodeBlock()

    useEffect(() => {
        //send join-room event to the server on mount
        socket.emit('client:join-room', params.id)

        return () => {
            //send leave-room event to the server on unmount
            socket.emit('client:leave-room', params.id)
        }
    }, [params.id, socket])



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

