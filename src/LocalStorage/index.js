export default {
  /**
   * Get all hotspots
   * @returns {Object[]} all hotspots - array of matched data
   */
  getAllHotspots: () => {
    const valueHotspots = window.localStorage.getItem('hotspots')
    let hotspots = []
    try {
      hotspots = JSON.parse(valueHotspots);
    } catch (error) {
      console.error('Error parsing hotspots', error)
    }
    return hotspots || []
  },
  /**
   * Save current obj hotspots
   * @param {Object[]} data hotspots - array of hotspots to be saved
   */
  saveHotspot: data => {
    window.localStorage.setItem('hotspots', JSON.stringify(data || ''))
  }
};
