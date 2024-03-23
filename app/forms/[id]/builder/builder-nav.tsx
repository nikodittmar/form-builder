'use client'
import Component from '@/app/component'
import styles from './builder-nav.module.css'

export default function BuilderNav(props: { components: Component[]  }) {
    const save = () => {
        console.log(JSON.stringify(props.components))
    }

    return (
        <div className={styles.nav}>
            <div className={styles.brand}>

            </div>
            <div className={styles.name}>
                <input className={`form-control ${styles.name_input}`} placeholder='Untitled Form'/>
            </div>
            <div className={styles.actions}>
            <p className={styles.saved_status}>All Changes Saved</p>
                <button className={`btn btn-primary ${styles.finish_button}`} onClick={save}>Finish</button>
            </div>
        </div>
    )
}