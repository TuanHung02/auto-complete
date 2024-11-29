<!-- SelectedItems.vue -->
<template>
    <div class="selected-items">
        <div v-for="item in selectedItems" :key="item.id" class="selected-item">
            {{ item.name }}
            <span class="remove-item" @click.stop="removeSelectedItem(item)">
                <i class="fa-solid fa-xmark"></i>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

export interface TagItem {
    id: number;
    name: string;
}

const props = defineProps<{
    selectedItems: TagItem[];
}>();
console.log(props);

const emit = defineEmits(["removeItem"]);

const removeSelectedItem = (item: TagItem) => {
    emit("removeItem", item);
};
</script>

<style scoped>
.selected-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-grow: 1;
    gap: 4px;
}

.selected-item {
    background-color: rgba(240, 244, 248, 1);
    color: rgba(98, 125, 152, 1);
    padding: 6px 8px;
    font-weight: 400;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid rgba(220, 220, 220, 1);
    height: 32px;
    box-sizing: border-box;
}

.remove-item {
    margin-left: 8px;
    cursor: pointer;
    font-weight: bold;
}

.remove-item i:hover {
    color: rgb(219, 46, 46);
}
</style>