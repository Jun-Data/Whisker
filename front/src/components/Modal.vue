<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null);
onClickOutside(target, () => emit('modal-close'));
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <!-- 기본 header 삭제 -->
        <div class="modal-header">
          <slot name="header"></slot> <!-- header 슬롯이 비어있으면 기본 텍스트를 안 보여줌 -->
        </div>

        <!-- 모달 내용 -->
        <div class="modal-body">
          <slot name="content"></slot>
        </div>

        <!-- 기본 footer 삭제 -->
        <div class="modal-footer">
          <slot name="footer"></slot> <!-- footer 슬롯이 비어있으면 기본 텍스트를 안 보여줌 -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
