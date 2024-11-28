<template>
    <div v-if="dropdownOpen" class="dropdown-body">
        <ul>
            <li v-for="item in filteredItems" :key="item.id" :class="{ selected: selectedItems.includes(item) }"
                @click="toggleSelectItem(item)">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from "vue";
export interface TagItem {
    id: number;
    name: string;
}

const props = defineProps<{
    dropdownOpen: boolean;
    filterText: string;
    items: TagItem[];
    selectedItems: TagItem[];
}>();

const emit = defineEmits(["toggleSelectItem"]);

const filteredItems = computed(() => {
    return props.items.filter((item) =>
        item.name.toLowerCase().includes(props.filterText.toLowerCase())
    );
});

const toggleSelectItem = (item: TagItem) => {
    emit("toggleSelectItem", item);
};
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap');

.dropdown-body {
    border-radius: 4px;
    width: calc(100%);
    z-index: 1;
    max-height: 287px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0px 1px 8px 0px rgba(102, 102, 102, 0.25);
    margin-top: 3px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 8px 10px;
    transition: background-color 0.3s ease;
    background-color: rgba(241, 245, 248, 1);
    color: rgba(72, 101, 129, 1);
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;

}

li:hover {
    background-color: #d8d8d6;
}

li.selected {
    background-color: #627d98;
    color: #f9ffff;
}

li.selected:hover {
    background-color: #627d98;
}
</style>