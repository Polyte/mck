import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Page = 'home' | 'about' | 'services' | 'projects' | 'contact'

interface RouterContextType {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  previousPage?: Page
  navigationHistory: Page[]
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [previousPage, setPreviousPage] = useState<Page | undefined>(undefined)
  const [navigationHistory, setNavigationHistory] = useState<Page[]>(['home'])

  // Enhanced navigation with history tracking
  const handleSetCurrentPage = (page: Page) => {
    if (page !== currentPage) {
      setPreviousPage(currentPage)
      setCurrentPage(page)
      setNavigationHistory(prev => {
        const newHistory = [...prev, page]
        // Keep only last 10 pages in history
        return newHistory.slice(-10)
      })
    }
  }

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <RouterContext.Provider value={{ 
      currentPage, 
      setCurrentPage: handleSetCurrentPage,
      previousPage,
      navigationHistory
    }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}