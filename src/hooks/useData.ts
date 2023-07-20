import data from "./baremetrics.json";
import type { Columns } from "../types";

export function useData(filterString: string) {
  if (filterString === "") {
  }

  function cleanData() {
    const items: Columns[] = [];
    data.features.items.forEach((item) => {
      items.push({
        id: item.id,
        name: item.name,
        description: item.description,
        edition: item.FeatureEditions.items[0].edition.name,
        time_of_screenshot: item.screenshots.items[0].timeOfCapture,
      });
    });

    return items;
  }

  function sortData(
    data: Columns[],
    sortBy: string,
    sortDirection: string,
    filterString: string
  ) {
    if (sortDirection === "asc") {
      if (filterString !== "") {
        const filteredData = filterData(data, filterString);
        return sortAsc(filteredData, sortBy);
      }

      return sortAsc(data, sortBy);
    }

    if (sortDirection === "desc") {
      if (filterString !== "") {
        const filteredData = filterData(data, filterString);
        return sortDesc(filteredData, sortBy);
      }

      return sortDesc(data, sortBy);
    }
  }

  function sortAsc(data: Columns[], sortBy: string) {
    console.log("data: ", data)
    data.sort((a, b) => {
      const itemA = a[sortBy].toUpperCase(); // ignore upper and lowercase
      const itemB = b[sortBy].toUpperCase(); // ignore upper and lowercase
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
    data
      .sort((a, b) => {
        const itemA = a[sortBy].toUpperCase(); // ignore upper and lowercase
        const itemB = b[sortBy].toUpperCase(); // ignore upper and lowercase
        if (itemA < itemB) {
          return -1;
        }
        if (itemA > itemB) {
          return 1;
        }

        return 0;
      })
      .reverse();
  }

  function filterData(data: Columns[], filterString: string) {
    console.log("filterString: ", filterString);
    const b = data.filter((item) => {
      const a = item.edition.toLowerCase().includes(filterString.toLowerCase());
      return a;
    });

    console.log("b: ", b);
    return b;
  }

  return {
    cleanData,
    sortData,
  };
}
