<template>
    <div class="search-input">
        <input type="text" placeholder="Nhập tên thành phố để tìm kiếm..." v-model="inputValue" @input="onInputChange"
            @click="handleClick" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Define emits để phát sự kiện khi thay đổi giá trị
const emit = defineEmits<{
    (event: 'update:value', value: string): void; // Sự kiện phát ra khi input thay đổi
}>();

const props = defineProps<{
    value: string;
}>();

// Lưu trữ giá trị input
const inputValue = ref(props.value);

// Hàm gọi khi có thay đổi input
const onInputChange = () => {
    emit('update:value', inputValue.value); // Phát sự kiện 'update:value' lên component cha
};

// Hàm xử lý click vào input
const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
};
</script>

<style scoped>
.search-input input {
    outline: none;
    border: none;
    background: rgba(229, 249, 255, 0.2);
    font-family: "Noto Sans JP", sans-serif !important;
    font-optical-sizing: auto !important;
    font-weight: 400 !important;
    font-style: normal !important;
    line-height: 20px;
    text-align: left;
    margin: 4.5px 0;
    padding: 8px;
    width: 100%;
}
</style>