import data from "./baremetrics.json";
import dayjs from "dayjs";
import type { Columns } from "../types";

export function useData() {

  function cleanData() {
    const items: Columns[] = [];
    data.features.items.forEach((item) => {
      items.push({
        id: item.id || "",
        name: item.name || "",
        description: item.description || "",
        edition: item.FeatureEditions.items[0].edition.name || "",
        // use unix timestamp to ease sorting
        time_of_screenshot:
          dayjs(item.screenshots.items[0].timeOfCapture).unix() || 0,
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
      return sortTime(data, "asc");
    }

    data.sort((a, b) => {
      const itemA = String(a[sortBy]).toUpperCase();
      const itemB = String(b[sortBy]).toUpperCase();
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
      return sortTime(data, "desc");
    }

    data.sort((a, b) => {
      const itemA = String(a[sortBy]).toUpperCase();
      const itemB = String(b[sortBy]).toUpperCase();
      if (itemA > itemB) {
        return -1;
      }
      if (itemA < itemB) {
        return 1;
      }

      return 0;
    });
  }

  function sortTime(data: Columns[], sortDirection: string) {
    data.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.time_of_screenshot - b.time_of_screenshot;
      } else return b.time_of_screenshot - a.time_of_screenshot;
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
