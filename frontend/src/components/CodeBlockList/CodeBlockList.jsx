import styles from "./CodeBlockList.module.css"
import CodeBlockCard from "../CodeBlockCard/CodeBlockCard"
import { useFetchCodeBlocks } from "../../hooks/useFetchCodeBlocks"

export default function CodeBlockList() {
    const codeBlocks = useFetchCodeBlocks()

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