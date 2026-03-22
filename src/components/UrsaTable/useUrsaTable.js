import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

export function useUrsaTable(apiFn, searchForm, defaultSort = {}) {
    const tableData = ref([])
    const loading = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(5)
    const total = ref(0)

    // defaultSort.order 为 Element Plus 格式(ascending/descending)，需转换为后端格式(asc/desc)
    const sortField = ref(defaultSort.prop || '')
    const sortOrder = ref(
        defaultSort.order
            ? (defaultSort.order === 'ascending' ? 'asc' : 'desc')
            : ''
    )

    const normalizeListResult = (res) => {
        if (Array.isArray(res)) {
            return {
                rows: res,
                total: res.length
            }
        }

        const rows = res?.records || res?.list || res?.rows || res?.data || []
        const totalCount = res?.total ?? res?.count ?? rows.length

        return {
            rows,
            total: totalCount
        }
    }

    const fetchData = async () => {
        loading.value = true
        try {
            const payload = {
                ...searchForm,
                pageNum: currentPage.value,
                pageSize: pageSize.value
            }

            if (sortField.value && sortOrder.value) {
                payload.sortField = sortField.value
                payload.sortOrder = sortOrder.value
            }

            const res = await apiFn(payload)
            const { rows, total: totalCount } = normalizeListResult(res)
            tableData.value = rows
            total.value = Number(totalCount) || 0
        } catch (error) {
            console.error('获取失败：', error)
        } finally {
            loading.value = false
        }
    }

    const handleSearch = () => {
        currentPage.value = 1
        fetchData()
    }

    const handleCurrentChange = (page) => {
        currentPage.value = page
        fetchData()
    }

    const handleSizeChange = (size) => {
        pageSize.value = size
        currentPage.value = 1
        fetchData()
    }

    const handleSortChange = ({ prop, order }) => {
        // order: ascending(升序) / descending(降序) / null(取消排序)
        if (!order) {
            return
        }

        sortField.value = prop
        sortOrder.value = order === 'ascending' ? 'asc' : 'desc'
        currentPage.value = 1
        fetchData()
    }

    const handleDelete = (index, row, options = {}, callback) => {
        const { nameField = '', confirmText = '确定要删除', onSuccess } = options
        const msg = row?.[nameField] ? `【${row?.[nameField]}】` : ''

        ElMessageBox.confirm(
            `${confirmText}${msg}吗？`,
            '警告',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(async () => {
            try {
                const res = await callback(row)
                if (res === 1) {
                    ElMessage.success('删除成功')
                    if (typeof onSuccess === 'function') {
                        onSuccess(row)
                    }
                    handleSearch()
                } else {
                    ElMessage.error('删除失败')
                }
            } catch (error) {
                ElMessage.error(`删除失败：${error.message || error}`)
            }
        }).catch(() => {
            // 点击取消
        })
    }

    onMounted(fetchData)

    return {
        tableData,
        loading,
        currentPage,
        pageSize,
        total,
        searchForm,
        fetchData,
        handleSearch,
        handleDelete,
        handleCurrentChange,
        handleSizeChange,
        handleSortChange
    }
}