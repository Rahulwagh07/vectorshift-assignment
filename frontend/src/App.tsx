import React from 'react'
import { PipelineToolbar } from './components/PipelineToolbar'
import { PipelineUI } from './components/PipelineUI'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Pipeline Builder</h1>
        <PipelineToolbar />
        <PipelineUI />
      </div>
    </div>
  )
}

export default App
