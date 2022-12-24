import contentCtrl from '~/utils/content'

const getPostBySlug = async (req, res) => {
  switch(req.method) {
    case 'GET':
      try {
        const {
          fields,
          slug,
        } = req.query

        const data = await contentCtrl.findPostBySlug({
          fields,
          slug,
        })

        res.status(200).json(data)
      } catch (error) {
        res.status(400).end(`Error: ${error}`)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default getPostBySlug
