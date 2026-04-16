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

  // Sync URL with page state
  useEffect(() => {
    const getPageFromPath = (): Page => {
      const path = window.location.pathname;
      if (path === '/' || path === '/home') return 'home';
      if (path === '/about') return 'about';
      if (path === '/services') return 'services';
      if (path === '/contact') return 'contact';
      if (path === '/projects') return 'projects';
      return 'home';
    };

    // Update state based on current URL
    const pageFromUrl = getPageFromPath();
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, []);

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
      
      // Update URL when page changes
      const newPath = page === 'home' ? '/' : `/${page}`;
      window.history.pushState(null, '', newPath);
    }
  }

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pageFromUrl = (() => {
        const path = window.location.pathname;
        if (path === '/' || path === '/home') return 'home';
        if (path === '/about') return 'about';
        if (path === '/services') return 'services';
        if (path === '/contact') return 'contact';
        if (path === '/projects') return 'projects';
        return 'home';
      })();
      setCurrentPage(pageFromUrl);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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