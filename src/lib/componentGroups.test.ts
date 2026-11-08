import * as fs from 'fs'
import * as path from 'path'
import { staticComponentsData } from './componentsData'
import { COMPONENT_GROUPS } from './componentGroups'

// The docs site groups components by purpose and records the atomic tier as metadata (decision 0057).

const COMPONENTS_DIR = path.join(__dirname, '..', 'components')
const TIER_BY_FOLDER: Record<string, string> = {
  atoms: 'Atom',
  molecules: 'Molecule',
  organisms: 'Organism',
  layout: 'Layout',
}

// The tier each docs file should have, read from the folder it sits in
const docsFiles = Object.keys(TIER_BY_FOLDER).flatMap((folder) => {
  const tierDir = path.join(COMPONENTS_DIR, folder)
  return fs
    .readdirSync(tierDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) =>
      fs
        .readdirSync(path.join(tierDir, entry.name))
        .filter((file) => file.endsWith('.docs.tsx'))
        .map((file) => {
          const source = fs.readFileSync(path.join(tierDir, entry.name, file), 'utf8')
          const id = source.match(/^ {2}id: '([^']+)'/m)?.[1]
          return { file: `${folder}/${entry.name}/${file}`, id, tier: TIER_BY_FOLDER[folder] }
        })
    )
})

const byId = new Map(staticComponentsData.map((page) => [page.id, page]))

describe('docs component groups', () => {
  it('lists every group once', () => {
    expect(new Set(COMPONENT_GROUPS).size).toBe(COMPONENT_GROUPS.length)
  })

  it('puts every page in a known group', () => {
    const unknown = staticComponentsData
      .filter((page) => !COMPONENT_GROUPS.includes(page.category))
      .map((page) => `${page.name}: ${page.category}`)
    expect(unknown).toEqual([])
  })

  it('registers every docs file in src/components', () => {
    expect(docsFiles.length).toBeGreaterThan(50)
    const unregistered = docsFiles.filter(({ id }) => !id || !byId.has(id)).map(({ file }) => file)
    expect(unregistered).toEqual([])
  })

  it("gives every page the tier of the folder it's in", () => {
    const wrong = docsFiles
      .filter(({ id, tier }) => id && byId.get(id)?.tier !== tier)
      .map(({ file, id, tier }) => `${file}: ${byId.get(id as string)?.tier}, expected ${tier}`)
    expect(wrong).toEqual([])
  })

  it("nests a child page only under an existing parent in the parent's group", () => {
    const wrong = staticComponentsData
      .filter((page) => page.parentId)
      .filter((page) => byId.get(page.parentId as string)?.category !== page.category)
      .map((page) => `${page.name}: parent "${page.parentId}"`)
    expect(wrong).toEqual([])
  })
})
