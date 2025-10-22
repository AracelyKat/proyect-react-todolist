import apiFetch from './apiFetch';

const TAG_ROUTE = 'tags';

export const getAll = () => apiFetch(TAG_ROUTE);

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