const reactions = {
  
  ping: { type: 'text', content: 'Bang!' },
  hello: { type: 'text', content: 'Whatcha doing there goofball?' },
  
  'nlp-error': {
    type: 'text',
    content: 'Oops'
  },
  
}

const getReactions = () => reactions

export const getStaticReaction = reaction => getReactions()[reaction]

export default getReactions