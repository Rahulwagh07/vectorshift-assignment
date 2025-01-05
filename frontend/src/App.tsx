import { PipelineToolbar } from "./components/PipelineToolbar";
import { PipelineUI } from "./components/PipelineUI";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-3">
        <div className="">
          <PipelineToolbar />
          <PipelineUI />
        </div>
      </div>
    </div>
  );
}

export default App;
