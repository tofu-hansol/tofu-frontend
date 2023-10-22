import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

function fetchClubById() {
  return instance.get(`/club/#{id}`)
}

export { fetchClubById }