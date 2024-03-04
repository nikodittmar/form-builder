import Component from '../component'
import styles from './options.module.css'

export default function Options(props: { 
    components: Component[],
    setComponents: (components: Component[]) => void, 
    selectedId: string | null 
}) {
    

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Form Options</h3>
            {}
        </div>
    )
}