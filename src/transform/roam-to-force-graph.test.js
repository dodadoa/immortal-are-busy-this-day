import RoamToForceGraph from './roam-to-force-graph'

describe('transform roam to force graph', () => {
  it('should transform empty to empty', () => {
    const data = {}
    const result = RoamToForceGraph.transform(data)
    expect(result).toEqual({})
  })
})
