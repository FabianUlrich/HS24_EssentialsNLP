import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import {SentimentAnalysis} from "./SentimentAnalysis.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SentimentAnalysis />
    </QueryClientProvider>
  );
}

export default App;
