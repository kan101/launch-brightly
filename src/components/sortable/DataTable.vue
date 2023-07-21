<template>
  <section>
    <h1 class="text-left mb-8 text-4xl">{{ tableInfo().name }}</h1>
    <div class="overflow-x-auto">
      <table class="table">
        <DataTableHeader @sort-table="toSort" data-test="data-table-header"/>
        <tbody>
          <DataTableRow :row-data="rowData" data-test="data-table-row"/>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import DataTableHeader from "./DataTableHeader.vue";
import DataTableRow from "./DataTableRow.vue";
import { useData } from "../../hooks/useData";
import { ref } from "vue";

const { cleanData, sortData, filterData, tableInfo } = useData("");
const rowData = ref(cleanData());
const unfilteredUnsortedData = rowData.value;

function toSort(column: string, direction: string, filterString: string) {
  // reset filter & sort
  rowData.value = unfilteredUnsortedData;

  if (filterString.length > 2) {
    rowData.value = filterData(rowData.value, filterString);
  }

  // array sorted in place
  sortData(rowData.value, column, direction);
}
</script>

<style scoped></style>
