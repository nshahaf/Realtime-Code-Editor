import styles from './RoomInfoCard.module.css'

export default function RoomInfoCard() {
    const role = 'student'
    const counter = 3
    return (
        <div className={styles.card}>
            <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            </div>
            <div className={styles.counter}>{counter} students</div>
            <div className={`${styles.role} ${styles[role]}`}>{role}</div>
        </div>
    )
}