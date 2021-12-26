import { Accordion } from "./components/Accordion";

function App() {
  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ margin: 0 }}>Accordion Component</h1>
      <h2>Made with React using Compound Components Pattern</h2>
      <Accordion defaults={[1, 2]} multiple={true}>
        <Accordion.Item>
          <Accordion.Button
            onClick={() => console.log("Clicked Primo Accordion")}
          >
            Pokemon
          </Accordion.Button>
          <Accordion.Panel>Pikachy, Mew, Charizard, Mewtwo</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Button>Digimon</Accordion.Button>
          <Accordion.Panel>Agumon, Babydmon, Bakomon</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Button>Dragonball</Accordion.Button>
          <Accordion.Panel>Goku, Vegeta, Gogeta, Majin Bu</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default App;
