import { useApi } from '../composable/useApi'

interface loginArgs {
  email: string
  password: string
}

interface response {
  data: {
    token: string
  }
}

export const login = async (loginArgs: loginArgs) => {
  const api = useApi()
  const response: response = await api.post('/auth', loginArgs)
  return response?.data.token
}
