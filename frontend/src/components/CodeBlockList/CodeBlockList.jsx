import styles from "./CodeBlockList.module.css"
import useCodeBlocks from "../../hooks/useCodeBlocks"
import CodeBlockCard from "../CodeBlockCard/CodeBlockCard"


export default function CodeBlockList() {
    const codeBlocks = useCodeBlocks()
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