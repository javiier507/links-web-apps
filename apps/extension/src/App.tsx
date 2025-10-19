import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get current tab URL
    const getCurrentTabUrl = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // For browser extensions
        if (chrome && chrome.tabs) {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
          if (tab && tab.url) {
            setCurrentUrl(tab.url)
            console.log('Current URL:', tab.url)
          } else {
            setError('Could not get tab URL')
          }
        } else {
          // Fallback for local development
          setCurrentUrl(window.location.href)
          console.log('Current URL (dev):', window.location.href)
        }
      } catch (err) {
        console.error('Error getting URL:', err)
        setError('Error getting URL')
      } finally {
        setIsLoading(false)
      }
    }

    getCurrentTabUrl()
  }, [])

  const handleGetUrl = () => {
    if (currentUrl) {
      console.log('URL added:', currentUrl)
      alert(`URL added: ${currentUrl}`)
    }
  }

  const getDisplayContent = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (error) {
      return error
    }
    if (currentUrl) {
      return currentUrl
    }
    return 'No URL available'
  }

  return (
    <div className="card">
      <p className="url-label">Wlinks</p>
      <div className="url-display">
        {getDisplayContent()}
      </div>
      <button
        onClick={handleGetUrl}
        className="get-url-btn"
        disabled={!currentUrl || isLoading}
      >
        Save
      </button>
    </div>
  )
}

export default App
