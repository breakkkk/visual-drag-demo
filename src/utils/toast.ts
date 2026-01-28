import { ElMessage } from 'element-plus'

export default function toast(message: string = '', type: any = 'error', duration: number = 1500) {
  ElMessage({
    message,
    type,
    duration,
  })
}
