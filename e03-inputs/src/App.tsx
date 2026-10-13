import UncontrolledInput from "./components/UncontrolledInput";
import ControlledInput from "./components/ControlledInput";
function App() {

  return (
    <>
     <UncontrolledInput label="My Input" defaultValue="Hello" />
     <ControlledInput defaultValue="Hello" onChange={(value) => console.log(value)} />
    </>
  )
}

export default App
