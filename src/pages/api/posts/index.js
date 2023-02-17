import contentfulService from '~/utils/contentful'

const getAllPosts = async (req, res) => {
  switch(req.method) {
    case 'GET':
      try {
        const data = await contentfulService.getEntries('post', req.query)

        res.status(200).json(data)
      } catch (error) {
        res.status(400).end(`${error}`)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default getAllPosts
