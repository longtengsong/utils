<template>
  <div>
    <!--数据表格-->
    <a-spin :spinning="loading">
      <vxe-table
        ref="xTable"
        size="small"
        resizable
        border
        stripe
        show-overflow
        show-header-overflow
        highlight-hover-row
        highlight-current-row
        highlight-hover-column
        highlight-current-column
        show-footer
        :data="data"
        :checkbox-config="{ highlight: true }"
        :footer-method="footerMethod"
        @checkbox-change="selectChangeEvent"
        @checkbox-all="selectChangeEvent"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="checkbox"
          width="60"
          align="center"
          fixed="left"
        />
        <vxe-table-column title="序号" width="100">
          <template v-slot="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
        </vxe-table-column>
        <vxe-table-column
          v-for="item in headers"
          :key="item.key"
          :field="item.key"
          :title="item.label"
          :width="item.width"
        >
          <template slot-scope="{ row }">
            <a-input v-if="item.writable" v-model="row[item.key]" />
            <span v-else-if="item.options">{{
              getLabel(row[item.key], item.options)
            }}</span>
            <span v-else>{{ row[item.key] }}</span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </a-spin>

    <!--分页组件-->
    <a-pagination
      v-if="pagination"
      show-size-changer
      show-quick-jumper
      :total="total"
      :show-total="() => `共 ${total} 条`"
      :page-size-options="['10', '20', '50', '100', '500']"
      @change="onPageChange"
      @showSizeChange="onSizeChange"
    />
  </div>
</template>

<script>
import XEUtils from "xe-utils";

function formatToMicrometer(value) {
  return `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default {
  name: "fund-table",
  props: {
    /**
     * 获取数据的参数
     * @values {key1: value1, key2: value2}
     */
    params: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * 表头数据
     * @values [{ key: '', label: '', width: 100, writable: true, sum:true }]
     * - writable: 是否可编辑
     * - sum: 是否求和
     *
     */
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 获取数据的 api 函数
     */
    getTableData: {
      type: Function,
      default() {
        return (data) =>
          Promise.resolve({
            code: 200,
            data: {
              rows: [{}],
              total: 1,
            },
          });
      },
    },
    /**
     * 是否分页
     */
    pagination: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,

      data: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      selection: [],
    };
  },
  computed: {
    sumKeys() {
      const keys = [];
      this.headers.forEach((item) => {
        if (item.sum) {
          keys.push(item.key);
        }
      });
      return keys;
    },
  },
  watch: {
    params() {
      this.getData();
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData();
    });
  },
  created() {
    this.getData();
  },
  methods: {
    async getData(bool) {
      if (bool) this.queryParams.pageNum = 1;

      const queryParams = this.pagination ? this.pagination : {};

      this.loading = true;
      const res = await this.getTableData({
        ...queryParams,
        ...this.params,
      });
      this.loading = false;

      if (res.code === 200) {
        this.data = res.data.rows;
        this.total = res.data.total;
      } else {
        this.data = [];
        this.total = 0;
      }
    },
    handleSearch(params) {
      this.queryParams = {
        ...params,
      };
      this.getData(true);
    },
    getLabel(code, options) {
      let label = code;
      for (let i = 0; i < options.length; i++) {
        if (options[i].code === code) {
          label = options[i].name;
          i = options.length;
        }
      }
      return label;
    },
    footerMethod({ columns, data }) {
      const sums = [];
      const selectSums = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          selectSums.push("选计");
          sums.push("合计");
        } else {
          let sumCell = "-";
          let selectSumCell = "-";

          if (this.sumKeys.includes(column.property)) {
            sumCell = formatToMicrometer(XEUtils.sum(data, column.property));
            selectSumCell = formatToMicrometer(
              XEUtils.sum(this.selection, column.property)
            );
          }

          sums.push(sumCell);
          selectSums.push(selectSumCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [selectSums, sums];
    },
    // 选数据
    selectChangeEvent({ selection }) {
      this.selection = selection;
      this.$refs.xTable.updateFooter();
      /**
       * 勾选事件
       * @arg {selection} 所有勾选项
       * */
      this.$emit("checkbox-change", selection);
    },
    // 选中行
    currentChangeEvent({ row }) {
      /**
       * 选中行事件
       * @arg {row} 选中行
       * */
      this.$emit("current-change", row);
    },

    onPageChange() {
      this.getData();
    },
    onSizeChange() {
      this.getData();
    },
  },
};
</script>
