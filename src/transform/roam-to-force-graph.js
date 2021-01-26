const travel = (currentNode, links, nodes) => {
  if (!currentNode.children) {
    return { links, nodes: [...nodes, currentNode.uid && { id: currentNode.uid }] }
  }
  return travel(
    currentNode.children,
    [
      ...links,
      ...currentNode.children.map((child) => ({ source: currentNode.uid, target: child.uid })),
    ],
    [
      ...nodes,
      currentNode.uid && { id: currentNode.uid },
      ...currentNode.children.map((child) => ({ id: child.uid })),
    ],
  )
}

const transform = (x) => {
  if (x.length === 0) return []

  return x.reduce((transformedGraph, currentNode) => {
    const transformed = travel(currentNode, [], [])
    return {
      links: [...transformedGraph.links, ...transformed.links],
      nodes: [...transformedGraph.nodes, ...transformed.nodes],
    }
  }, { links: [], nodes: [] })
}

export default {
  transform,
}
