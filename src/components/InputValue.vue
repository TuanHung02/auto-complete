<!-- InputField.vue -->
<template>
    <input type="text" :placeholder="placeholder" v-model="inputValue" @click="handleClick" />
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps<{
    placeholder: string;
    modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
};

watch(inputValue, (newValue) => {
    emit("update:modelValue", newValue);
});
</script>

<style scoped>
input {
    outline: none;
    border: none;
    background: rgba(229, 249, 255, 0.2);
    font-family: "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    line-height: 20px;
    text-align: left;
    margin: 4.5px 0;
}
</style>