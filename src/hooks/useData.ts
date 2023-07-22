import data from "./baremetrics.json";
import dayjs from "dayjs";
import type { Columns } from "../types";

export function useData(filterString: string) {
  if (filterString === "") {
  }

  function cleanData() {
    const items: Columns[] = [];
    data.features.items.forEach((item) => {
      items.push({
        id: item.id || "",
        name: item.name || "",
        description: item.description || "",
        edition: item.FeatureEditions.items[0].edition.name || "",
        time_of_screenshot:
          String(dayjs(item.screenshots.items[0].timeOfCapture).unix()) || "",
      });
    });

    return items;
  }

  function tableInfo(): { name: string; tagline: string; description: string } {
    return {
      name: data.name,
      tagline: data.tagline,
      description: data.description,
    };
  }

  function sortData(data: Columns[], sortBy: string, sortDirection: string) {
    if (sortDirection === "asc") {
      return sortAsc(data, sortBy);
    }

    if (sortDirection === "desc") {
      return sortDesc(data, sortBy);
    }
  }

  function sortAsc(data: Columns[], sortBy: string) {
    if (sortBy === "time") {
      return sortTimeAsc(data);
    }

    data.sort((a, b) => {
      const itemA = a[sortBy].toUpperCase();
      const itemB = b[sortBy].toUpperCase();
      if (itemA < itemB) {
        return -1;
      }
      if (itemA > itemB) {
        return 1;
      }

      return 0;
    });
  }

  function sortDesc(data: Columns[], sortBy: string) {
    if (sortBy === "time") {
      return sortTimeDesc(data);
    }

    data.sort((a, b) => {
      const itemA = a[sortBy].toUpperCase();
      const itemB = b[sortBy].toUpperCase();
      if (itemA > itemB) {
        return -1;
      }
      if (itemA < itemB) {
        return 1;
      }

      return 0;
    });
  }

  function sortTimeAsc(data: Columns[]) {
    data.sort((a, b) => {
      const itemA = dayjs(a.time_of_screenshot);
      const itemB = dayjs(b.time_of_screenshot);
      if (itemA.isBefore(itemB)) {
        return -1;
      }
      if (itemA.isAfter(itemB)) {
        return 1;
      }
      return 0;
    });
  }

  function sortTimeDesc(data: Columns[]) {
    data.sort((a, b) => {
      const itemA = dayjs(a.time_of_screenshot);
      const itemB = dayjs(b.time_of_screenshot);
      if (itemA.isAfter(itemB)) {
        return -1;
      }
      if (itemA.isBefore(itemB)) {
        return 1;
      }
      return 0;
    });
  }

  function filterData(data: Columns[], filterString: string) {
    return data.filter((item) => {
      return item.edition.toLowerCase().includes(filterString.toLowerCase());
    });
  }

  return {
    cleanData,
    sortData,
    filterData,
    tableInfo,
  };
}
