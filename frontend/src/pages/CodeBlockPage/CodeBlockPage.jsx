import styles from './CodeBlockPage.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { codeBlocks } from '../../../../backend/data.js'
import RoomInfoCard from '@/components/RoomInfoCard'
import CodeEditor from '../../components/CodeEditor'
export default function CodeBlockPage() {
    const params = useParams()
    const [codeBlock, setCodeBlock] = useState(null)

    useEffect(() => {
        setCodeBlock(codeBlocks.find(codeBlock => codeBlock._id === Number(params.id)))

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
                    <CodeEditor />
                    <div className={styles.note}>
                        <span>Note:&nbsp;</span>As a mentor, you are in read-only mode. You can see the code but cannot modify it.
                        If you leave this page, all students will be redirected to the lobby.
                    </div>
                </>
            ) : (
                <p>Code block not found</p>
            )}
        </div>
    )
}