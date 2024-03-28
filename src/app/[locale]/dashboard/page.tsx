'use client'
// import { useTranslations} from 'next-intl';
import { Button, Input, type FormProps } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HolderOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout';
import Sortable from 'sortablejs';
import Chart from '@/components/Chart';


import boardList from './board';
// import { loginApi, registerApi } from './api';

import styles from './index.module.less';


export default function Dashboard() {
  // const t = useTranslations();
  const router = useRouter();
  const boardContainerRef = useRef<any>();

  useEffect(() => {
    const sortable = new Sortable(boardContainerRef.current, {
        handle: ".moveBtn"
    })
  }, [])

  return (
    <Layout curActive='/dashboard'>
        <main className={styles.dashboardWrap}>
            <div className={styles.content} ref={boardContainerRef}>
                {
                    boardList.map((v, i) => {
                        return <div key={i} style={{width: v.w, height: v.h}} className={styles.card}> 
                            <span className='moveBtn'><HolderOutlined /></span>
                            <Chart data={v.data} type={v.type} id={v.id} />
                         </div>
                    })
                }
            </div>
        </main>
    </Layout>
    
  );
}
