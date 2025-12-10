"""
Knowledge Base Routes for Bizzer Agents
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List

from app.api.dependencies import get_current_user
from app.rag.document_processor import DocumentProcessor
from app.rag.retriever import RAGRetriever

router = APIRouter()


class SearchRequest(BaseModel):
    query: str
    top_k: int = 5


class SearchResult(BaseModel):
    content: str
    metadata: dict
    score: float


class SearchResponse(BaseModel):
    results: List[SearchResult]
    query: str


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user),
):
    """
    Upload a document to the knowledge base
    """
    # Validate file type
    allowed_types = [
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"File type {file.content_type} not supported"
        )

    try:
        processor = DocumentProcessor()
        result = await processor.process_file(file)

        return {
            "status": "success",
            "filename": file.filename,
            "chunks_created": result.get("chunks_created", 0),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search")
async def search_knowledge(
    query: str,
    top_k: int = 5,
    user_id: str = Depends(get_current_user),
):
    """
    Search the knowledge base
    """
    retriever = RAGRetriever()
    results = await retriever.search(query, top_k=top_k)

    return {
        "query": query,
        "results": [
            {
                "content": r.get("content", ""),
                "metadata": r.get("metadata", {}),
                "score": r.get("score", 0.0),
            }
            for r in results
        ],
    }


@router.get("/stats")
async def knowledge_stats(
    user_id: str = Depends(get_current_user),
):
    """
    Get knowledge base statistics
    """
    retriever = RAGRetriever()
    stats = await retriever.get_stats()

    return stats
