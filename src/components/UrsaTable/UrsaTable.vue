<template>
    <el-card class="table-card" shadow="never">
        <div v-if="$slots.toolbar" class="toolbar">
            <slot name="toolbar" />
        </div>

        <div class="table-wrapper">
            <el-table :data="data" v-loading="loading" stripe border style="width: 100%" height="100%"
                :default-sort="defaultSort" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
                <el-table-column v-if="showIndex" type="index" :label="indexLabel" :width="indexWidth" align="center"
                    :index="calcIndex" />
                <el-table-column v-if="showSelection" type="selection" :width="selectionWidth" align="center" />

                <template v-if="!Array.isArray(columnFields) || columnFields.length === 0">
                    <slot />
                </template>

                <template v-else>
                    <el-table-column v-for="column in columnFields" :key="column.prop || column.label"
                        :prop="column.prop" :label="column.label" :width="column.width ?? 200"
                        :min-width="column.minWidth" :align="column.align ?? 'center'"
                        :sortable="column.sortable ?? 'custom'" :fixed="column.fixed"
                        :show-overflow-tooltip="column.showOverflowTooltip ?? false">
                        <template #default="scope">
                            <slot v-if="hasColumnSlot(column)" :name="getColumnSlotName(column)" :row="scope.row"
                                :index="scope.$index" :column="column" :value="getCellValue(scope.row, column)"></slot>

                            <template v-else-if="hasTagStyle(column)">
                                <el-tag v-if="resolveTagConfig(column, scope.row, scope.$index)"
                                    :type="resolveTagConfig(column, scope.row, scope.$index).type"
                                    :effect="resolveTagConfig(column, scope.row, scope.$index).effect"
                                    :size="resolveTagConfig(column, scope.row, scope.$index).size"
                                    :round="resolveTagConfig(column, scope.row, scope.$index).round"
                                    :hit="resolveTagConfig(column, scope.row, scope.$index).hit">
                                    {{ resolveTagConfig(column, scope.row, scope.$index).label }}
                                </el-tag>
                                <span v-else>{{ formatCellText(column, scope.row, scope.$index) }}</span>
                            </template>

                            <span v-else>{{ formatCellText(column, scope.row, scope.$index) }}</span>
                        </template>
                    </el-table-column>
                </template>

                <!-- 操作区域 -->
                <el-table-column v-if="showActionColumn" :label="resolvedActionColumn.label"
                    :width="resolvedActionColumn.width" :align="resolvedActionColumn.align"
                    :fixed="resolvedActionColumn.fixed">
                    <template #default="scope">
                        <el-button v-for="button in resolvedActionButtons" :key="button.key"
                            v-if="isActionVisible(button, scope.row, scope.$index)" :link="button.link ?? true"
                            :type="button.type ?? 'primary'" :size="button.size ?? 'small'" :icon="button.icon"
                            @click="handleActionClick(button, scope)">
                            {{ button.label }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页区域 -->
        <div class="pagination-container">
            <div class="pagination-wrapper">
                <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizes" background
                    layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @current-change="handleCurrentChange" @size-change="handleSizeChange" />
            </div>
        </div>
    </el-card>
</template>

<script setup>
    import { Delete, Edit, View } from '@element-plus/icons-vue'
    import { computed } from 'vue'

    defineOptions({
        name: 'UrsaTable'
    })

    const props = defineProps({
        data: {
            type: Array,
            default: () => []
        },
        columnFields: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        },
        pageSizes: {
            type: Array,
            default: () => [5, 10, 20, 50]
        },
        defaultSort: {
            type: Object,
            default: () => ({})
        },
        showIndex: {
            type: Boolean,
            default: true
        },
        indexLabel: {
            type: String,
            default: '序号'
        },
        indexWidth: {
            type: Number,
            default: 70
        },
        showSelection: {
            type: Boolean,
            default: false
        },
        selectionWidth: {
            type: Number,
            default: 55
        },
        showActionColumn: {
            type: Boolean,
            default: false
        },
        actionColumn: {
            type: Object,
            default: () => ({})
        }
    })

    const emit = defineEmits((event) => {
        return typeof event === 'string'
    })

    const defaultActionButtons = [
        {
            key: 'view',
            label: '查看',
            type: 'info',
            size: 'small',
            link: true,
            icon: View,
            event: 'view'
        },
        {
            key: 'edit',
            label: '编辑',
            type: 'primary',
            size: 'small',
            link: true,
            icon: Edit,
            event: 'edit'
        },
        {
            key: 'delete',
            label: '删除',
            type: 'danger',
            size: 'small',
            link: true,
            icon: Delete,
            event: 'delete'
        }
    ]

    const resolvedActionColumn = computed(() => ({
        label: props.actionColumn?.label ?? '操作',
        width: props.actionColumn?.width ?? 240,
        align: props.actionColumn?.align ?? 'center',
        fixed: props.actionColumn?.fixed ?? 'right'
    }))

    const resolvedActionButtons = computed(() => {
        const configButtons = props.actionColumn?.buttons
        if (Array.isArray(configButtons) && configButtons.length > 0) {
            return configButtons
        }
        return defaultActionButtons
    })

    const calcIndex = (index) => (props.currentPage - 1) * props.pageSize + index + 1

    const handleSortChange = (payload) => emit('sort-change', payload)
    const handleCurrentChange = (page) => emit('current-change', page)
    const handleSizeChange = (size) => emit('size-change', size)
    const handleSelectionChange = (rows) => emit('selection-change', rows)

    const getCellValue = (row, column) => {
        if (!column?.prop) {
            return undefined
        }
        return row?.[column.prop]
    }

    const formatCellText = (column, row, index) => {
        const value = getCellValue(row, column)
        if (typeof column?.formatter === 'function') {
            return column.formatter({ value, row, index, column })
        }
        return value ?? ''
    }

    const getColumnSlotName = (column) => column?.slot || (column?.prop ? `col-${column.prop}` : '')

    const hasColumnSlot = (column) => {
        const slotName = getColumnSlotName(column)
        return Boolean(slotName && $slots[slotName])
    }

    const hasTagStyle = (column) => {
        return typeof column?.tagMap === 'function' || typeof column?.tagMap === 'object'
    }

    const normalizeTagConfig = (rawConfig, fallbackLabel) => {
        if (!rawConfig) {
            return null
        }
        if (typeof rawConfig === 'string') {
            return { label: rawConfig }
        }
        return {
            label: rawConfig.label ?? fallbackLabel,
            type: rawConfig.type,
            effect: rawConfig.effect,
            size: rawConfig.size,
            round: rawConfig.round,
            hit: rawConfig.hit
        }
    }

    const resolveTagConfig = (column, row, index) => {
        const value = getCellValue(row, column)
        let tagConfig = null

        if (typeof column?.tagMap === 'function') {
            tagConfig = column.tagMap({ value, row, index, column })
        } else if (column?.tagMap && typeof column.tagMap === 'object') {
            tagConfig = column.tagMap[value]
        }

        if (!tagConfig && typeof column?.tagDefault === 'function') {
            tagConfig = column.tagDefault({ value, row, index, column })
        } else if (!tagConfig) {
            tagConfig = column?.tagDefault
        }

        return normalizeTagConfig(tagConfig, value)
    }

    const isActionVisible = (button, row, index) => {
        if (typeof button.visible === 'function') {
            return button.visible({ row, index })
        }
        if (typeof button.visible === 'boolean') {
            return button.visible
        }
        return true
    }

    const handleActionClick = (button, scope) => {
        const payload = {
            action: button.key ?? button.event ?? 'action',
            row: scope.row,
            index: scope.$index,
            button
        }

        if (typeof button.onClick === 'function') {
            button.onClick(payload)
            return
        }

        emit('action', payload)
        emit(button.event ?? button.key ?? 'action', payload)
    }
</script>

<style scoped>
    .table-card {
        border-radius: 8px;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .table-card :deep(.el-card__body) {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        padding: 20px;
    }

    .toolbar {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .table-wrapper {
        flex: 1;
        overflow: hidden;
        min-height: 0;
    }

    .pagination-container {
        margin-top: 20px;
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
        flex-shrink: 0;
        border-top: 1px solid #f0f0f0;
    }

    .pagination-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    :deep(.el-table) {
        font-size: 14px;
    }

    :deep(.el-table th.el-table__cell) {
        background-color: #fafafa;
        color: #333;
        font-weight: 600;
    }

    :deep(.el-button + .el-button) {
        margin-left: 8px;
    }
</style>
