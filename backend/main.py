from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return {'message': 'Backend is running'}

def is_dag(graph: Dict[str, List[str]]) -> bool:
    visited = set()
    temp = set()
    
    def has_cycle(node: str) -> bool:
        if node in temp:
            return True
        if node in visited:
            return False
            
        temp.add(node)
        
        for neighbor in graph.get(node, []):
            if has_cycle(neighbor):
                return True
                
        temp.remove(node)
        visited.add(node)
        return False
    
    for node in graph:
        if node not in visited:
            if has_cycle(node):
                return False
    
    return True

@app.post('/pipelines/parse')
async def parse_pipeline(data: dict = Body(...)):
    try:
        if not data:
            raise HTTPException(status_code=400, detail="Request body is empty")
        
        adjacency_list = data.get('pipeline')
        if adjacency_list is None:
            raise HTTPException(status_code=400, detail="Missing 'pipeline' data")
        
        num_nodes = len(adjacency_list)
        num_edges = sum(len(edges) for edges in adjacency_list.values())
        is_dag_result = is_dag(adjacency_list)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
