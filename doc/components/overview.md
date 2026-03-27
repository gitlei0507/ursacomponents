<script setup>
import { computed, ref } from 'vue'

const keyword = ref('')

const groups = [
  {
    title: '组件',
    items: [
      { name: 'UrsaMenu', desc: '菜单组件', link: '/components/basic/UrsaMenu' },
    ]
  }
]

const normalizedKeyword = computed(() => keyword.value.trim().toLowerCase())

const filteredGroups = computed(() => {
  if (!normalizedKeyword.value) return groups
  return groups
    .map((group) => {
      const items = group.items.filter((item) => {
        const target = `${item.name} ${item.desc}`.toLowerCase()
        return target.includes(normalizedKeyword.value)
      })
      return { ...group, items }
    })
    .filter((group) => group.items.length > 0)
})

const total = computed(() => filteredGroups.value.reduce((sum, group) => sum + group.items.length, 0))
</script>

# 组件总览

以下是 Ursa Components 当前文档中的组件目录。

<input v-model="keyword" class="overview-search" type="text" placeholder="Search Components" />

<div v-if="total === 0" class="overview-empty">未找到匹配组件，请尝试其他关键字。</div>

<section v-for="group in filteredGroups" :key="group.title" class="overview-group">
  <div class="overview-group-header">
    <h2>{{ group.title }}</h2>
    <span class="overview-count">{{ group.items.length }}</span>
  </div>

  <div class="overview-grid">
    <a v-for="item in group.items" :key="item.link" :href="item.link" class="overview-card">
      <div class="overview-card-head">
        <span>{{ item.name }}</span>
        <span v-if="item.version" class="overview-version">{{ item.version }}</span>
      </div>
      <div class="overview-card-body">{{ item.desc }}</div>
    </a>
  </div>
</section>

<style scoped>
.overview-search {
  width: 100%;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 10px 12px;
  margin: 12px 0 20px;
  background: var(--vp-c-bg-soft);
}

.overview-empty {
  color: var(--vp-c-text-2);
  padding: 18px 0;
}

.overview-group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0 12px;
}

.overview-group-header h2 {
  margin: 0;
  font-size: 24px;
}

.overview-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 12px;
  line-height: 1;
  padding: 0 8px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.overview-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 14px;
  min-height: 120px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.overview-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.overview-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-weight: 600;
}

.overview-version {
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  line-height: 1;
  padding: 4px 8px;
}

.overview-card-body {
  margin-top: 12px;
  color: var(--vp-c-text-2);
}
</style>
