'use client'
import { useTranslations} from 'next-intl';
import { Button, Form, Input, Segmented, type FormProps } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginApi, registerApi } from './api';

import styles from './index.module.less';

type FieldType = {
  email?: string;
  pwd?: string;
  code?: string;
  remember?: string;
};

const mode = ['登录', '注册'];

export default function Home() {
  const t = useTranslations();
  const [curMode, setCurMode] = useState(mode[0]);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values:any) => {
    if(curMode === mode[0]) {
      const { email, pwd } = values;
      loginApi(email, pwd).then(res => {
        // login logic
        router.push('/dashboard');
      })
      return
    }

    if(curMode === mode[1]) {
      const { email, pwd } = values;
      registerApi(email, pwd).then(res => {
        // register logic
        router.push('/dashboard');
      })
    }
    
  };

  return (
    <main className={styles.loginWrap}>
      <div className={styles.leftBanner}>
        <span className={styles.logo}>Next-Admin</span>
        <h2>下一代MPA中后台管理解决方案</h2>
        <div style={{textAlign: 'center'}}>开箱即用 • Next前后端同构 • 数智化 • 聚合行业最佳实践</div>
        <div className={styles.banner}><img src="/logo_bg.svg" alt="" /></div>
      </div>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <h1>欢迎登录 Next-Admin 中后台管理系统</h1>
          <Segmented<string>
            options={mode}
            size="large"
            onChange={(value) => {
              setCurMode(value);
              form.resetFields();
            }}
          />
          <Form
            name="basic"
            className={styles.form}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 420 }}
            form={form}
            onFinish={onFinish}
            initialValues={{
              email: 'dooring@next.com',
              pwd: 'dooring.vip'
            }}
            autoComplete="off"
          >
            {
              curMode === mode[0] ? 
              <>
                <Form.Item<FieldType>
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: '邮箱不合法!',
                    },
                    {
                      required: true,
                      message: '请输入邮箱',
                    },
                  ]}
                >
                  <Input placeholder='请输入邮箱' size='large' variant="filled" />
                </Form.Item>

                <Form.Item<FieldType>
                  name="pwd"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password size='large' placeholder='请输入密码' variant="filled" />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" block size='large'>
                    登录
                  </Button>
                </Form.Item>
              </> :
              <>
              <Form.Item<FieldType>
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: '邮箱不合法!',
                    },
                    {
                      required: true,
                      message: '请输入邮箱',
                    },
                  ]}
                >
                  <Input placeholder='请输入邮箱' size='large' variant="filled" />
                </Form.Item>

                <Form.Item<FieldType>
                  name="pwd"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password size='large' placeholder='请输入密码' variant="filled" />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" block size='large'>
                    注册
                  </Button>
                </Form.Item>
              </>
            }
            
          </Form>
        </div>
        
      </div>
      
      
    </main>
  );
}
