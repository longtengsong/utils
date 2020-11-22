```vue
<template>
<fund-table
  ref="SubMainTable"
  :params="{paramKey: 'vaue'}"
  :headers="[
    { key: 'paperNo', label: '票据号', width: 100 },
    { key: 'type', label: '类型', width: 100, options: [{code: '1', name: 'label1'}, {code: '2', name: 'label2'}] },
    { key: 'receiveType', label: '金额1', width: 100, sum:true },
    { key: 'paperAmt', label: '金额2', width: 100, writable: true },
    { key: 'receiveDate', label: '金额3', width: 100, writable: true, sum:true },
  ]"
  :getTableData="getTableData"
  @checkbox-change="selectChangeEvent"
  @current-change="currentChangeEvent"
/>
</template>
<script>
// import FundTable from '@/views/fund/components/FundTable'
export default {
  methods: {
    getTableData(params){
      console.log(params)
      return Promise.resolve({
        code: 200,
        data: {
          rows: [
            {
              paperNo: '',
              type: '1',
              receiveType: '40',
              paperAmt: '50',
              receiveDate: '60',
            },
            {
              paperNo: '',
              type: '2',
              receiveType: '10',
              paperAmt: '20',
              receiveDate: '30',
            },
          ],
          total: 2
        }
      })
    },
    // 勾选数据
    selectChangeEvent(selection){
      console.log(selection)
    },

    // 选中行
    currentChangeEvent(row) {
      console.log(row)
    }
  }
}
</script>
```