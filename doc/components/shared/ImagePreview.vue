<template>
  <img :src="src" :alt="alt" :class="['image-preview-trigger', imgClass]" @click="open" />

  <Teleport to="body">
    <div v-if="visible" class="image-preview-mask" @click.self="close">
      <img :src="src" :alt="alt" class="image-preview-full" />
    </div>
  </Teleport>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const props = defineProps({
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    imgClass: {
      type: String,
      default: ''
    }
  })

  const visible = ref(false)

  const open = () => {
    if (!props.src) {
      return
    }
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  const handleKeydown = (event) => {
    if (event.key === 'Escape' && visible.value) {
      close()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

<style scoped>
  .image-preview-trigger {
    cursor: zoom-in;
    max-width: 100%;
    height: auto;
    display: block;
  }

  .image-preview-mask {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.72);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    cursor: zoom-out;
  }

  .image-preview-full {
    max-width: min(92vw, 1400px);
    max-height: 90vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
  }
</style>
