// interfaces.ts
export interface Concorrencia {
    id_concorrencia: number;
    etapa: number | null;
    ds_etapa: string | null;
    tp_cota: string | null;
    tipo_mod_concorrencia: string | null;
    mod_concorrencia: string | null;
    qt_vagas_concorrencia: number | null;
    nota_candidato: number | null;
    nota_corte: number | null;
    codigo_curso: number | null;
    codigo_campus: number | null;
    nome_curso: string | null;
    grau: string | null;
    turno: string | null;
    ds_periodicidade: string | null;
}

export interface Campus {
    codigo_campus: number;
    nome_campus: string;
    uf_campus: string;
    municipio_campus: string;
    codigo_ies: number;
}

export interface Universidade {
    codigo_ies: number;
    nome_ies: string;
    sigla_ies: string;
    uf_ies: string;
}
