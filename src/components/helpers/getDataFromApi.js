// to get data from api
const getDataFromApi = async (url, limit, date) => {
  const payload = {
    limit,
    date
  };
  const formData = new FormData();
  formData.append('json', JSON.stringify(payload));
  return fetch(url, {
    method: 'POST',
    body: formData,
    dataType: 'jsonp',
  });
};
export default getDataFromApi;