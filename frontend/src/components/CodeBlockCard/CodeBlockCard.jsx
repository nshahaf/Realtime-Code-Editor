import styles from './CodeBlockCard.module.css'
import { useNavigate } from 'react-router-dom'

export default function CodeBlockCard({ codeBlock }) {
    const navigate = useNavigate()

    const difficulty = codeBlock.difficulty.toLowerCase()


    function handleNavigation() {
        navigate(`/codeBlock/${codeBlock._id}`)
    }

    return (
        <div className={styles.card} onClick={handleNavigation}>
            <div className={styles.heading}>
                <h3 className={styles.title}>{codeBlock.title}</h3>
                <p className={`${styles.difficulty} ${styles[difficulty]}`}>{difficulty}</p>
            </div>
            <p className={styles.description}>{codeBlock.description}</p>
            <p className={styles.action}>Open code Block &#10142;</p>
        </div>
    )
}