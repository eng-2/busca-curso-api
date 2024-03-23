-- Criação da tabela Universidade
CREATE TABLE Universidade (
    codigo_ies INTEGER PRIMARY KEY,
    nome_ies VARCHAR(255),
    sigla_ies VARCHAR(255),
    uf_ies VARCHAR(2)
);

-- Carregamento de dados do arquivo CSV para a tabela Universidade
COPY Universidade (codigo_ies, nome_ies, sigla_ies, uf_ies)
FROM 'D:\Estudo\UFS\2023.2\CARGA-SISU-CSV\chamada_regular_sisu_2022_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER '|', ENCODING 'WIN1252');


-- Carregamento de dados do arquivo CSV para a tabela Campus
COPY Campus (codigo_campus, codigo_ies, nome_campus, uf_campus, municipio_campus)
FROM 'D:\Estudo\UFS\2023.2\CARGA-SISU-CSV\chamada_regular_sisu_2022_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER '|', ENCODING 'WIN1252');

-- Criação da tabela Curso
CREATE TABLE Curso (
    codigo_curso INTEGER PRIMARY KEY,
    codigo_campus INTEGER REFERENCES Campus(codigo_campus),
    nome_curso VARCHAR(255),
    grau VARCHAR(255),
    turno VARCHAR(255),
    ds_periodicidade VARCHAR(255)
);

-- Carregamento de dados do arquivo CSV para a tabela Curso
COPY Curso (codigo_curso, codigo_campus, nome_curso, grau, turno, ds_periodicidade)
FROM 'D:\Estudo\UFS\2023.2\CARGA-SISU-CSV\chamada_regular_sisu_2022_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER '|', ENCODING 'WIN1252');


CREATE TEMPORARY TABLE sisudados_temp (   
 
    etapa             INTEGER,
    ds_etapa          VARCHAR(255),
    ds_periodicidade  VARCHAR(255),
    tp_cota           VARCHAR(255),
    tipo_mod_concorrencia VARCHAR(255),
    mod_concorrencia  TEXT,
    qt_vagas_concorrencia INTEGER,
    percentual_bonus  VARCHAR(255),  -- Alterado para VARCHAR
    peso_l            VARCHAR(10),
    peso_ch           VARCHAR(10),
    peso_cn           VARCHAR(10),
    peso_m            VARCHAR(10),
    peso_r            VARCHAR(10),
    nota_minima_l     VARCHAR(255),  -- Alterado para VARCHAR
    nota_minima_ch    VARCHAR(255),  -- Alterado para VARCHAR
    nota_minima_cn    VARCHAR(255),  -- Alterado para VARCHAR
    nota_minima_m     VARCHAR(255),  -- Alterado para VARCHAR
    nota_minima_r     VARCHAR(255),  -- Alterado para VARCHAR
    media_minima      VARCHAR(255),  -- Alterado para VARCHAR 
    codigo_curso      INTEGER, 

);

COPY sisudados_temp FROM 'D:\Estudo\UFS\2023.2\CARGA-SISU-CSV\chamada_regular_sisu_2022_1.csv' WITH (FORMAT CSV, HEADER, DELIMITER '|', ENCODING 'WIN1252');




-- Criação da tabela Concorrencia
CREATE TABLE Concorrencia (
    id_concorrencia SERIAL PRIMARY KEY,
    etapa INTEGER,
    ds_etapa VARCHAR(255),
    tp_cota VARCHAR(255),
    tipo_mod_concorrencia VARCHAR(255),
    mod_concorrencia TEXT,
    qt_vagas_concorrencia INTEGER,
    percentual_bonus NUMERIC,
    peso_l DECIMAL,
    peso_ch DECIMAL,
    peso_cn DECIMAL,
    peso_m DECIMAL,
    peso_r DECIMAL,
    nota_minima_l DECIMAL,
    nota_minima_ch DECIMAL,
    nota_minima_cn DECIMAL,
    nota_minima_m DECIMAL,
    nota_minima_r DECIMAL,
    media_minima DECIMAL,
    codigo_curso INTEGER REFERENCES Curso(codigo_curso)
);

INSERT INTO sisudados ( 
    etapa,
    ds_etapa,
    tp_cota,
    tipo_mod_concorrencia,
    mod_concorrencia,
    qt_vagas_concorrencia,
    percentual_bonus,
    peso_l,
    peso_ch,
    peso_cn,
    peso_m,
    peso_r,
    nota_minima_l,
    nota_minima_ch,
    nota_minima_cn,
    nota_minima_m,
    nota_minima_r,
    media_minima,
    codigo_curso,
)
FROM sisudados_temp;
DROP TABLE IF EXISTS sisudados_temp;

