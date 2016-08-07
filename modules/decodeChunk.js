import { pickBy } from 'ramda'
import parse from 'xml-parser'

export default (chunk) => {
  const parsed = parse(`<root>${chunk.toString().replace(/\0/g, '')}</root>`)
  return parsed.root.children.map(node => {
    const [ all, type, value ] = node.name.match(/([a-zA-Z]*)(.*)/)
    return pickBy(x => x, { type, value, ...node.attributes })
  })
}
