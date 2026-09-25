const STORAGE_KEY = 'SMART_PRO_TASKS_DATA';

export const getStoredTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('error localstorage reading', error);
    return [];
  }
};

export const saveStoredTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('error localstorage writing', error);
  }
};