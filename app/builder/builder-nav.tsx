'use client'
import styles from './builder-nav.module.css'

export default function BuilderNav() {
    return (
        <div className={styles.nav}>
            <div className={styles.brand}>

            </div>
            <div className={styles.name}>
                <input className={`form-control ${styles.name_input}`} placeholder='Untitled Form'/>
            </div>
            <div className={styles.actions}>
            <p className={styles.saved_status}>All Changes Saved</p>
                <button className={`btn btn-primary ${styles.finish_button}`}>Finish</button>
            </div>
        </div>
    )
}