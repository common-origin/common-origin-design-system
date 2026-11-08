import styled from 'styled-components'

// The Common Origin logo in the colour that reads on its background in either theme (#360).
// `default` sits on the page and matches the text colour; `inverse` sits on an inverse or emphasis
// fill, such as the footer, and matches text.inverse. Both images render, and the theme on <html>
// shows one, so the right logo is there from the first paint. Docs site only.
const DARK_LOGO = '/assets/logo/co-logo.svg'
const LIGHT_LOGO = '/assets/logo/co-logo-white.svg'

const Img = styled.img<{ $showIn: 'light' | 'dark' }>`
  height: auto;
  width: auto;

  html[data-co-theme='${({ $showIn }) => ($showIn === 'light' ? 'dark' : 'light')}'] & {
    display: none;
  }
`

export function ThemedLogo({ tone = 'default', alt, className }: { tone?: 'default' | 'inverse'; alt: string; className?: string }) {
  const [inLight, inDark] = tone === 'default' ? [DARK_LOGO, LIGHT_LOGO] : [LIGHT_LOGO, DARK_LOGO]
  return (
    <>
      <Img src={inLight} alt={alt} $showIn="light" className={className} />
      <Img src={inDark} alt="" aria-hidden="true" $showIn="dark" className={className} />
    </>
  )
}
