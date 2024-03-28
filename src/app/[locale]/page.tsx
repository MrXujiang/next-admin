import Image from "next/image";
import Link from "next/link";
import { Button, Timeline } from "antd";
import {useTranslations} from 'next-intl';
import styles from './page.module.css';

export default function Home() {
  const t = useTranslations('index');
  return (
    <main className={styles.home}>
        <Image
          src="/favicon.png"
          alt="next-admin"
          width={120}
          height={60}
          style={{borderRadius: 6}}
          priority
        />
        <div className={styles.content}>
          <p>
            {t('desc')}
          </p>

          <h2>{t('log.title')}</h2>

          <div className={styles.timeBox}>
            <Timeline
              items={[
                {
                  children: t('log.1'),
                },
                {
                  children: t('log.2'),
                },
                {
                  children: t('log.3'),
                },
                {
                  color: 'orange',
                  children: t('log.4'),
                },
                {
                  color: 'orange',
                  children: t('log.5'),
                },
                {
                  color: 'orange',
                  children: t('log.6'),
                },
                {
                  color: 'orange',
                  children: t('log.7'),
                }
              ]}
            />
          </div>

          <div><Link href="/dashboard"><Button type="primary">{t('try')}</Button></Link></div>
        </div>
        
      
    </main>
  );
}
