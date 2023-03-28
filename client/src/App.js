import React from 'react';
import Header from './components/Header';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import Content from './components/Content';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Content />
        </div>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
