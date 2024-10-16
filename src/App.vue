<template>
  <div id="app">
    <div class="auto-complete-container">
      <MultipleSelect :tagsSelected="tagsSelected" :items="tagItems" @change="handleSelectTags" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import MultipleSelect from './components/MultipleSelect.vue';
import axios from 'axios';

export interface TagItem {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'App',
  components: {
    MultipleSelect
  }, setup() {
    const tagsSelected = ref<TagItem[]>([]); // State để quản lý các thẻ đã chọn
    const tagItems = ref<TagItem[]>([]); // Mảng các thẻ, sẽ được cập nhật từ API

    // Hàm xử lý sự thay đổi khi chọn thẻ
    const handleSelectTags = (selectedTags: TagItem[]) => {
      tagsSelected.value = selectedTags; // Cập nhật state tagsSelected
    };
    // Hàm gọi API để lấy dữ liệu tagItems
    const fetchTagItems = async () => {
      try {
        const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
        tagItems.value = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy tag items:', error);
      }
    };

    console.log(tagItems.value);
    // Gọi API khi component được mounted
    onMounted(() => {
      fetchTagItems();
    });

    return {
      tagsSelected,
      tagItems,
      handleSelectTags,
    };
  },
});

</script>
<style scoped>
.auto-complete-container {
  width: 400px;
  margin: auto;
  padding-top: 100px;
}
</style>