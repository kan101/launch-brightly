<template>
  <thead>
    <tr>
      <th
        class="text-base font-normal"
        v-for="column in columns"
        :key="column.key"
      >
        <section
          class="flex justify-between"
          :class="{ 'w-40': column.key === 'edition' }"
        >
          <article>
            <font-awesome-icon
              v-if="column.key === 'edition'"
              :icon="['fas', showEditionFilter ? 'xmark' : 'magnifying-glass']"
              class="mr-2 cursor-pointer"
              id="filter-icon"
              @click.stop="
                showEditionFilter
                  ? clearFilter()
                  : (showEditionFilter = !showEditionFilter)
              "
            />
            <span
              v-if="column.key === 'edition' ? !showEditionFilter : true"
              class="mr-4"
              >{{ column.label }}</span
            >
            <input
              v-if="column.key === 'edition' && showEditionFilter"
              v-model="filterString"
              @keyup="filterEditions"
              id="filter-input"
              type="text"
              placeholder="Filter Editions"
              class="h-6 bg-transparent border-b mr-4 rounded-none border-gray-500 focus:outline-none w-28"
            />
          </article>
          <article
            @click="sortColumn(column.key)"
            class="sort cursor-pointer h-8 w-8 flex flex-col justify-center items-center p-1 rounded-lg"
          >
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
  updateTable();
}

async function filterEditions() {
  if (filterString.value.length > 2) {
    await sleep(500);
    updateTable();
  }
}

function sortState(key: string) {
  return currentSortColumn.value === key ? currentSortDir.value : "none";
}

function clearFilter() {
  showEditionFilter.value = false;
  filterString.value = "";
  updateTable();
}

function updateTable() {
  emit(
    "sort-table",
    currentSortColumn.value,
    currentSortDir.value,
    filterString.value
  );
}
</script>

<style scoped>
.sort {
  background-color: #1d1d1d;
}
</style>
