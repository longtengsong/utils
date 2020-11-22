import Vue from 'vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VXETablePluginAntd from 'vxe-table-plugin-antd'
import 'vxe-table-plugin-antd/dist/style.css'

Vue.use(Antd)

Vue.use(VXETable)

VXETable.use(VXETablePluginAntd)
