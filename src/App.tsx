import { BrowserRouter } from 'react-router-dom'
import './App.css'
import palette from './constants/Colors'
import { Landing } from './pages'
import { Grid } from './components/shared/Grid'

const AppWrapper = ({children}: React.PropsWithChildren) => {
  return (
    <Grid style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: palette.light.black,
      color: palette.light.white,
    }}>
      {children}
    </Grid>
  )
}

const App =  () => {

  return (
    <AppWrapper>
      <BrowserRouter>
        <Landing/>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App
