import html2canvas from 'html2canvas'

export const useScreenshot = () => {
  const captureElement = async (elementId, metadata = {}) => {
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        console.error('Element not found:', elementId)
        return null
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      })
      
      const imageData = canvas.toDataURL('image/png')
      
      // Create screenshot object with metadata
      const screenshot = {
        id: Date.now(),
        image: imageData,
        timestamp: new Date().toISOString(),
        ...metadata
      }

      // Store in localStorage
      const screenshots = JSON.parse(localStorage.getItem('screenshots')) || []
      screenshots.push(screenshot)
      localStorage.setItem('screenshots', JSON.stringify(screenshots))

      return screenshot
    } catch (error) {
      console.error('Error capturing screenshot:', error)
      return null
    }
  }

  const getScreenshots = () => {
    return JSON.parse(localStorage.getItem('screenshots')) || []
  }

  const deleteScreenshot = (id) => {
    const screenshots = JSON.parse(localStorage.getItem('screenshots')) || []
    const filtered = screenshots.filter(s => s.id !== id)
    localStorage.setItem('screenshots', JSON.stringify(filtered))
  }

  const downloadScreenshot = (imageData, filename = 'achievement.png') => {
    const link = document.createElement('a')
    link.download = filename
    link.href = imageData
    link.click()
  }

  return {
    captureElement,
    getScreenshots,
    deleteScreenshot,
    downloadScreenshot
  }
}
