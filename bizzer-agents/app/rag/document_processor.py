"""
Document Processor for RAG
"""
from typing import Optional, Dict
import uuid
from typing import List, Dict, Any
from fastapi import UploadFile
from app.rag.retriever import RAGRetriever


class DocumentProcessor:
    """Processes documents for the knowledge base"""

    def __init__(self):
        self.retriever = RAGRetriever()
        self.chunk_size = 1000
        self.chunk_overlap = 200

    async def process_file(self, file: UploadFile) -> Dict[str, Any]:
        """Process an uploaded file"""
        content = await file.read()

        # Decode content
        try:
            text = content.decode("utf-8")
        except UnicodeDecodeError:
            text = content.decode("latin-1")

        # Split into chunks
        chunks = self._split_text(text)

        # Generate IDs and metadata
        file_id = str(uuid.uuid4())
        ids = [f"{file_id}_{i}" for i in range(len(chunks))]
        metadatas = [
            {
                "filename": file.filename,
                "file_id": file_id,
                "chunk_index": i,
                "content_type": file.content_type,
            }
            for i in range(len(chunks))
        ]

        # Add to retriever
        success = await self.retriever.add_documents(
            documents=chunks,
            metadatas=metadatas,
            ids=ids,
        )

        return {
            "success": success,
            "file_id": file_id,
            "chunks_created": len(chunks),
        }

    def _split_text(self, text: str) -> List[str]:
        """Split text into chunks"""
        chunks = []
        start = 0

        while start < len(text):
            end = start + self.chunk_size

            # Try to find a good break point
            if end < len(text):
                # Look for paragraph break
                break_point = text.rfind("\n\n", start, end)
                if break_point == -1 or break_point <= start:
                    # Look for sentence break
                    break_point = text.rfind(". ", start, end)
                if break_point == -1 or break_point <= start:
                    # Look for any space
                    break_point = text.rfind(" ", start, end)
                if break_point > start:
                    end = break_point + 1

            chunk = text[start:end].strip()
            if chunk:
                chunks.append(chunk)

            start = end - self.chunk_overlap

        return chunks

    async def process_text(
        self,
        text: str,
        metadata: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Process raw text"""
        chunks = self._split_text(text)

        doc_id = str(uuid.uuid4())
        ids = [f"{doc_id}_{i}" for i in range(len(chunks))]

        base_metadata = metadata or {}
        metadatas = [
            {**base_metadata, "doc_id": doc_id, "chunk_index": i}
            for i in range(len(chunks))
        ]

        success = await self.retriever.add_documents(
            documents=chunks,
            metadatas=metadatas,
            ids=ids,
        )

        return {
            "success": success,
            "doc_id": doc_id,
            "chunks_created": len(chunks),
        }


# Make Optional available
from typing import Optional
