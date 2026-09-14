CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- As etapas espelham exatamente o cronograma do site (HowItWorks.jsx):
-- 1 Diagnóstico, 2 Proposta e contrato, 3 Projeto técnico,
-- 4 Solicitação dos equipamentos, 5 Homologação, 6 Entrega,
-- 7 Instalação, 8 Vistoria e ativação, 9 Pós-venda.
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  cidade TEXT NOT NULL,
  uf TEXT NOT NULL,
  tipo_projeto TEXT NOT NULL,
  potencia_kwp NUMERIC,
  current_step SMALLINT NOT NULL DEFAULT 1 CHECK (current_step BETWEEN 1 AND 9),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects (client_id);
