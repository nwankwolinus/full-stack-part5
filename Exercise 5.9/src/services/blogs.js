import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token}
  }

  const blog = await axios.post(baseUrl, blogData, config)
  return blog.data
}

const update = async (id,blogData) => {
  const config = {
    headers: { Authorization: token }
  }

  // const blog = await axios.post(baseUrl, blogData, config)
  const blog = await axios.put(`${baseUrl}/${id}`, blogData, config)
  return blog.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update }