import styles from './preview.module.css'

export default function Preview() {
    return (
        <div className={styles.preview_container}>
            <div className={styles.preview}>
                <div className={styles.title_description_container}></div>
                <div className={styles.drop_zone}>
                    <p className={styles.drop_zone_text}>Add a component to begin.</p>
                </div>
                <div className={styles.submit_container}>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    )
}