import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'normalize.css';

import Container from './components/Container';
import Paragraph from './components/Paragraph';
import TaskForm from './containers/TaskForm';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={client}>
    <Container>
      <Paragraph
        as="h1"
        $fontSize="36px"
        $textAlign="center"
        $marginTop="15px"
        $marginBottom="30px"
      >
        Todo App
      </Paragraph>
      <TaskForm />
    </Container>
  </QueryClientProvider>
);

export default App;
