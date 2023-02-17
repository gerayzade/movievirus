import Layout from '~/components/Layout'

const NotFound = () => {
  return (
    <Layout title={'404 Not Found'}>
      <div className="error">
        <h1>
          404<br/>
          Not Found
        </h1>
      </div>
    </Layout>
  )
}

export default NotFound
