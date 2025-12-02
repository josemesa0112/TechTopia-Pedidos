import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Organisms/Layout'
import { usePathname } from 'next/navigation'

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname()

  // Excluir el Layout solo en la página de login
  if (pathname === '/login') {
    return <Component {...pageProps} />
  }

  // Todas las demás páginas se renderizan con Layout (que ya incluye AppSidebar)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

