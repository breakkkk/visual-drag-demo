// 公共样式
export const commonStyle: Partial<ComponentStyle> = {
  rotate: 0,
  opacity: 1,
}

export const commonAttr: Partial<ComponentData> = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
  collapseName: 'style', // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
  linkage: {
    duration: 0, // 过渡持续时间
    data: [
      // 组件联动
      {
        id: '', // 联动的组件 id
        label: '', // 联动的组件名称
        event: '', // 监听事件
        style: [{ key: '', value: '' }], // 监听的事件触发时，需要改变的属性
      },
    ],
  },
}

import titleImg from '@/assets/title.jpg'

// 编辑器左侧组件列表
const list: ComponentData[] = [
  {
    component: 'VText',
    label: '文字',
    propValue: '双击编辑文字',
    icon: 'wenben',
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false, // 是否定时发送请求
      time: 1000, // 定时更新时间
      paramType: '', // string object array
      requestCount: 0, // 请求次数限制，0 为无限
    },
    style: {
      width: 200,
      height: 28,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      padding: 4,
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  {
    component: 'VButton',
    label: '按钮',
    propValue: '按钮',
    icon: 'button',
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '',
      requestCount: 0,
    },
    style: {
      width: 100,
      height: 34,
      borderWidth: 1,
      borderColor: '',
      borderRadius: '',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      backgroundColor: '',
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  {
    component: 'Picture',
    label: '图片',
    icon: 'tupian',
    propValue: {
      url: titleImg,
      flip: {
        horizontal: false,
        vertical: false,
      },
    },
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '',
      requestCount: 0,
    },
    style: {
      width: 300,
      height: 200,
      borderRadius: '',
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  {
    component: 'RectShape',
    label: '矩形',
    propValue: '&nbsp;',
    icon: 'juxing',
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '',
      requestCount: 0,
    },
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      borderRadius: '',
      verticalAlign: 'middle',
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  {
    component: 'LineShape',
    label: '直线',
    propValue: '',
    icon: 'zhixian',
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '',
      requestCount: 0,
    },
    style: {
      width: 200,
      height: 2,
      backgroundColor: '#000',
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  {
    component: 'CircleShape',
    label: '圆形',
    propValue: '&nbsp;',
    icon: '24gl-circle',
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '',
      requestCount: 0,
    },
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      borderRadius: '',
      verticalAlign: 'middle',
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  {
    component: 'SVGStar',
    label: '星形',
    icon: 'kongwujiaoxing',
    propValue: '',
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '',
      requestCount: 0,
    },
    style: {
      width: 80,
      height: 80,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  {
    component: 'SVGTriangle',
    label: '三角形',
    icon: 'xingzhuang-sanjiaoxing',
    propValue: '',
    request: {
      method: 'GET',
      data: [],
      url: '',
      series: false,
      time: 1000,
      paramType: '',
      requestCount: 0,
    },
    style: {
      width: 80,
      height: 80,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      top: 0,
      left: 0,
      rotate: 0,
      opacity: 1,
    },
  },
  // {
  //   component: 'VTable',
  //   label: '表格',
  //   icon: 'biaoge',
  //   propValue: {
  //     data: [
  //       ['表头1', '表头2', '表头3'],
  //       ['内容1', '内容2', '内容3'],
  //     ],
  //     stripe: true,
  //     thBold: true,
  //   },
  //   request: {
  //     method: 'GET',
  //     data: [],
  //     url: '',
  //     series: false,
  //     time: 1000,
  //     paramType: '', // string object array
  //     requestCount: 0, // 请求次数限制，0 为无限
  //   },
  //   style: {
  //     width: 600,
  //     height: 200,
  //     fontSize: 14,
  //     fontWeight: 400,
  //     textAlign: 'center',
  //     color: '',
  //     backgroundColor: 'rgba(255, 255, 255, 1)',
  //     top: 0,
  //     left: 0,
  //     rotate: 0,
  //     opacity: 1,
  //   },
  // },
  // {
  //   component: 'VChart',
  //   label: '图表',
  //   icon: 'el-icon-data-analysis',
  //   propValue: {
  //     chart: 'VChart',
  //     option: {
  //       title: {
  //         text: '柱状图',
  //         show: true,
  //       },
  //       legend: {
  //         show: true,
  //       },
  //       tooltip: {
  //         show: true,
  //         trigger: 'item',
  //       },
  //       xAxis: {
  //         show: true,
  //         data: ['A', 'B', 'C', 'D', 'E'],
  //       },
  //       yAxis: {},
  //       series: {
  //         type: 'bar',
  //         name: '销量',
  //         data: [23, 61, 35, 77, 35],
  //         itemStyle: {
  //           barBorderRadius: 5,
  //           borderWidth: 1,
  //           borderType: 'solid',
  //           borderColor: '#73c0de',
  //           shadowColor: '#5470c6',
  //           shadowBlur: 3,
  //         },
  //       },
  //     },
  //   },
  //   request: {
  //     method: 'GET',
  //     data: [],
  //     url: '',
  //     series: false,
  //     time: 1000,
  //     paramType: '',
  //     requestCount: 0,
  //   },
  //   style: {
  //     width: 800,
  //     height: 500,
  //     borderRadius: '',
  //     top: 0,
  //     left: 0,
  //     rotate: 0,
  //     opacity: 1,
  //   },
  // },
]

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = { ...commonStyle, ...item.style } as ComponentStyle
  list[i] = { ...commonAttr, ...item } as ComponentData
}

export default list
