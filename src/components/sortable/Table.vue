<template>
  <div class="overflow-x-auto">
    <table class="table">
      <TableHeader
        @sort-table="toSort"
      />
      <tbody>
        <TableRow :row-data="rowData" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import TableHeader from "./TableHeader.vue";
import TableRow from "./TableRow.vue";
import { useData } from "../../hooks/useData";
import { ref } from "vue";

const filterString = ref("");
const { cleanData, sortData } = useData(filterString.value);
const rowData = ref(cleanData());

function toSort(column: string, direction: string, filterString: string) {
  sortData(rowData.value, column, direction, filterString);
}

</script>

<style scoped></style>
