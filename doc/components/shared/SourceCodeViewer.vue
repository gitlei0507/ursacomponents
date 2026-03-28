<template>
  <details class="source-toggle" @toggle="handleSourceToggle">
    <summary>{{ buttonTextComputed }}</summary>

    <div v-if="sourceLoading" class="source-state">{{ loadingText }}</div>
    <pre v-else class="source-code"><code class="hljs" v-html="highlightedCode"></code></pre>
  </details>
</template>

<script setup>
import { computed, ref } from 'vue'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'

const props = defineProps({
  loadSource: {
    type: Function,
    required: true
  },
  language: {
    type: String,
    default: 'vue'
  },
  buttonTextView: {
    type: String,
    default: '查看源代码'
  },
  buttonTextHide: {
    type: String,
    default: '隐藏源代码'
  },
  loadingText: {
    type: String,
    default: '源码加载中...'
  }
})

const registeredLanguages = new Set()
const languageRegistry = {
  vue: xml,
  html: xml,
  xml,
  js: javascript,
  javascript,
  ts: typescript,
  typescript,
  json,
  css,
  bash,
  sh: bash,
  shell: bash
}

const sourceCode = ref('')
const highlightedCode = ref('')
const sourceLoaded = ref(false)
const sourceLoading = ref(false)
const sourceOpen = ref(false)

const buttonTextComputed = computed(() => (sourceOpen.value ? props.buttonTextHide : props.buttonTextView))

const ensureLanguageRegistered = (lang) => {
  const normalized = (lang || 'vue').toLowerCase()
  if (registeredLanguages.has(normalized)) {
    return normalized
  }

  const parser = languageRegistry[normalized] || xml
  hljs.registerLanguage(normalized, parser)
  registeredLanguages.add(normalized)
  return normalized
}

const handleSourceToggle = async (event) => {
  const isOpen = Boolean(event?.target?.open)
  sourceOpen.value = isOpen

  if (!isOpen || sourceLoaded.value || sourceLoading.value) {
    return
  }

  sourceLoading.value = true
  try {
    const result = await props.loadSource()
    sourceCode.value = typeof result === 'string' ? result : (result?.default || '')
    const lang = ensureLanguageRegistered(props.language)
    highlightedCode.value = hljs.highlight(sourceCode.value, { language: lang }).value
    sourceLoaded.value = true
  } finally {
    sourceLoading.value = false
  }
}
</script>

<style scoped>
.source-toggle {
  margin-top: 8px;
}

.source-toggle > summary {
  width: fit-content;
  list-style: none;
  cursor: pointer;
  user-select: none;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
}

.source-toggle > summary::-webkit-details-marker {
  display: none;
}

.source-toggle[open] > summary {
  margin-bottom: 10px;
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.source-state {
  color: var(--vp-c-text-2);
  font-size: 13px;
  padding: 10px 4px 2px;
}

.source-code {
  margin: 0;
  padding: 12px 14px;
  border-radius: 8px;
  overflow: auto;
  font-size: 13px;
  line-height: 1.6;
  background: var(--vp-code-block-bg);
}

:deep(.hljs) {
  color: var(--vp-c-text-1);
  background: transparent;
}

:deep(.hljs-keyword),
:deep(.hljs-selector-tag),
:deep(.hljs-name) {
  color: #cf222e;
}

:deep(.hljs-string),
:deep(.hljs-attr),
:deep(.hljs-built_in) {
  color: #0a7f45;
}

:global(html.dark) :deep(.hljs-keyword),
:global(html.dark) :deep(.hljs-selector-tag),
:global(html.dark) :deep(.hljs-name) {
  color: #ff7b72;
}

:global(html.dark) :deep(.hljs-string),
:global(html.dark) :deep(.hljs-attr),
:global(html.dark) :deep(.hljs-built_in) {
  color: #7ee787;
}
</style>
