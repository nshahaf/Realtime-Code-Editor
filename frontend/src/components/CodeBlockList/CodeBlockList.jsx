import styles from "./CodeBlockList.module.css"
import CodeBlockCard from "../CodeBlockCard/CodeBlockCard"
import { useEffect, useState } from "react"
import { axiosInstance as axios } from "../../services/axios"

export default function CodeBlockList() {
    const [codeBlocks, setCodeBlocks] = useState([])

    useEffect(() => {
        async function fetchCodeBlocks() {
            try {
                const response = await axios(`/codeblocks`)
                setCodeBlocks(response.data)
            } catch (error) {
                console.error('Error fetching code block:', error)
            }
        }

        fetchCodeBlocks()
    }, [])
    return (
        <ul className={styles.list}>
            {codeBlocks.map((codeBlock, index) => (
                <li key={index} className={styles.listItem}>
                    <CodeBlockCard codeBlock={codeBlock} />
                </li>
            ))}
        </ul>
    )
}