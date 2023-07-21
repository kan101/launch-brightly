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

const { cleanData, sortData, filterData } = useData("");
const rowData = ref(cleanData());
const unfilteredUnsortedData = rowData.value;

function toSort(column: string, direction: string, filterString: string) {
  rowData.value = unfilteredUnsortedData;

  if (filterString.length > 2) {
    rowData.value = filterData(rowData.value, filterString);
  }
  
  sortData(rowData.value, column, direction);
}

</script>

<style scoped></style>
