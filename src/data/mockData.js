export const POPULAR_SPECIALTIES = [
  "Clínica Geral",
  "Cardiologia",
  "Dermatologia",
  "Ginecologia e Obstetrícia",
  "Ortopedia e Traumatologia",
  "Pediatria",
  "Psiquiatria",
  "Oftalmologia",
  "Endocrinologia e Metabologia",
  "Neurologia",
  "Gastroenterologia",
  "Urologia",
  "Otorrinolaringologia",
  "Pneumologia",
  "Reumatologia",
  "Cirurgia Geral",
  "Nutrição",
  "Psicologia",
  "Fisioterapia",
  "Odontologia"
];

export const POPULAR_CITIES = [
  "São Paulo - SP",
  "Rio de Janeiro - RJ",
  "Belo Horizonte - MG",
  "Curitiba - PR",
  "Porto Alegre - RS",
  "Brasília - DF",
  "Salvador - BA",
  "Fortaleza - CE",
  "Campinas - SP",
  "Recife - PE",
  "Goiânia - GO",
  "Florianópolis - SC",
  "Vitória - ES",
  "Santos - SP",
  "Ribeirão Preto - SP"
];

export const formatPhone = (value) => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export const formatCurrency = (value) => {
  if (!value) return '';
  const clean = value.replace(/\D/g, '');
  if (!clean) return '';
  const number = Number(clean) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};
