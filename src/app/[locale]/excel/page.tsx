'use client'
// import { useTranslations} from 'next-intl';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Workbook } from "@fortune-sheet/react";
import 'regenerator-runtime/runtime';
import "@fortune-sheet/react/dist/index.css"
import styles from './index.module.less';


export default function Excel() {
  const [data, setData] = useState([{ name: "H5-Dooring产品迭代计划" }, { name: "Nocode/WEP产品迭代计划" }]);
  const onChange = (data: any) => {
    setData(data);
  }
  return (
    <Layout curActive='/excel'>
        <main style={{minHeight: 'calc(100vh - 260px)'}}>
          <div className={styles.wepTable}>
              <Workbook 
                data={data} 
                cellContextMenu={[
                  "copy", // 复制
                  "paste", // 粘贴
                  "|",
                  "insert-row", // 插入行
                  "insert-column", // 插入列
                  "delete-row", // 删除选中行
                  "delete-column", // 删除选中列
                  "delete-cell", // 删除单元格
                  "hide-row", // 隐藏选中行和显示选中行
                  "hide-column", // 隐藏选中列和显示选中列
                  "clear", // 清除内容
                  "sort", // 排序选区
                  "filter", // 筛选选区
                  "chart", // 图表生成
                  "link", // 插入链接
                  "data", // 数据验证
                  "cell-format" // 设置单元格格式
                ]}
                onChange={onChange}
              />
          </div>
        </main>
    </Layout>
    
  );
}
