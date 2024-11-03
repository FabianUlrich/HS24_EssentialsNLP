import { useQuery } from 'react-query'

import './App.css'

function App() {

  const { data, error, isLoading } = useQuery('helloData', async () => (await axios.get('/api/hello')).data)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error fetching data: {error.message}</p>

  return (
    <>
      <div>
        <p>{JSON.stringify(data)}</p>
      </div>
    </>
  )
}

export default App
