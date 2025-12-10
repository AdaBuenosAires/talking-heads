# Bizzer Network Stack

A monorepo microservices architecture for corporate compliance and governance solutions.

## Overview

This repository contains:

- **bizzer-website**: React frontend + Django backend for Free Trial / Interactive Diagnostic Wizard
- **bizzer-agents**: FastAPI backend with Smart Agents and RAG for automated customer service
- **Shared Infrastructure**: Centralized auth, session management, Docker network

## Tech Stack

### Frontend (bizzer-website)
- React 18+ with Vite
- Redux Toolkit for state management
- React Router v6
- Tailwind CSS (Apple-style design)
- i18next for internationalization (EN/ES)
- Framer Motion for animations

### Backend Website (bizzer-website)
- Django 5+ with Django REST Framework
- Djoser for authentication
- PostgreSQL database
- Simple JWT for tokens

### Backend Agents (bizzer-agents)
- FastAPI for REST API
- ChromaDB for vector storage
- Ollama with Gemma 2B (default) or Claude/OpenAI API
- Redis for session management

### Infrastructure
- Docker Compose with internal network
- Redis as session store
- PostgreSQL (shared with separate schemas)
- Nginx as reverse proxy
- GitHub Actions CI/CD

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bizzer-network
   ```

2. **Copy environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start development environment**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
   ```

4. **Access the services**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Agents API: http://localhost:8001
   - Django Admin: http://localhost:8000/admin

### Production Deployment

1. **Configure environment**
   ```bash
   cp .env.example .env
   # Set production values
   ```

2. **Build and start**
   ```bash
   docker-compose up -d --build
   ```

## Project Structure

```
bizzer-network/
├── .github/workflows/          # CI/CD pipelines
├── shared/                     # Shared configurations
│   ├── auth/                   # JWT config
│   ├── schemas/                # Shared schemas
│   └── constants/              # Diagnosis types
├── bizzer-website/
│   ├── frontend/               # React application
│   └── backend/                # Django application
├── bizzer-agents/              # FastAPI agents
├── nginx/                      # Reverse proxy
├── docker-compose.yml          # Production config
├── docker-compose.dev.yml      # Development overrides
└── .env.example                # Environment template
```

## Features

### Diagnostic Wizard

The wizard guides users through 6 steps to identify their compliance needs:

1. Current situation
2. Organization size
3. Industry
4. Main pain point
5. Urgency level
6. Decision maker role

### Solutions

Based on the diagnosis, users are recommended one of:

- **Data Room for Audits**: For frequent audit documentation sharing
- **Corporate Doc Gap Analysis**: For market expansion preparation
- **Deal Teaser**: For tender/bid management
- **Data Room Prep**: For due diligence preparation
- **Deal Visor**: For contract monitoring
- **Smart Data Room**: For sensitive contracts with digital signatures

### Chat Widget

AI-powered chat assistant that:
- Uses RAG for knowledge-based responses
- Personalizes based on user context
- Supports switching between Ollama/Claude/OpenAI

## LLM Configuration

The agents support multiple LLM providers. Set in `.env`:

```bash
# Local (free) - default
LLM_PROVIDER=ollama
OLLAMA_MODEL=gemma2:2b

# Claude (paid)
LLM_PROVIDER=claude
ANTHROPIC_API_KEY=your-key

# OpenAI (paid)
LLM_PROVIDER=openai
OPENAI_API_KEY=your-key
```

## Adding New Services

1. Create service directory with Dockerfile
2. Add to `docker-compose.yml`
3. Connect to `bizzer_network`
4. Configure route in `nginx/nginx.conf`
5. Share JWT secret for auth

## API Documentation

- **Website API**: http://localhost:8000/api/
- **Agents API**: http://localhost:8001/docs (Swagger UI)

## Contributing

1. Create feature branch
2. Make changes
3. Test locally with `docker-compose.dev.yml`
4. Submit pull request

## License

Proprietary - All rights reserved.
