import { Provider } from 'react-redux'
import { store } from "@/shared/store";
import Layout from "@/app/ui/Layout";

const App = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
)

export default App;
