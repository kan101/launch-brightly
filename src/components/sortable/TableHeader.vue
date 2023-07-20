<template>
  <thead>
    <tr>
      <th
        class="cursor-pointer text-base font-normal"
        v-for="column in columns"
        :key="column.key"
        @click="sortColumn(column.key)"
      >
        <section
          class="flex justify-between"
          :class="{ 'w-40': column.key === 'edition' }"
        >
          <article>
            <font-awesome-icon
              v-if="column.key === 'edition'"
              :icon="['fas', showEditionFilter ? 'xmark' : 'magnifying-glass']"
              class="mr-2"
              @click.stop="showEditionFilter = !showEditionFilter"
            />
            <span v-if="column.key === 'edition' ? !showEditionFilter : true" class="mr-4">{{ column.label }}</span>
            <input
              v-if="column.key === 'edition' && showEditionFilter"
              v-model="filterString"
              @input="filterEditions"
              type="text"
              placeholder="Filter Editions"
              class="h-6 bg-transparent border-b mr-4 border-gray-500 focus:outline-none focus:border-blue-500 w-28"
            />
          </article>
          <article class="flex flex-col">
            <font-awesome-icon
              class="text-xs"
              v-show="
                sortState(column.key) === 'asc' ||
                sortState(column.key) === 'none'
              "
              :icon="['fas', 'angle-up']"
            />
            <font-awesome-icon
              class="text-xs"
              v-show="
                sortState(column.key) === 'desc' ||
                sortState(column.key) === 'none'
              "
              :icon="['fas', 'angle-down']"
            />
          </article>
        </section>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { sleep } from "../../utils/utils";

const emit = defineEmits(["sort-table"]);

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "description", label: "Descriptions" },
  { key: "edition", label: "Editions" },
  { key: "time", label: "Time of Screenshot" },
];

const currentSortColumn = ref("none");
const currentSortDir = ref("none");

const showEditionFilter = ref(false);
const filterString = ref("");

function sortColumn(key: string) {
  currentSortColumn.value = key;
  currentSortDir.value = currentSortDir.value === "asc" ? "desc" : "asc";
  emit("sort-table", currentSortColumn.value, currentSortDir.value, filterString.value);
}

function filterEditions() {
  if (filterString.value.length > 2) {
    sleep(500).then(() => {
      emit("sort-table", currentSortColumn.value, currentSortDir.value, filterString.value);
    });
  }
}

function sortState(key: string) {
  return currentSortColumn.value === key ? currentSortDir.value : "none";
}

</script>

<style scoped></style>
