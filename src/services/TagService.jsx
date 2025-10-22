import apiFetch from './apiFetch';

const TAG_ROUTE = 'tags';

export const getAll = (page = 1) => apiFetch(`${TAG_ROUTE}?pages=true&page=${page}`);

export const getById = (id) => apiFetch(`${TAG_ROUTE}/${id}`);

export const createTag = (name) => apiFetch(TAG_ROUTE, {
  method: 'POST',
  body: { name },
});

export const updateTag = (id, name) => apiFetch(`${TAG_ROUTE}/${id}`, {
  method: 'PUT',
  body: { name },
});

export const deleteTag = (id) => apiFetch(`${TAG_ROUTE}/${id}`, {
  method: 'DELETE',
});

export default { getAll, getById, createTag, updateTag, deleteTag };