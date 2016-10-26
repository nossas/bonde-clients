// import {} from './MobilizationTemplatesActions'

export const initialState = {
  loading: false,
  loaded: true,
  list: [
    {
      body_font: "Proxima Nova",
      color_scheme: "minhaportoalegre-scheme",
      created_at: "2016-01-26T12:11:16.883-02:00",
      custom_domain: "www.minhaportoalegre.org.br",
      facebook_share_description: "Pra cidade que a gente quer e precisa, vem agir nas redes e nas ruas! ",
      facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1477054885_logo_bolinha.jpg",
      facebook_share_title: "#vempraminhaportoalegre",
      goal: "Uma rede de mobilização formada por portoalegrenses que acreditam no poder da participação para construir a cidade que queremos e precisamos.",
      google_analytics_code: null,
      header_font: "Proxima Nova",
      id: 94,
      name: "Home Minha Porto Alegre",
      organization_id: 6,
      slug: "87-minha-porto-alegre",
      twitter_share_text: "Acabei de descobrir Mobilizações na Minha Porto Alegre. #vempraminhaportoalegre ",
      updated_at: "2016-10-21T11:02:29.370-02:00",
      user_id: 22
    }, {
      body_font: null,
      color_scheme: "meurio-scheme",
      created_at: "2016-10-07T16:42:37.946-03:00",
      custom_domain: "www.perfil.meurio.org.br",
      facebook_share_description: "Inscreva-se no Meu Rio e receba as mobilizações urgentes da cidade",
      facebook_share_image: null,
      facebook_share_title: "Quer mudar a cidade?",
      goal: "Cadastrar Meu Rio",
      google_analytics_code: null,
      header_font: null,
      id: 252,
      name: "Cadastro Meu Rio",
      organization_id: 8,
      slug: "207-cadastro-meu-rio",
      twitter_share_text: "Inscreva-se no Meu Rio e receba as mobilizações urgentes da cidade",
      updated_at: "2016-10-20T09:50:38.012-02:00",
      user_id: 5
    }, {
      body_font: null,
      color_scheme: "meurio-scheme",
      created_at: "2016-08-23T18:23:37.325-03:00",
      custom_domain: "www.escolainclusiva.meurio.org.br",
      facebook_share_description: "Exija a convocação imediata dos mediadores de alunos com deficiência",
      facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476929627_20140318_paessurdo.jpg",
      facebook_share_title: "Agora a pressão é por telefone!",
      goal: "Pelo direito das 13mil crianças com deficiência  na rede municipal aos agentes de apoio à educação especial",
      google_analytics_code: null,
      header_font: null,
      id: 219,
      name: "Por escolas inclusivas de verdade no Rio",
      organization_id: 8,
      slug: "175-por-escolas-inclusivas-de-verdade-no-rio",
      twitter_share_text: "Acabei de colaborar com Por escolas inclusivas de verdade no Rio. Participe você também: ",
      updated_at: "2016-10-20T00:13:52.272-02:00",
      user_id: 35
    }, {
      body_font: null,
      color_scheme: "minhagaropaba-scheme",
      created_at: "2016-10-19T21:35:02.040-02:00",
      custom_domain: null,
      facebook_share_description: null,
      facebook_share_image: null,
      facebook_share_title: null,
      goal: "Prefeito, cadê o ponto que estava aqui?",
      google_analytics_code: null,
      header_font: null,
      id: 259,
      name: "Pela reposição do Ponto de Ônibus do Silveirão",
      organization_id: 4,
      slug: "214-pela-reposicao-do-ponto-de-onibus-do-silveirao",
      twitter_share_text: "Acabei de colaborar com Pela reposição do Ponto de Ônibus do Silveirão. Participe você também: ",
      updated_at: "2016-10-19T21:35:11.791-02:00",
      user_id: 19
    }, {
      body_font: null,
      color_scheme: "minhacampinas-scheme",
      created_at: "2016-10-14T17:40:01.736-03:00",
      custom_domain: "www.votacampinas.minhacampinas.org.br",
      facebook_share_description: "Clique e acesse o diagnóstico na íntegra.",
      facebook_share_image: "https://s3.amazonaws.com/hub-central/uploads/1476732105_Vota_Share-1.png",
      facebook_share_title: "Veja os resultados do Vota Campinas!",
      goal: "Divulgar os resultados do Vota Campinas e preparar a próxima edição",
      google_analytics_code: null,
      header_font: null,
      id: 255,
      name: "[MCPS] Vota Campinas",
      organization_id: 2,
      slug: "210-mcps-vota-campinas",
      twitter_share_text: "Acabei baixar o diagnóstico do Vota Campinas da Minha Campinas. Veja vc tbm: ",
      updated_at: "2016-10-19T12:08:49.384-02:00",
      user_id: 24
    }
  ]
}

const MobilizationTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case REQUEST_FETCH_MOBILIZATIONS:
    //   return {
    //     ...state,
    //     loading: true,
    //     loaded: false,
    //   }
    default:
      return state
  }
}

export default MobilizationTemplatesReducer
