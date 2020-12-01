<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="书籍名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入书籍名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input
          v-model="queryParams.author"
          placeholder="请输入作者名字"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="书籍类型" prop="status">
        <el-select v-model="queryParams.type" placeholder="书籍类型" clearable size="small">
          <el-option
            v-for="dict in bookTypeList"
            :key="dict.dicKey"
            :label="dict.divValue"
            :value="dict.dicKey"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="bookList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="书籍名称" align="center" prop="name" />
      <el-table-column label="页码数" align="center" prop="pagination" />
      <el-table-column label="作者" align="center" prop="author" />
      <el-table-column label="书籍类型" align="center" prop="type">
        <template slot-scope="scope">
          <el-tag type="info">
            {{ typeString(scope.row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="借阅状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '1'" type="success">在库</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="info">已借出</el-tag>
          <el-tag v-if="scope.row.status == '3'" type="danger">逾期</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="封面" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover"
            fit="fill"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="书籍名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入书籍名称" />
        </el-form-item>
        <el-form-item label="页码数" prop="pagination">
          <el-input v-model="form.pagination" placeholder="请输入页码数" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="书籍类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择书籍类型">
            <el-option
              v-for="dict in bookTypeList"
              :key="dict.dicKey"
              :label="dict.divValue"
              :value="dict.dicKey"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="借阅状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择借阅状态">
            <el-option
              v-for="dict in statusList"
              :key="dict.dicKey"
              :label="dict.divValue"
              :value="dict.dicKey"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面图片" prop="cover">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="Upload"
            :file-list="fileList"
            :on-remove="delitem"
            :multiple="fileMultiple"
            :limit="limit"
            :on-exceed="fileThanOne"
            :show-file-list="showFileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>>

<script>
import { dictionaryByName } from '@/api/dictionary'
import { bookList, book, insertBook, updateBook, deleteBook } from '@/api/book'
import { upload } from '@/api/upload'
export default {
  name: 'Index',
  data() {
    return {
      // 显示已经上传的列表
      showFileList: true,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 上传图片是否多选
      fileMultiple: false,
      // 图片数量限制
      limit: 1,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 公告表格数据
      // noticeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      // statusOptions: [{ 'dictValue': '1', 'dictLabel': '正常' }, { 'dictValue': '2', 'dictLabel': '弃用' }],
      // 状态数据字典
      // typeOptions: [{ 'dictValue': '1', 'dictLabel': '公告' }, { 'dictValue': '2', 'dictLabel': '通知' }],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        author: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '书籍名称不能为空', trigger: 'blur' }
        ],
        pagination: [
          { required: true, message: '页码数不能为空', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '借阅状态不能为空', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '封面图片不能为空', trigger: 'blur' }
        ]
      },
      bookTypeList: [],
      bookList: [],
      // 借阅状态列表
      statusList: [],
      fileList: [],
      srcList: []
    }
  },
  created() {
    this.getList()
    this.dictionaryByName()
    this.queryStatusList()
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      // eslint-disable-next-line eqeqeq
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加公告'
    },
    // 公告状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 公告状态字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type)
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // eslint-disable-next-line eqeqeq
          if (this.form.id != undefined) {
            updateBook(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            insertBook(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        title: undefined,
        type: undefined,
        noticeContent: undefined,
        status: '0'
      }
      this.fileList = []
      this.resetForm('form')
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      book(id).then(response => {
        this.form = response.data
        console.log('----')
        const temp = {}
        temp.name = this.form.cover
        temp.url = this.form.cover
        this.fileList.push(temp)
        console.log('----')
        this.open = true
        this.title = '修改公告'
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const noticeIds = row.id || this.ids
      this.$confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return deleteBook(noticeIds)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    // 条件查询书籍
    getList() {
      bookList(this.queryParams).then((response) => {
        this.loading = true
        const { data } = response
        this.total = data.total
        this.bookList = data.records
        this.loading = false
      })
    },
    // 通过name查询书籍类型
    dictionaryByName() {
      dictionaryByName('书籍类型').then((response) => {
        const { data } = response
        this.bookTypeList = data
      })
    },
    // 书籍状态列表
    queryStatusList() {
      dictionaryByName('借阅状态').then((response) => {
        const { data } = response
        this.statusList = data
      })
    },
    // 自定义上传方法..
    Upload(file) {
      // 判断扩展名
      const tmpcnt = file.file.name.lastIndexOf('.')
      const exname = file.file.name.substring(tmpcnt + 1)
      const names = ['jpg', 'jpeg', 'webp', 'png', 'bmp']
      if (names.indexOf(exname) < 0) {
        this.$message.error('不支持的格式!')
        return
      }
      const param = new FormData() // 创建form对象
      param.append('file', file.file) // 通过append向form对象添加数据
      upload(param).then((response) => {
        this.form.cover = response.data
      })
    },
    // 删除一个图片..
    delitem(file, fileList) {
      console.log(file.uid)
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].indexOf(file.uid) > -1) {
          this.fileList.splice(i, 1)
        }
      }
    },
    // 根据书籍类型id返回类型
    typeString(type) {
      for (const a of this.bookTypeList) {
        console.log(a)
        // eslint-disable-next-line eqeqeq
        if (type == a.dicKey) {
          return a.divValue
        }
      }
    },
    fileThanOne(files, fileList) {
      this.$message({
        message: '只能上传一张封面图',
        type: 'warning'
      })
    }

  }
}
</script>

<style scoped>

</style>
