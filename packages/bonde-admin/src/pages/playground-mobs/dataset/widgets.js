import { createEditorContent } from '@/mobilizations/widgets/__plugins__/content/components/editor-slate'

export default [
  { id: 1, kind: 'draft', sm_size: 6, md_size: 6, lg_size: 6, block_id: 1 },
  {
    id: 2,
    block_id: 2,
    kind: 'form',
    sm_size: 12,
    md_size: 12,
    lg_size: 12,
    // Required this props
    settings: {
      fields: []
    }
  },
  { id: 3, kind: 'draft', sm_size: 12, md_size: 12, lg_size: 12, block_id: 3 },
  { 
    id: 6,
    block_id: 6,
    kind: 'pressure',
    sm_size: 6,
    md_size: 6,
    lg_size: 6,
    // Required this props
    settings: {
      main_color: '#f23392',
      title_text: 'Envie um e-mail para quem pode tomar essa decisão',
      button_text: 'Enviar e-mail'
    }
  },
  {
    id: 7,
    kind: 'content',
    sm_size: 6,
    md_size: 6,
    lg_size: 6,
    block_id: 6,
    // Required this props
    settings: {
      content: createEditorContent('Clique aqui para editar...')
    }
  },
  // Donation
  {
    id: 8,
    block_id: 1,
    kind: 'donation',
    sm_size: 6,
    md_size: 6,
    lg_size: 6
  }
]