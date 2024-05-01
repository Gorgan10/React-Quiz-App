import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import QuizWrapper from './containers/Quiz/Quiz';
import {Route, Routes} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/quiz-creator' element={<QuizCreator />} />
          <Route path='/quiz/:id' element={<QuizWrapper />} />
          <Route path='/' element={<QuizList />} />
        </Routes>
      </Layout>
    )
  }
}

export default App;