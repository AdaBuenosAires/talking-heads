/**
 * Bizzer Ecosystem Architecture Page
 * Protected page only visible to Bizzer employees
 */

export default function EcosystemArchitecture() {
  return (
    <div className="min-h-screen bg-black text-gray-100 p-5 md:p-10">
      <style>{`
        .ecosystem-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .ecosystem-container {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
        }

        .ecosystem-container h1 {
          text-align: center;
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 40px;
          letter-spacing: -0.02em;
          color: #f5f5f7;
        }

        .ecosystem {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .layer {
          background: #1d1d1f;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #424245;
        }

        .layer-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #424245;
        }

        .layer-number {
          background: #f5f5f7;
          color: #1d1d1f;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .layer-title {
          font-size: 18px;
          font-weight: 600;
          color: #f5f5f7;
        }

        .layer-subtitle {
          color: #86868b;
          font-size: 14px;
          margin-left: auto;
        }

        .services {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .service {
          background: #2d2d2d;
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 180px;
          flex: 1;
          border: 1px solid #424245;
          transition: all 0.3s ease;
          cursor: default;
        }

        .service:hover {
          background: #3d3d3d;
          transform: translateY(-2px);
        }

        .service-name {
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f5f5f7;
        }

        .service-name .icon {
          font-size: 18px;
        }

        .service-desc {
          color: #a1a1a6;
          font-size: 13px;
          line-height: 1.4;
        }

        .service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }

        .tag {
          background: #424245;
          color: #d2d2d7;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .layer-1 .layer-number { background: #f5f5f7; }
        .layer-2 .layer-number { background: #e8e8ed; }
        .layer-3 .layer-number { background: #d2d2d7; }
        .layer-4 .layer-number { background: #a1a1a6; }
        .layer-5 .layer-number { background: #86868b; }

        .connector {
          display: flex;
          justify-content: center;
          padding: 8px 0;
        }

        .connector svg {
          width: 24px;
          height: 24px;
          fill: #424245;
        }

        .infrastructure-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .db-service {
          background: linear-gradient(135deg, #2d2d2d 0%, #1d1d1f 100%);
        }

        .agents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
        }

        .agent-service {
          text-align: center;
          padding: 20px 16px;
        }

        .agent-service .service-name {
          justify-content: center;
        }

        .legend {
          margin-top: 40px;
          padding: 20px;
          background: #1d1d1f;
          border-radius: 12px;
          border: 1px solid #424245;
        }

        .legend h3 {
          font-size: 14px;
          color: #86868b;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .legend-items {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #a1a1a6;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .ecosystem-container h1 {
            font-size: 24px;
          }

          .services {
            flex-direction: column;
          }

          .service {
            min-width: 100%;
          }

          .layer-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .layer-subtitle {
            margin-left: 0;
          }
        }
      `}</style>

      <div className="ecosystem-container">
        <h1>Bizzer Ecosystem Architecture</h1>

        <div className="ecosystem">
          {/* Layer 1: Advisory */}
          <div className="layer layer-1">
            <div className="layer-header">
              <div className="layer-number">1</div>
              <div className="layer-title">Consultoría Estratégica</div>
              <div className="layer-subtitle">High-touch advisory services</div>
            </div>
            <div className="services">
              <div className="service">
                <div className="service-name"><span className="icon">🎯</span> bizzer-advisory</div>
                <div className="service-desc">Consultoría de stack tecnológico para cumplir objetivos comerciales con compliance</div>
                <div className="service-tags">
                  <span className="tag">Stack Design</span>
                  <span className="tag">Architecture</span>
                  <span className="tag">Strategy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="connector">
            <svg viewBox="0 0 24 24"><path d="M12 4v16m0 0l-4-4m4 4l4-4"/></svg>
          </div>

          {/* Layer 2: Discovery */}
          <div className="layer layer-2">
            <div className="layer-header">
              <div className="layer-number">2</div>
              <div className="layer-title">Discovery & Qualification</div>
              <div className="layer-subtitle">Lead capture & qualification</div>
            </div>
            <div className="services">
              <div className="service">
                <div className="service-name"><span className="icon">🔍</span> bizzer-freetrial</div>
                <div className="service-desc">Diagnóstico interactivo con wizard de 6 pasos, quick wins y lead scoring</div>
                <div className="service-tags">
                  <span className="tag">Wizard</span>
                  <span className="tag">Lead Capture</span>
                  <span className="tag">Diagnosis</span>
                </div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">🏪</span> bizzer-showcase</div>
                <div className="service-desc">Browse de soluciones por perfil: consultoras de assurance/compliance y empresas directas</div>
                <div className="service-tags">
                  <span className="tag">Catalog</span>
                  <span className="tag">For Consultants</span>
                  <span className="tag">For Enterprise</span>
                </div>
              </div>
            </div>
          </div>

          <div className="connector">
            <svg viewBox="0 0 24 24"><path d="M12 4v16m0 0l-4-4m4 4l4-4"/></svg>
          </div>

          {/* Layer 3: Products */}
          <div className="layer layer-3">
            <div className="layer-header">
              <div className="layer-number">3</div>
              <div className="layer-title">Productos & Soluciones</div>
              <div className="layer-subtitle">Modular & connectable apps</div>
            </div>
            <div className="services">
              <div className="service">
                <div className="service-name"><span className="icon">🤝</span> deal-teaser</div>
                <div className="service-desc">Acuerdos de intención, NDAs, preparación de ofertas para licitaciones</div>
                <div className="service-tags">
                  <span className="tag">NDAs</span>
                  <span className="tag">Offers</span>
                  <span className="tag">Tenders</span>
                </div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">🔐</span> smart-dataroom</div>
                <div className="service-desc">Data sharing seguro, auditorías, firma digital, evidencias de conformidad</div>
                <div className="service-tags">
                  <span className="tag">Audits</span>
                  <span className="tag">E-Sign</span>
                  <span className="tag">Permissions</span>
                </div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">📋</span> dd-prep</div>
                <div className="service-desc">Preparación para due diligence, organización de docs, corrección de ratios</div>
                <div className="service-tags">
                  <span className="tag">Due Diligence</span>
                  <span className="tag">Checklists</span>
                  <span className="tag">Readiness</span>
                </div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">🔎</span> gap-analyzer</div>
                <div className="service-desc">Análisis de gaps en docs y policies por jurisdicción y framework regulatorio</div>
                <div className="service-tags">
                  <span className="tag">Gap Analysis</span>
                  <span className="tag">Jurisdictions</span>
                  <span className="tag">Roadmap</span>
                </div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">👁️</span> deal-visor</div>
                <div className="service-desc">Monitoreo de contratos en ejecución, alertas, KPIs, obligaciones</div>
                <div className="service-tags">
                  <span className="tag">Monitoring</span>
                  <span className="tag">Alerts</span>
                  <span className="tag">KPIs</span>
                </div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">🎓</span> bizzer-academy</div>
                <div className="service-desc">Training y certificación: ESG, GDPR, cybersecurity, governance, AI</div>
                <div className="service-tags">
                  <span className="tag">Courses</span>
                  <span className="tag">Certificates</span>
                  <span className="tag">Compliance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="connector">
            <svg viewBox="0 0 24 24"><path d="M12 4v16m0 0l-4-4m4 4l4-4"/></svg>
          </div>

          {/* Layer 4: Agents */}
          <div className="layer layer-4">
            <div className="layer-header">
              <div className="layer-number">4</div>
              <div className="layer-title">Inteligencia (Agentes)</div>
              <div className="layer-subtitle">Context-aware AI assistants</div>
            </div>
            <div className="services" style={{ marginBottom: '16px' }}>
              <div className="service" style={{ flex: 2, background: 'linear-gradient(135deg, #3d3d3d 0%, #2d2d2d 100%)' }}>
                <div className="service-name"><span className="icon">🧠</span> agents-orchestrator</div>
                <div className="service-desc">Router inteligente que decide qué agente usa según: usuario, página actual, intent del mensaje, historial</div>
                <div className="service-tags">
                  <span className="tag">Context Builder</span>
                  <span className="tag">Intent Detection</span>
                  <span className="tag">Agent Router</span>
                </div>
              </div>
            </div>
            <div className="agents-grid">
              <div className="service agent-service">
                <div className="service-name"><span className="icon">💼</span> sales</div>
                <div className="service-desc">Calificación y venta</div>
              </div>
              <div className="service agent-service">
                <div className="service-name"><span className="icon">🛟</span> support</div>
                <div className="service-desc">FAQ y onboarding</div>
              </div>
              <div className="service agent-service">
                <div className="service-name"><span className="icon">⚖️</span> legal</div>
                <div className="service-desc">Compliance y regulatorio</div>
              </div>
              <div className="service agent-service">
                <div className="service-name"><span className="icon">📚</span> academy</div>
                <div className="service-desc">Training y evaluación</div>
              </div>
            </div>
            <div className="services" style={{ marginTop: '16px' }}>
              <div className="service db-service">
                <div className="service-name"><span className="icon">🗄️</span> RAG System</div>
                <div className="service-desc">ChromaDB + Knowledge Bases por dominio</div>
              </div>
              <div className="service db-service">
                <div className="service-name"><span className="icon">🔀</span> LLM Switch</div>
                <div className="service-desc">Gemma 2B (privacidad) / Claude API / OpenAI API</div>
              </div>
            </div>
          </div>

          <div className="connector">
            <svg viewBox="0 0 24 24"><path d="M12 4v16m0 0l-4-4m4 4l4-4"/></svg>
          </div>

          {/* Layer 5: Core */}
          <div className="layer layer-5">
            <div className="layer-header">
              <div className="layer-number">5</div>
              <div className="layer-title">Core Infrastructure</div>
              <div className="layer-subtitle">Shared services & data stores</div>
            </div>
            <div className="infrastructure-grid">
              <div className="service">
                <div className="service-name"><span className="icon">🔑</span> auth-service</div>
                <div className="service-desc">JWT + OAuth + SSO<br/>Cookie en .bizzer.io</div>
                <div className="service-tags">
                  <span className="tag">JWT_SECRET</span>
                </div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">👤</span> user-service</div>
                <div className="service-desc">Users, Organizations, Subscriptions, Permissions</div>
              </div>
              <div className="service">
                <div className="service-name"><span className="icon">💳</span> billing-service</div>
                <div className="service-desc">Stripe integration, Plans, Webhooks</div>
              </div>
              <div className="service db-service">
                <div className="service-name"><span className="icon">🐘</span> PostgreSQL</div>
                <div className="service-desc">Main database<br/>Schema per service</div>
              </div>
              <div className="service db-service">
                <div className="service-name"><span className="icon">⚡</span> Redis</div>
                <div className="service-desc">Sessions, Cache<br/>Cross-service sync</div>
              </div>
              <div className="service db-service">
                <div className="service-name"><span className="icon">📁</span> MinIO</div>
                <div className="service-desc">File storage<br/>S3-compatible</div>
              </div>
            </div>
          </div>

          {/* Networking bar */}
          <div className="layer" style={{ background: 'linear-gradient(90deg, #1d1d1f 0%, #2d2d2d 50%, #1d1d1f 100%)', textAlign: 'center', padding: '16px' }}>
            <div className="service-name" style={{ justifyContent: 'center', marginBottom: '4px' }}>
              <span className="icon">🌐</span> Traefik + bizzer_network
            </div>
            <div className="service-desc">Reverse proxy routing a *.bizzer.io | Todos los servicios en la misma Docker network</div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <h3>Cómo funciona</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#f5f5f7' }}></div>
              <span><strong>JWT_SECRET compartido</strong> = SSO automático en todos los subdomains</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#424245' }}></div>
              <span><strong>bizzer_network</strong> = Todos los containers se comunican</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#86868b' }}></div>
              <span><strong>Redis sessions</strong> = Estado sincronizado entre servicios</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#a1a1a6' }}></div>
              <span><strong>Cada producto</strong> tiene chat conectado al orchestrator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
