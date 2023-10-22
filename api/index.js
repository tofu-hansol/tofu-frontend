import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://tofu-hansol.site:9090',
})

function fetchClubById() {
  return instance.get(`/api/clubs/#{id}`)
}

export { fetchClubById }