import req from '@/utils/req';
// 在此处定义你的请求
export const getPageData = (id: string) => req.get(`/api?type=one&id=${id}`);