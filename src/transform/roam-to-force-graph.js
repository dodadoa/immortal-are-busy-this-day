import data from '../dataset/roam1.json'

const extractLinks = (links, {
  uid,
  children,
  refs,
  title,
}) => {
  console.log(title, uid, JSON.stringify(refs), JSON.stringify(children))
  // page
  if (title && uid) {
    // page that has contents
    if (children) {
      return [
        ...links,
        ...children
          .filter((child) => child.refs)
          .flatMap((child) => child.refs.map((ref) => ({ source: uid, target: ref.uid }))),
        ...children.flatMap((child) => extractLinks(links, child)),
      ]
    }
    return links
  }

  // blocks
  if (uid) {
    // block that has links and subcontents
    if (refs && children) {
      return [
        ...links,
        ...refs.map((ref) => ({ source: uid, target: ref.uid })),
        ...children.flatMap((child) => extractLinks(links, child)),
      ]
    }

    // block that has links but no subcontents
    if (refs) {
      return [
        ...links,
        ...refs.map((ref) => ({ source: uid, target: ref.uid })),
      ]
    }

    // block that has subcontents but no links
    if (children) {
      return [
        ...links,
        ...children.flatMap((child) => extractLinks(links, child)),
      ]
    }
    return links
  }

  return links
}

const transform = (x) => {
  if (x.length === 0) return []

  const links = x.reduce(extractLinks, [])
  const nodes = x.map((n) => ({ id: n.uid }))
  return {
    links,
    nodes,
  }
}

const a = transform(data)
console.log(JSON.stringify(a))

export default {
  transform,
}
