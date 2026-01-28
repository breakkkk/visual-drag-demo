declare global {
  namespace Project {
    type CanvasStyleData = {
      width: number
      height: number
      scale: number
      color: string
      opacity: number
      background: string
      fontSize: number
    }

    type ComponentStyle = {
      width: number
      height: number
      top: number
      left: number
      rotate: number
      opacity: number
      fontSize?: number
      fontWeight?: number
      lineHeight?: number | string
      letterSpacing?: number
      textAlign?: string
      color?: string
      backgroundColor?: string
      borderWidth?: number
      borderColor?: string
      borderStyle?: string
      borderRadius?: number | string
      padding?: number
      verticalAlign?: string
      [key: string]: any
    }

    type ComponentRequest = {
      method: string
      data: any[]
      url: string
      series: boolean
      time: number
      paramType: string
      requestCount: number
    }

    type ComponentData = {
      id?: string
      component: string
      label: string
      propValue: any
      icon: string
      request: ComponentRequest
      style: ComponentStyle
      animations?: any[]
      events?: Record<string, any>
      groupStyle?: any
      isLock?: boolean
      collapseName?: string
      linkage?: {
        duration: number
        data: any[]
      }
    }

    type AreaData = {
      style: {
        top: number
        left: number
        width: number
        height: number
      }
      components: ComponentData[]
    }
  }
}

export {}
