'use client'
// import { useTranslations} from 'next-intl';
import { useState } from 'react';
import Layout from '@/components/Layout';
import gfm from '@bytemd/plugin-gfm';
import { Editor, Viewer } from '@bytemd/react';
import 'bytemd/dist/index.css';

import styles from './index.module.less';

const plugins = [
  gfm()
]


export default function Md() {
  const [value, setValue] = useState('1. 🚀🚀🚀分享一款自研的表单问卷搭建平台探索高效数据收集的新边界，你是否还在为繁琐的表单设计而烦恼？现在，让我们一起走进神奇的网址——https://form.dooring.vip！这是一个专为简化表单创建和管理打造的平台，让数据采集变得前所未有的轻松！在这个平台上，无论你是企业用户、教师还是个人，都可以一键生成专业且美观的在线表单。🎨 不需要编程技能，只需简单的拖拽和点击，就能定制出符合你需求的各类表单，无论是问卷调查、报名注册、预约服务，还是信息反馈，无所不能！不仅如此，https://form.dooring.vip 还提供强大的数据分析功能，实时查看提交的数据，图表展示一目了然，帮助你快速理解用户反馈，驱动决策更智能。📊 而且，它还支持多种分享方式，无论是嵌入网站、社交媒体分享，还是通过链接发送，都能确保你的表单触达每一个目标用户。🔗别再让复杂的表单阻碍你的工作效率，立即访问 https://form.dooring.vip，开启你的便捷表单之旅吧！🚀 让数据采集，从此变得简单而高效！🎉')
  return (
    <Layout curActive='/md'>
        <main style={{minHeight: 'calc(100vh - 260px)'}}>
          <div className={styles.wepTable}>
          <Editor
            value={value}
            plugins={plugins}
            onChange={(v: string) => {
              setValue(v)
            }}
          />
          </div>
        </main>
    </Layout>
    
  );
}
