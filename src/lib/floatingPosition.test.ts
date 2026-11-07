import { placeFloating, type FloatingOptions } from './floatingPosition'

const base: FloatingOptions = {
  anchor: { top: 400, left: 400, width: 40, height: 40 },
  floating: { width: 100, height: 30 },
  side: 'top',
  align: 'center',
  offset: 4,
  viewport: { width: 1000, height: 800 },
  margin: 8,
}

describe('placeFloating', () => {
  it('places it above the anchor, centred, an offset away', () => {
    expect(placeFloating(base)).toEqual({ top: 366, left: 370, side: 'top' })
  })

  it('places it on each side', () => {
    expect(placeFloating({ ...base, side: 'bottom' })).toEqual({ top: 444, left: 370, side: 'bottom' })
    expect(placeFloating({ ...base, side: 'right' })).toEqual({ top: 405, left: 444, side: 'right' })
    expect(placeFloating({ ...base, side: 'left' })).toEqual({ top: 405, left: 296, side: 'left' })
  })

  it('aligns to the start or end of the anchor', () => {
    expect(placeFloating({ ...base, align: 'start' }).left).toBe(400)
    expect(placeFloating({ ...base, align: 'end' }).left).toBe(340)
    expect(placeFloating({ ...base, side: 'right', align: 'start' }).top).toBe(400)
    expect(placeFloating({ ...base, side: 'right', align: 'end' }).top).toBe(410)
  })

  it('flips to the opposite side when the preferred side has no room', () => {
    const nearTop = { ...base, anchor: { ...base.anchor, top: 10 } }
    expect(placeFloating(nearTop)).toMatchObject({ top: 54, side: 'bottom' })
    const nearRight = { ...base, side: 'right' as const, anchor: { ...base.anchor, left: 940 } }
    expect(placeFloating(nearRight)).toMatchObject({ left: 836, side: 'left' })
  })

  it("doesn't flip when the opposite side has even less room", () => {
    const tall = { ...base, viewport: { width: 1000, height: 60 }, anchor: { ...base.anchor, top: 12 } }
    expect(placeFloating(tall).side).toBe('top')
  })

  it('shifts along the edge to stay inside the viewport', () => {
    const nearLeft = { ...base, anchor: { ...base.anchor, left: 0 } }
    expect(placeFloating(nearLeft).left).toBe(8)
    const nearRight = { ...base, anchor: { ...base.anchor, left: 980 } }
    expect(placeFloating(nearRight).left).toBe(892)
  })
})
