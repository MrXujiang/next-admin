'use client';
import Layout from '@/components/Layout';
import styles from './index.module.less';


const FormEnginePage = () => {
    return <Layout curActive='/board'>
        <div className={styles.boardWrap}>
            <iframe src="https://board.dooring.vip"></iframe>
        </div>
    </Layout>
    
}

export default FormEnginePage