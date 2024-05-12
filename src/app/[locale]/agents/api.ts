import req from '@/utils/req';

export const ai2Text = (text: string) => req.post('/ai/text', {text});

export const ai2Img = (text: string) => req.post('/ai/image', {text});