<template>
  <tr v-for="item in rowData" :key="item.id">
    <td>{{ item.id }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.description }}</td>
    <td>{{ item.edition }}</td>
    <td>{{ item.time_of_screenshot }}</td>
  </tr>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Columns } from "../../types.ts";

const props = defineProps({
  rowData: { type: Array as PropType<Columns[]>, required: true },
});
</script>

<style lang="scss" scoped></style>
