import styles from './CodeEditor.module.css'

import Editor from 'react-simple-code-editor'
import { useState } from 'react'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-okaidia.css'

export default function CodeEditor() {
    const [code, setCode] = useState('const greeting = "Hello, world!"')

    return (
        <Editor className={styles.editor}
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={20}
            style={{ fontFamily: 'monospace', fontSize: 12 }}
        />
    )
}

