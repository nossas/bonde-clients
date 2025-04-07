const labels: Record<string, { title: string; count: string }> = {
  pressure: { title: "Pressão", count: "pressões" },
  form: { title: "Formulário", count: "envios" },
  donation: { title: "Doação", count: "doações" },
  phone: { title: "Telefone", count: "pressões" },
  "pressure-phone": { title: "Telefone", count: "pressões" },
  plip: { title: "PLIP", count: "formulários" },
  busao0800: { title: "Busão 0800", count: "" }
};

type Label = {
  title: string
  count: string
}

export default {
  get: (kind: string): Label => labels[kind]
}