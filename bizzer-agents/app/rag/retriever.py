"""
RAG Retriever for Bizzer Agents
"""

from typing import List, Dict, Any, Optional
import chromadb
from chromadb.config import Settings as ChromaSettings
from app.config import settings


class RAGRetriever:
    """Retriever for RAG using ChromaDB"""

    def __init__(self):
        self.client = chromadb.PersistentClient(
            path=settings.chroma_persist_dir,
            settings=ChromaSettings(anonymized_telemetry=False),
        )
        self.collection_name = "bizzer_knowledge"
        self._ensure_collection()

    def _ensure_collection(self):
        """Ensure the collection exists"""
        try:
            self.collection = self.client.get_or_create_collection(
                name=self.collection_name,
                metadata={"description": "Bizzer knowledge base"},
            )
        except Exception as e:
            print(f"Error creating collection: {e}")
            self.collection = None

    async def search(
        self,
        query: str,
        top_k: int = 5,
        filter_metadata: Optional[Dict] = None,
    ) -> List[Dict[str, Any]]:
        """Search for relevant documents"""
        if not self.collection:
            return []

        try:
            # Query the collection
            results = self.collection.query(
                query_texts=[query],
                n_results=top_k,
                where=filter_metadata,
            )

            # Format results
            formatted_results = []
            if results and results.get("documents"):
                documents = results["documents"][0]
                metadatas = results.get("metadatas", [[]])[0]
                distances = results.get("distances", [[]])[0]

                for i, doc in enumerate(documents):
                    formatted_results.append({
                        "content": doc,
                        "metadata": metadatas[i] if i < len(metadatas) else {},
                        "score": 1 - distances[i] if i < len(distances) else 0,
                    })

            return formatted_results

        except Exception as e:
            print(f"Search error: {e}")
            return []

    async def add_documents(
        self,
        documents: List[str],
        metadatas: Optional[List[Dict]] = None,
        ids: Optional[List[str]] = None,
    ) -> bool:
        """Add documents to the collection"""
        if not self.collection:
            return False

        try:
            if not ids:
                ids = [f"doc_{i}" for i in range(len(documents))]

            self.collection.add(
                documents=documents,
                metadatas=metadatas or [{}] * len(documents),
                ids=ids,
            )
            return True

        except Exception as e:
            print(f"Add documents error: {e}")
            return False

    async def delete_documents(self, ids: List[str]) -> bool:
        """Delete documents from the collection"""
        if not self.collection:
            return False

        try:
            self.collection.delete(ids=ids)
            return True

        except Exception as e:
            print(f"Delete documents error: {e}")
            return False

    async def get_stats(self) -> Dict[str, Any]:
        """Get collection statistics"""
        if not self.collection:
            return {"error": "Collection not available"}

        try:
            count = self.collection.count()
            return {
                "collection_name": self.collection_name,
                "document_count": count,
            }

        except Exception as e:
            return {"error": str(e)}
