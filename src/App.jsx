import { useState } from 'react';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import { darkTheme, lightTheme } from './utils/Theme';
import Home from './pages/Home';
import Video from './pages/Video';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Search from './pages/Search';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type='random'/>} />
                  <Route path='trends' element={<Home type='trend'/>} />
                  <Route path='subscriptions' element={<Home type='sub'/>} />
                  <Route path='signin' element={<SignIn />} />
                  <Route path='search' element={<Search />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  flex: 7;
  background: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;

const Wrapper = styled.div`
  padding: 22px;
  
  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;
