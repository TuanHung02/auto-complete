<template>
    <div class="multiple-select" ref="dropdownRef">
        <div class="input-container">
            <div style="width: 18px; height: 18px;">
                <SearchIcon />
            </div>
            <div class="selected-items">
                <SelectedList :selectedItems="selectedItems" @removeItem="removeSelectedItem" />
                <InputValue v-model="filterText" :placeholder="'Nhập tên thành phố...'" @click="handleInputClick" />
            </div>
        </div>
        <DropdownMenu :dropdownOpen="dropdownOpen" :filterText="filterText" :items="filteredItems"
            :selectedItems="selectedItems" @toggleSelectItem="toggleSelectItem" />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import SearchIcon from "./icons/SearchIcon.vue";
import DropdownMenu from "./DropdownMenu.vue";
import InputValue from "./InputValue.vue";
import SelectedList from "./SelectedList.vue";

export interface TagItem {
    id: number;
    name: string;
}

const props = defineProps<{
    tagsSelected: TagItem[];
    items: TagItem[];
    onChange: (items: TagItem[]) => void;
}>();

const emit = defineEmits(["change"]);

const selectedItems = ref<TagItem[]>([...props.tagsSelected]);
const filterText = ref<string>("");
const dropdownOpen = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

const filteredItems = computed(() => {
    return props.items.filter((item) =>
        item.name.toLowerCase().includes(filterText.value.toLowerCase())
    );
});

const toggleSelectItem = (item: TagItem) => {
    const newSelectedItems = selectedItems.value.filter((i) => i.id !== item.id);
    if (newSelectedItems.length === selectedItems.value.length) {
        newSelectedItems.push(item);
    }
    selectedItems.value = newSelectedItems;
    filterText.value = "";
    emit("change", newSelectedItems);
};

const handleInputClick = (e: MouseEvent) => {
    e.stopPropagation();
    dropdownOpen.value = true;
};

const removeSelectedItem = (item: TagItem) => {
    const newSelectedItems = selectedItems.value.filter((i) => i.id !== item.id);
    selectedItems.value = newSelectedItems;
    dropdownOpen.value = true;
    emit("change", newSelectedItems);
};

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        dropdownOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClickOutside);
});

watch(
    () => props.tagsSelected,
    (newTags) => {
        if (newTags && newTags.length > 0) {
            selectedItems.value = newTags;
        }
    }
);
</script>



<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap');

.multiple-select {
    position: relative;
    box-sizing: border-box;
    font-family: "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

.input-container {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    align-items: center;
    padding: 8px 10px;
    border: 1px solid rgba(219, 219, 219, 1);
    background: rgba(229, 249, 255, 0.2);
    border-radius: 4px;
    min-height: 32px;
}

.selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.arrow {
    margin-left: 10px;
}

/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #868c92;
    border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #526070;
}

:-ms-input-placeholder {
    color: rgba(191, 191, 191, 1);
    /* Internet Explorer 10-11 */
}

::-ms-input-placeholder {
    color: rgba(191, 191, 191, 1);
    /* Microsoft Edge */
}

::placeholder {
    color: rgba(191, 191, 191, 1);
    /* Firefox, Chrome, Opera */
}

.svg-search {
    width: 18px !important;
    height: 18px !important;
}
</style>