import apiFetch from './apiFetch';

const CATEGORY_ROUTE = 'categories';

export const getAll = (page = 1) => apiFetch(`${CATEGORY_ROUTE}?pages=true&page=${page}`);

export const getById = (id) => apiFetch(`${CATEGORY_ROUTE}/${id}`);

export const createCategory = (name) => apiFetch(CATEGORY_ROUTE, {
  method: 'POST',
  body: { name },
});

export const updateCategory = (id, name) => apiFetch(`${CATEGORY_ROUTE}/${id}`, {
  method: 'PUT',
  body: { name },
});

export const deleteCategory = (id) => apiFetch(`${CATEGORY_ROUTE}/${id}`, {
  method: 'DELETE',
});

export default { getAll, getById, createCategory, updateCategory, deleteCategory };