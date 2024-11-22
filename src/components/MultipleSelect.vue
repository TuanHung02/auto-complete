<template>
    <div class="multiple-select" ref="dropdownRef">
        <div class="input-container">
            <div style="width: 18px; height: 18px;">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="18" height="18" x="0" y="0" viewBox="0 0 612.01 612.01"
                    style="enable-background:new 0 0 512 512" xml:space="preserve" class="svg-search">
                    <g>
                        <path
                            d="M606.209 578.714 448.198 423.228C489.576 378.272 515 318.817 515 253.393 514.98 113.439 399.704 0 257.493 0S.006 113.439.006 253.393s115.276 253.393 257.487 253.393c61.445 0 117.801-21.253 162.068-56.586l158.624 156.099c7.729 7.614 20.277 7.614 28.006 0a19.291 19.291 0 0 0 .018-27.585zM257.493 467.8c-120.326 0-217.869-95.993-217.869-214.407S137.167 38.986 257.493 38.986c120.327 0 217.869 95.993 217.869 214.407S377.82 467.8 257.493 467.8z"
                            fill="#999999" opacity="1" data-original="#000000" class=""></path>
                    </g>
                </svg>
            </div>
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
            const newSelectedItems = selectedItems.value.filter(i => i.id !== item.id);

            if (newSelectedItems.length === selectedItems.value.length) {
                newSelectedItems.push(item);
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

    &:hover {
        border: 1px solid rgba(25, 145, 210, 1);
    }

    input {
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
    }
}

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