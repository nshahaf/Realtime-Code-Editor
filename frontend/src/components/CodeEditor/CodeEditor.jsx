import styles from './CodeEditor.module.css'
import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../socket/useSocket'
import smiley from '../../assets/smiley.png'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-okaidia.css'

export default function CodeEditor({ codeBlock }) {
    const { role, roomId, socket, userId } = useSocket()
    const [code, setCode] = useState(codeBlock.initialCode)
    const [isSolved, setIsSolved] = useState(false)
    const isCodeChangeFromServer = useRef(false)

    useEffect(() => {
        socket.on('server:code-change', ({ senderCode, senderId }) => {
            if (senderId !== userId) { //update
                isCodeChangeFromServer.current = true
                setCode(senderCode)
            }

        })

        socket.on('server:code-solved', () => {
            setIsSolved(true)
        })

        socket.on('server:code-reset', () => {
            setCode(codeBlock.initialCode)
            setIsSolved(false)
        })

        return () => {
            socket.off('server:code-change')
            socket.off('server:code-solved')
        }
    }, [socket, userId, codeBlock.initialCode])

    useEffect(() => {
        if (!isCodeChangeFromServer.current) {
            socket.emit('client:code-change', { code, roomId, test: codeBlock.testFunction })
        }
        isCodeChangeFromServer.current = false
    }, [code, socket, roomId, codeBlock.testFunction])

    function handleReset() {
        setCode(codeBlock.initialCode)
        setIsSolved(false)
        socket.emit('client:code-reset', { roomId })
    }


    return (
        <>
            <Editor className={styles.editor}
                textareaClassName={styles.textarea}
                preClassName={styles.pre}
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={20}
                readOnly={role === 'mentor' || isSolved}
                style={{ outline: isSolved ? '5px solid green' : '5px solid grey' }}
            />
            {isSolved &&
                <button type='reset' className={styles.smileyButton} onClick={handleReset} >
                    <img src={smiley} width={300} alt="smiley face" className={styles.smileyImage} />
                </button>
            }
        </>
    )
}


