'use client'
// import { useTranslations} from 'next-intl';
import { Tabs, Empty, type TabsProps } from 'antd';
import Layout from '@/components/Layout';
import styles from './index.module.less';

const List = <div className={styles.fuildWrap}>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/FlQJxRYRJx2sMeIuKw76IOJCH-Wp" alt="流程图编辑器 - drawio" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/Flpu2lB2-XQghamF6kDBqMsUzM65" alt="可视化白板工具" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/FpSCq3pN5AonJpRGbiAPxdYqreeN" alt="可视化白板工具" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/FgIzNE5vqLi1Nloxm3Nv7VuqmBJl" alt="可视化白板工具" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/FlQJxRYRJx2sMeIuKw76IOJCH-Wp" alt="流程图编辑器 - drawio" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/Flpu2lB2-XQghamF6kDBqMsUzM65" alt="可视化白板工具" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/FpSCq3pN5AonJpRGbiAPxdYqreeN" alt="可视化白板工具" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/FgIzNE5vqLi1Nloxm3Nv7VuqmBJl" alt="可视化白板工具" />
  </div>
  <div className="cardImg">
    <img src="https://cdn.dooring.cn/FgIzNE5vqLi1Nloxm3Nv7VuqmBJl" alt="可视化白板工具" />
  </div>
</div>

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '图片',
    children: List,
  },
  {
    key: '2',
    label: '音频',
    children: List,
  },
  {
    key: '3',
    label: '视频',
    children: List,
  },
];


export default function Resource() {
  return (
    <Layout curActive='/resource'>
        <main style={{minHeight: 'calc(100vh - 260px)'}}>
          <Tabs defaultActiveKey="1" items={items} />
        </main>
    </Layout>
    
  );
}
