import {
  createHmac
} from 'crypto';



export const encrypt = (content: string) => {
  let hash = createHmac("md5", process.env.JWT_SECRET || '')
  hash.update(content)
  return hash.digest('hex')
}