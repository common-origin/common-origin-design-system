import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
export default function Home() {
    var router = useRouter();
    useEffect(function () {
        router.replace('/design');
    }, [router]);
    return (<>
      <Head>
        <title>Common Origin Design System</title>
        <meta name="description" content="A comprehensive design system with atomic components and WCAG 2.2 AA accessibility compliance"/>
      </Head>
      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
        <div>
          <h1>Common Origin Design System</h1>
          <p>Redirecting to design system documentation...</p>
        </div>
      </div>
    </>);
}
//# sourceMappingURL=index.jsx.map