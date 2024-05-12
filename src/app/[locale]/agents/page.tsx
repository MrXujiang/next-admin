'use client';
import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { ProChat } from '@ant-design/pro-chat';
import { MockSSEResponse } from './mock';
import styles from './index.module.less';

const dataArray = [
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "Next"}, "index": 0, "finish_reason": null}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "-Admin"}, "index": 0, "finish_reason": null}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "是"}, "index": 0, "finish_reason": null}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "一款"}, "index": 0, "finish_reason": null}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "开箱即用"}, "index": 0, "finish_reason": null}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "的"}, "index": 0, "finish_reason": null}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "中后台"}, "index": 0, "finish_reason": null}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "解决方案."}, "index": 0, "finish_reason": "complete"}]}`,
    `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "github地址：https://github.com/MrXujiang/next-admin"}, "index": 0, "finish_reason": "complete"}]}`
  ];

export default function Home() {
  const [showComponent, setShowComponent] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  
  useEffect(() => {
    setShowComponent(true)
  }, [])

  const content = (
    <div>
      <img style={{width: 120}} src="http://cdn.dooring.cn/dr/qtqd_code.png" alt="" />
    </div>
  );
  return (
    <Layout curActive="/agents">
      <div style={{minHeight: 'calc(100vh - 260px)'}}>
        {
          showComponent &&
          <ProChat
            className={styles.chatWrap}
            helloMessage={
              <div className={styles.helloBox}>
                <div>
                  hello, 欢迎体验 <strong>Nocode/WEP</strong> 文档引擎，我是你的AI智能助手，
                  有任何问题都可以和我提问，如果对产品有技术上或者体验上的问题，
                  欢迎关注 <Popover content={content}>
                            <span className={styles.btn}>趣谈前端</span>
                          </Popover> 
                  公众号 和作者反馈~
                </div>
              </div>
            }
            actions={{
                render: (defaultDoms) => {
                  return [
                    <a
                      key="h5"
                      onClick={() => {
                        window.open('https://dooring.vip');
                      }}
                    >
                      H5-Dooring零代码平台
                    </a>,
                    <a
                        key="v6"
                        onClick={() => {
                            window.open('https://turntip.cn/');
                        }}
                    >
                        试卷搭建平台
                    </a>,
                    ...defaultDoms,
                  ];
                },
                flexConfig: {
                  gap: 24,
                  direction: 'horizontal',
                  justify: 'start',
                },
            }}
            showTitle
            assistantMeta={{ avatar: '🛸', title: 'Nocode/WEP 智能助手' }}
            userMeta={{
              avatar: userInfo.avatar || '用户',
              title: '用户' + Date.now(),
            }}
            request={async (messages: any) => {
                console.log('messages', messages);
      
                const mockResponse = new MockSSEResponse(dataArray);
                const response = mockResponse.getResponse();
      
                // 确保服务器响应是成功的
                if (!response.ok || !response.body) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
      
                // 获取 reader
                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                const encoder = new TextEncoder();
      
                const readableStream = new ReadableStream({
                  async start(controller) {
                    function push() {
                      reader
                        .read()
                        .then(({ done, value }) => {
                          if (done) {
                            controller.close();
                            return;
                          }
                          const chunk = decoder.decode(value, { stream: true });
                          const message = chunk.replace('data: ', '');
                          const parsed = JSON.parse(message);
                          controller.enqueue(encoder.encode(parsed.choices[0].delta.content));
                          push();
                        })
                        .catch((err) => {
                          console.error('读取流中的数据时发生错误', err);
                          controller.error(err);
                        });
                    }
                    push();
                  },
                });
                return new Response(readableStream);
              }}
          />
        }
        
      </div>
    </Layout>
  );
}
