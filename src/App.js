import { Divider } from './components/Divider/index.ts'
export default function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <Divider/>
      <Divider></Divider>
      <Divider>就此分别</Divider>
      <Divider>
        <div>富强</div>
        <div>民主</div>
        <div>文明</div>
        <div>和谐</div>
      </Divider>
      <p>Welcome to your React application.</p>
    </div>
  )
}
