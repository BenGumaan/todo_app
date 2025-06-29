import { Todo } from "@/features/todos";

const localStorageKey = 'tasks';
export const getStoredData = () => {
  const data = localStorage.getItem(localStorageKey);
  console.log("Stored data:", data);
  return data ? JSON.parse(data) : null;
};
export const setStoredData = (data: Todo[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};




// export const clearStoredData = () => {
//   localStorage.removeItem(localStorageKey);
// };
// export const updateStoredData = (newData: []) => {
//   const currentData = getStoredData();
//   const updatedData = { ...currentData, ...newData };
//   setStoredData(updatedData);
// };
// export const removeStoredData = (key: string) => {
//   const currentData = getStoredData();
//   if (currentData && key in currentData) {
//     delete currentData[key];
//     setStoredData(currentData);
//   }
// };
// export const getStoredItem = (key: string) => {
//   const data = getStoredData();
//   return data ? data[key] : null;
// };
// export const setStoredItem = (key: string, value: string) => {
//   const currentData = getStoredData() || {};
//   currentData[key] = value;
//   setStoredData(currentData);
// };
// export const removeStoredItem = (key: string) => {
//   const currentData = getStoredData();
//   if (currentData && key in currentData) {
//     delete currentData[key];
//     setStoredData(currentData);
//   }
// };
// export const clearStorage = () => {
//   localStorage.clear();
// };
// export const isStorageAvailable = () => {
//   try {
//     const testKey = '__storage_test__';
//     localStorage.setItem(testKey, 'test');
//     localStorage.removeItem(testKey);
//     return true;
//   } catch (e) {
//     return e instanceof DOMException && (
//       e.code === 22 || // QUOTA_EXCEEDED_ERR
//       e.code === 1014 || // NS_ERROR_DOM_QUOTA_REACHED
//       e.name === 'QuotaExceededError' || // Firefox
//       e.name === 'NS_ERROR_DOM_QUOTA_REACHED' // Firefox
//     );
//   }
// };
// export const getStorageSize = () => {
//   let total = 0;
//   for (const key in localStorage) {
//     if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
//       total += localStorage[key].length;
//     }
//   }
//   return total;
// };
// export const getStorageKeys = () => {
//   const keys: string[] = [];
//   for (let i = 0; i < localStorage.length; i++) {
//     keys.push(localStorage.key(i) || '');
//   }
//   return keys;
// }