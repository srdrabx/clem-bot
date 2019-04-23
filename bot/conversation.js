import NodeCache from 'node-cache'

const ttl = 300

const conversations = new NodeCache({ stdTTL: ttl })

export const rememberConversation = function(msg) {
  const current = conversations.get(msg.author.id) || {}
  if (Array.isArray(current.messages)) current.messages.push(msg.content)
  else current.messages = [msg.content]
  return conversations.set(msg.author.id, current, ttl)
}

export const onActiveConversation = msg => conversations.get(msg.author.id)
