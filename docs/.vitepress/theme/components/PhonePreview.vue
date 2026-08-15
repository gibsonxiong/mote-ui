<script setup lang="ts">
defineOptions({
  name: 'PhonePreview',
})
</script>

<template>
  <div class="phone-preview">
    <div class="phone-preview__frame">
      <div class="phone-preview__notch" />
      <div class="phone-preview__screen">
        <ClientOnly>
          <slot />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-preview {
  display: flex;
  justify-content: flex-start;
  margin: 16px 0;
}

.phone-preview__frame {
  width: 375px;
  height: 667px;
  padding: 12px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 36px;
  background-color: var(--mt-bg-color);
  box-shadow: var(--mt-shadow-base);
  overflow: hidden;
  position: relative;
}

.phone-preview__notch {
  width: 120px;
  height: 20px;
  margin: 0 auto 8px;
  border-radius: 10px;
  background-color: #1a1a1a;
}

.phone-preview__screen {
  height: calc(100% - 28px);
  padding: 12px;
  overflow-y: auto;
  background-color: var(--mt-bg-color-page);
}
</style>
