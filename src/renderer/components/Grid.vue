<template>
<div class="csv-grid" v-loading.fullscreen.lock="loading">

  <div class="csv-config" v-if="configShow">

    <el-form ref="form" :model="config" label-width="120px" label-position="left" class="configForm">
      <h3>Настройка</h3>
      <el-form-item label="Quotes">
        <el-switch v-model="config.quotes"></el-switch>
      </el-form-item>
      <el-form-item label="Quote char">
        <el-input v-model="config.quoteChar" size="small"></el-input>
      </el-form-item>
      <el-form-item label="Escape char">
        <el-input v-model="config.escapeChar" size="small"></el-input>
      </el-form-item>
      <el-form-item label="Delimiter">
        <el-input v-model="config.delimiter" size="small"></el-input>
      </el-form-item>
      <el-form-item label="Header">
        <el-switch v-model="config.header"></el-switch>
      </el-form-item>
      <el-form-item label="New line">
        <el-input v-model="config.newline" size="small"></el-input>
      </el-form-item>
      <el-form-item label="Skip empty lines">
        <el-switch v-model="config.skipEmptyLines"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="parseCsv">Сохранить</el-button>
      </el-form-item>

    </el-form>
  </div>

  <hot-table v-if="tableData && !configShow" ref="grid" :data="tableData" :autoRowSize="false" :fixedRowsTop="0" :colHeaders="columns" :rowHeaders="true" licenseKey="non-commercial-and-evaluation">
  </hot-table>

  <div class="fixed-button">
    <el-row>     
      <el-button icon="el-icon-upload2" @click="goBack" circle></el-button>
      <el-button v-if="tableData && !configShow" type="warning" icon="el-icon-setting" @click="configShow=!configShow" circle></el-button>
      <el-button v-if="tableData && !configShow" type="primary" icon="el-icon-download" @click="exportData" circle></el-button>
      <el-button v-if="csvData && !configShow" type="warning" icon="el-icon-info">Записей: {{csvData.data.length}}</el-button>
    </el-row>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  HotTable,
  HotColumn
} from '@handsontable/vue'

var fs = require('fs')

export default {
  data () {
    return {
      columns: [],
      tableData: [],
      infoShow: false,
      configShow: true,
      csvData: null,
      page: 0,
      pagedData: [],
      oldConfig: {},
      config: {
        quotes: false,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ';',
        header: true,
        newline: '\\r\\n',
        skipEmptyLines: false,
        columns: null
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'getPath'
    ])
  },
  methods: {
    ...mapActions,
    exportData () {
      let exportPlugin = this.$refs.grid.hotInstance.getPlugin('exportFile')

      exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: this.config.delimiter,
        columnHeaders: this.config.header,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'CSV-VIEWER_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: this.config.newline,
        rowHeaders: false
      })
    },
    goBack () {
      this.$router.push('main-page')
    },
    parseCsv () {
      this.configShow = false
      if (this.oldConfig === this.config && this.tableData.length) return
      this.oldConfig = this.config
      this.loading = true
      fs.readFile(this.getPath, 'utf-8', (err, data) => {
        if (err) {
          this.$message(err.message)
          return
        }

        let result = this.$papa.parse(data, this.config)

        this.csvData = result

        if (this.config.header) {
          result.meta.fields.forEach((item, index) => {
            this.columns.push(item)
          })
        } else {
          this.columns = true
        }
        this.addTableData()
        this.loading = false
      })
    },
    addTableData () {
      // @TODO Нужно добавить ленивую загрузку
      // if (!this.pagedData.length) {
      //   var size = 10
      //   var result = this.csvData.data
      //   for (var i = 0; i < result.length; i += size) {
      //     this.pagedData.push(result.slice(i, i + size))
      //   }
      // } else {
      //   this.page++
      // }
      this.csvData.data.forEach(item => {
        this.tableData.push(item)
      })
    }
  },
  components: {
    HotTable,
    HotColumn
  }
}
</script>

<style lang="scss">
@import '~handsontable/dist/handsontable.full.css';

.csv-config {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.csv-info {
  position: fixed;
  left: 15px;
  bottom: 3px;
}

.configForm {
  max-width: 400px;
  margin: 0 auto;
}

h3 {
  text-align: center;
}

.fixed-button {
  position: fixed;
  bottom: 10px;
  right: 15px;
  z-index: 99;
}

.handsontable th,
.handsontable td {
  max-width: 250px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  font-size: .8rem;
}
</style>
