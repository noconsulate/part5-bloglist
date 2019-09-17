const blogs = [
  {
    id: '333',
    author: 'janssen kuhn',
    title: 'sitting is easy',
    url: 'www.sitting.com',
    likes: 600,
    user: 'janssen'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default {getAll}