import styles from './LobbyPage.module.css'
import CodeBlockList from '@/components/CodeBlockList/CodeBlockList'

export default function LobbyPage() {

    return (
        <div className={styles.page}>
            <h3 className={styles.appTitle}>Tom's Coding Academy</h3>
            <h1 className={styles.title}>Choose Code Block</h1>
            <p className={styles.description}>Select a code block to practice your skills</p>
            <CodeBlockList />
        </div>
    )
}