'use client';
import Layout from '@/components/Layout';
import styles from './index.module.less';


const FormEnginePage = () => {
    return <Layout curActive='/formEngine'>
        <div className={styles.formEngineWrap}>
            <iframe src="https://doc.dooring.vip"></iframe>
        </div>
    </Layout>
    
}

export default FormEnginePage