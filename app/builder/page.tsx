import BuilderNav from './builder-nav'
import ComponentPicker from './component-picker'
import Options from './options'
import styles from './page.module.css'
import Preview from './preview'

export default function Page() {
    return (
    <div className={styles.container}>
        <BuilderNav />
        <div className={styles.builder}>
            <ComponentPicker />
            <Preview />
            <Options />
        </div>
    </div>
    )
}