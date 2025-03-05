import styles from './CodeEditor.module.css'
import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../socket/useSocket'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-okaidia.css'

export default function CodeEditor({ codeBlock }) {
    const { role, emitEvent, roomId, socket, userId } = useSocket()
    const initialCode = codeBlock.initialCode | ''
    const [code, setCode] = useState(codeBlock.initialCode)
    const isCodeChangeFromServer = useRef(false)

    useEffect(() => {
        socket.on('server:code-change', ({ senderCode, senderId }) => {
            if (senderId !== userId) { //update only if the sender is not the current user
                isCodeChangeFromServer.current = true
                setCode(senderCode)
            }
        })
        return () => {
            socket.off('server:code-change')
        }
    }, [socket])

    useEffect(() => {
        if (!isCodeChangeFromServer.current) { // send only if the change is from the current user
            emitEvent('client:code-change', { code, roomId, userId })
        }
        isCodeChangeFromServer.current = false
    }, [code])


    return (
        <Editor className={styles.editor}
            textareaClassName={styles.textarea}
            preClassName={styles.pre}
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={20}
            readOnly={role === 'mentor'}
        />
    )
}


