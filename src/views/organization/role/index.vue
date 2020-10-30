<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="角色状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
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
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="角色名称" prop="name" :show-overflow-tooltip="true" />
      <el-table-column label="角色描述" prop="description" :show-overflow-tooltip="true" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
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
            icon="el-icon-circle-check"
            @click="handleDataScope(scope.row)"
          >数据权限</el-button>
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

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入角色描述" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{ dict.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <!--              <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>-->
          <!--              <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>-->
          <!--              <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>-->
          <el-tree
            ref="menu"
            class="tree-border"
            :data="permissions"
            show-checkbox
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <!--    <el-dialog :title="title" :visible.sync="openDataScope" width="500px" append-to-body>-->
    <!--      <el-form :model="form" label-width="80px">-->
    <!--        <el-form-item label="角色名称">-->
    <!--          <el-input v-model="form.roleName" :disabled="true" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="权限字符">-->
    <!--          <el-input v-model="form.roleKey" :disabled="true" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="权限范围">-->
    <!--          <el-select v-model="form.dataScope">-->
    <!--            <el-option-->
    <!--              v-for="item in dataScopeOptions"-->
    <!--              :key="item.value"-->
    <!--              :label="item.label"-->
    <!--              :value="item.value"-->
    <!--            />-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item v-show="form.dataScope == 2" label="数据权限">-->
    <!--          <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'dept')">展开/折叠</el-checkbox>-->
    <!--          <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'dept')">全选/全不选</el-checkbox>-->
    <!--          <el-checkbox v-model="form.deptCheckStrictly" @change="handleCheckedTreeConnect($event, 'dept')">父子联动</el-checkbox>-->
    <!--          <el-tree-->
    <!--            ref="dept"-->
    <!--            class="tree-border"-->
    <!--            :data="deptOptions"-->
    <!--            show-checkbox-->
    <!--            default-expand-all-->
    <!--            node-key="id"-->
    <!--            :check-strictly="!form.deptCheckStrictly"-->
    <!--            empty-text="加载中，请稍后"-->
    <!--            :props="defaultProps"-->
    <!--          />-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button type="primary" @click="submitDataScope">确 定</el-button>-->
    <!--        <el-button @click="cancelDataScope">取 消</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
import { roleList, updateRole, insertRole, selectRole } from '@/api/role'
import { permissionList } from '@/api/permission'
export default {
  name: 'Index',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 弹出层标题
      title: '',
      // 总数
      total: 0,
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        description: undefined,
        status: undefined
      },
      roleList: [],
      // 启用，禁用
      statusOptions: [{ dictValue: '1', dictLabel: '正常' }, { dictValue: '0', dictLabel: '锁定' }],
      // 表单校验
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      },
      form: {
      },
      permissions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultPerKeys: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId)
      // eslint-disable-next-line eqeqeq
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true
      roleList(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          const { data } = response
          this.roleList = data.records
          this.total = data.total
          this.loading = false
        }
      )
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      permissionList().then(
        response => {
          const { data } = response
          this.permissions = data
        })
      this.open = true
      this.title = '添加角色'
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // eslint-disable-next-line eqeqeq
          if (this.form.id != undefined) {
            this.form.permissionIds = this.getMenuAllCheckedKeys()
            updateRole(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            this.form.permissionIds = this.getMenuAllCheckedKeys()
            insertRole(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      const checkedKeys = this.$refs.menu.getCheckedKeys()
      // 半选中的菜单节点
      const halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log('8888888888888888888')
      permissionList().then(
        response => {
          const { data } = response
          this.permissions = data
        })
      const roleId = row.id || this.ids
      selectRole(roleId).then((response) => {
        const { data } = response
        this.form = data
        this.open = true
        data.sysPermissions.filter((item) => {
          // eslint-disable-next-line eqeqeq
          if (item.type == 3) {
            this.defaultPerKeys.push(item.id)
          }
        })
        this.$nextTick(() => {
          this.$refs.menu.setCheckedKeys(this.defaultPerKeys)
        })
        this.title = '修改角色'
      }
      )
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        description: undefined,
        status: 0,
        permissionIds: []
      }
      this.resetForm('form')
      this.defaultPerKeys = []
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    }
  }
}
</script>

<style scoped>

</style>
