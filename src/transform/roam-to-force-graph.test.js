import RoamToForceGraph from './roam-to-force-graph'

describe('transform roam to force graph', () => {
  it('should transform empty to empty', () => {
    const result = RoamToForceGraph.transform([])
    expect(result).toEqual([])
  })

  it('should transform one layer to one layer with empty links', () => {
    const data = [
      { uid: 'a' },
      { uid: 'b' },
    ]
    const expected = {
      nodes: [
        { id: 'a' },
        { id: 'b' },
      ],
      links: [],
    }
    const result = RoamToForceGraph.transform(data)
    expect(result).toEqual(expected)
  })

  it('should transform one children of node to one link', () => {
    const data = [
      { uid: 'a', children: [{ uid: 'c' }] },
      { uid: 'b' },
    ]
    const expected = {
      nodes: [
        { id: 'a' },
        { id: 'b' },
        { id: 'c' },
      ],
      links: [
        { source: 'a', target: 'c' },
      ],
    }
    const result = RoamToForceGraph.transform(data)
    expect(result.nodes).toEqual(expect.arrayContaining(expected.nodes))
    expect(result.links).toEqual(expect.arrayContaining(expected.links))
  })

  it('should transform children of node to links', () => {
    const data = [
      { uid: 'a', children: [{ uid: 'c' }, { uid: 'd' }] },
      { uid: 'b' },
    ]
    const expected = {
      nodes: [
        { id: 'a' },
        { id: 'b' },
        { id: 'c' },
        { id: 'd' },
      ],
      links: [
        { source: 'a', target: 'c' },
        { source: 'a', target: 'd' },
      ],
    }
    const result = RoamToForceGraph.transform(data)
    expect(result.nodes).toEqual(expect.arrayContaining(expected.nodes))
    expect(result.links).toEqual(expect.arrayContaining(expected.links))
  })

  it('should transform children of children of node to link', () => {
    const data = [
      { uid: 'a', children: [{ uid: 'c', children: [{ uid: 'd' }] }] },
      { uid: 'b' },
    ]
    const expected = {
      nodes: [
        { id: 'a' },
        { id: 'b' },
        { id: 'c' },
        { id: 'd' },
      ],
      links: [
        { source: 'a', target: 'c' },
        { source: 'c', target: 'd' },
      ],
    }
    const result = RoamToForceGraph.transform(data)
    expect(result.nodes).toEqual(expect.arrayContaining(expected.nodes))
    expect(result.links).toEqual(expect.arrayContaining(expected.links))
  })
})
