<template>
    <div class="multiple-select">
        <div class="input-wrapper">
            <div class="input-border">
                <i class="fa-solid fa-magnifying-glass"></i>
                <div class="selected-tags">
                    <span v-for="(city, index) in selectedCities" :key="index" class="selected-tag">
                        {{ city.name }}
                        <button class="remove-btn" @click="removeCity(city)">x</button>
                    </span>
                </div>
                <input type="text" v-model="searchQuery" @input="filterOptions" @focus="showDropdown = true"
                    placeholder="Nhập tên thành phố để tìm kiếm..." />
            </div>

        </div>
        <div v-if="showDropdown" class="dropdown">
            <ul>
                <li v-for="(city, index) in filteredCities" :key="index" @click="selectCity(city)"
                    class="dropdown-item">
                    {{ city.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
    name: 'MultipleSelect',
    setup() {
        const cities = ref<{ name: string }[]>([
            { name: 'Hà Nội' },
            { name: 'Hoà Bình' },
            { name: 'Hưng Yên' },
            { name: 'Hải Phòng' },
            { name: 'Đà Nẵng' },
        ]);

        const selectedCities = ref<{ name: string }[]>([]);
        const searchQuery = ref('');
        const showDropdown = ref(false);
        const filteredCities = ref<{ name: string }[]>([]);

        const filterOptions = () => {
            if (searchQuery.value) {
                filteredCities.value = cities.value.filter((city) =>
                    city.name.toLowerCase().includes(searchQuery.value.toLowerCase())
                );
            } else {
                filteredCities.value = cities.value;
            }
        };

        const selectCity = (city: { name: string }) => {
            if (!selectedCities.value.includes(city)) {
                selectedCities.value.push(city);
                searchQuery.value = '';
                filterOptions();
            }
        };

        const removeCity = (city: { name: string }) => {
            selectedCities.value = selectedCities.value.filter(
                (selected) => selected.name !== city.name
            );
        };

        const closeDropdown = (event: Event) => {
            // Kiểm tra nếu click bên ngoài vùng dropdown thì đóng dropdown
            if (!dropdownWrapper.value?.contains(event.target as Node)) {
                showDropdown.value = false;
            }
        };

        const dropdownWrapper = ref<HTMLElement | null>(null);

        // Thêm sự kiện lắng nghe click bên ngoài dropdown
        onMounted(() => {
            document.addEventListener('click', closeDropdown);
        });

        // Loại bỏ sự kiện lắng nghe khi component bị hủy
        onBeforeUnmount(() => {
            document.removeEventListener('click', closeDropdown);
        });

        return {
            cities,
            selectedCities,
            searchQuery,
            showDropdown,
            filteredCities,
            filterOptions,
            selectCity,
            removeCity,
            dropdownWrapper,
        };
    },
});
</script>



<style scoped>
.multiple-select {
    width: 400px;
    position: relative;
}

.input-border {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 10px 10px;
    border: 1px solid #dedfdf;
    background: #f4f8f9;
    border-radius: 4px;

    &:hover {
        border: 1px solid #9cbdce;
    }
}

.input-wrapper {
    display: flex;
    flex-direction: column;

    input {
        width: 100%;
        outline: none;
        border: none;
        background: #f4f8f9;
        font-family: Noto Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-align: left;
    }
}

.selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
}

.selected-tag {
    display: inline-flex;
    align-items: center;
    background-color: #e0e0e0;
    padding: 5px 10px;
    border-radius: 15px;
}

.remove-btn {
    background: none;
    border: none;
    margin-left: 5px;
    cursor: pointer;
}

.dropdown {
    position: absolute;
    width: 100%;
    background-color: white;
    border: 1px solid #ddd;
    max-height: 150px;
    overflow-y: auto;
    z-index: 10;
}

.dropdown-item {
    padding: 10px;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #f0f0f0;
}
</style>