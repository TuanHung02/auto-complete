<template>
    <div class="multiple-select" ref="dropdownRef">
        <div class="input-container">
            <i style="color: rgba(98, 125, 152, 1);" class="fa-solid fa-magnifying-glass"></i>
            <div class="selected-items">
                <div v-for="item in selectedItems" :key="item.id" class="selected-item">
                    {{ item.name }} <!-- Hiển thị thuộc tính name -->
                    <span class="remove-item" @click.stop="removeSelectedItem(item)">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <input type="text" placeholder="Nhập tên thành phố để tìm kiếm..." v-model="filterText"
                    @click="handleInputClick" />
            </div>
        </div>

        <div v-if="dropdownOpen" class="dropdown-body">
            <ul>
                <li v-for="item in filteredItems" :key="item.id" :class="{ selected: selectedItems.includes(item) }"
                    @click="toggleSelectItem(item)">
                    {{ item.name }} <!-- Hiển thị thuộc tính name -->
                </li>
            </ul>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';

// Xuất interface TagItem
export interface TagItem {
    id: number;
    name: string;
}

export default defineComponent({
    name: 'MultipleSelect',
    props: {
        tagsSelected: {
            type: Array as () => TagItem[],
            default: () => []
        },
        items: {
            type: Array as () => TagItem[],
            required: true
        },
        onChange: {
            type: Function as unknown as () => (items: TagItem[]) => void,
            required: true
        }
    },
    setup(props) {
        const selectedItems = ref<TagItem[]>(props.tagsSelected);
        const filterText = ref<string>('');
        const dropdownOpen = ref<boolean>(false);
        const dropdownRef = ref<HTMLElement | null>(null);

        const filteredItems = computed(() => {
            // Kiểm tra xem props.items có phải là một mảng không
            if (!Array.isArray(props.items)) {
                console.warn("items is not an array", props.items); // Ghi ra cảnh báo nếu không phải là mảng
                return []; // Trả về mảng rỗng nếu không phải là mảng
            }

            // Nếu là mảng, tiếp tục lọc
            return props.items.filter(item => item.name.toLowerCase().includes(filterText.value.toLowerCase()));
        });

        const toggleSelectItem = (item: TagItem) => {
            let newSelectedItems: TagItem[] = [...selectedItems.value];
            if (selectedItems.value.includes(item)) {
                newSelectedItems = selectedItems.value.filter(i => i.id !== item.id);
            } else {
                newSelectedItems = [...selectedItems.value, item];
            }

            selectedItems.value = newSelectedItems;
            filterText.value = '';
            props.onChange(newSelectedItems);
        };

        const handleInputClick = (e: MouseEvent) => {
            e.stopPropagation();
            dropdownOpen.value = true;
        };

        const removeSelectedItem = (item: TagItem) => {
            const newSelectedItems = selectedItems.value.filter(i => i.id !== item.id);
            selectedItems.value = newSelectedItems;
            dropdownOpen.value = true;
            props.onChange(newSelectedItems);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
                dropdownOpen.value = false;
            }
        };

        onMounted(() => {
            document.addEventListener('mousedown', handleClickOutside);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('mousedown', handleClickOutside);
        });

        watch(() => props.tagsSelected, (newTags) => {
            if (newTags && newTags.length > 0) {
                selectedItems.value = newTags;
            }
        });

        return {
            selectedItems,
            filterText,
            dropdownOpen,
            filteredItems,
            toggleSelectItem,
            handleInputClick,
            removeSelectedItem,
            dropdownRef,
        };
    }
});
</script>


<style lang="css" scoped>
/* Your styles here */
</style>


<style lang="css" scoped>
.multiple-select {
    position: relative;
    box-sizing: border-box;
}

.input-container {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    align-items: center;
    padding: 8px 10px;
    border: 1px solid #dedfdf;
    background: #f4f8f9;
    border-radius: 4px;

    &:hover {
        border: 1px solid #9cbdce;
    }

    input {
        outline: none;
        border: none;
        background: #f4f8f9;
        font-family: Noto Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-align: left;
        margin: 4.5px 0;
    }
}

.selected-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-grow: 1;
    gap: 5px;

}

.selected-item {
    background-color: rgba(240, 244, 248, 1);
    color: rgba(98, 125, 152, 1);
    padding: 6px;
    font-weight: 400;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: 14px;
    border: 1px solid rgba(219, 219, 219, 1)
}

.remove-item {
    margin-left: 10px;
    cursor: pointer;
    font-weight: bold;
}

.remove-item i:hover {
    color: rgb(219, 46, 46);
}

.input-container input {
    border: none;
    outline: none;
    flex-grow: 1;
}

.arrow {
    margin-left: 10px;
}

.dropdown-body {
    border-radius: 4px;
    width: calc(100%);
    z-index: 1;
    max-height: 290px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0px 1px 8px 0px rgba(102, 102, 102, 0.25);
    margin-top: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 10.5px;
    transition: background-color 0.3s ease;
    background-color: #f4f8f9;
    color: #4c657c;
    height: 20px;
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
</style>