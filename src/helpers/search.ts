import { isEqual, uniq, uniqWith } from "lodash";

// Define a custom comparator function to compare objects
function customComparator(obj1: any, obj2: any) {
  return isEqual(obj1.item, obj2.item);
}

function reformat(original: any) {
  return original.map((item: any) => {
    return {
      name: item.item.name,
      quotes: item.item.quotes,
    };
  });
}

export function searchByQuotes(query: string, pizzas: any) {
  query = query.toLowerCase();
  const results: any[] = [];

  function searchItems(items: any) {
    for (const item of items) {
      if (item.quotes) {
        for (const quote of item.quotes) {
          if (quote.toLowerCase().includes(query)) {
            results.push({ item });
            break;
          }
        }
      }
      if (item.items) {
        searchItems(item.items);
      }
    }
  }

  function searchProperties(properties: any) {
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {
        const value = properties[property];
        if (typeof value === "object") {
          if (value.quotes) {
            for (const quote of value.quotes) {
              if (quote.toLowerCase().includes(query)) {
                results.push({ item: value });
                break;
              }
            }
          }
          if (value.items) {
            searchItems(value.items);
          }
          if (typeof value === "object") {
            searchProperties(value);
          }
        }
      }
    }
  }

  searchProperties(pizzas);
  const uniqueArray = uniqWith(results, customComparator);
  return reformat(uniqueArray);
}
