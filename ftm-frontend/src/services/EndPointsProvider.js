/* eslint-disable */

export default class EndPointsProvider {
  
  constructor() {
    this.baseURL    = 'http://localhost:8000/api/v1';
    this.endPoints  = {
      // ... FOR FETCHING ALL DATA UNFILTERED - WITHOUT CONSTRAINTS
      allData     : `${this.baseURL}/fetch-all`,
  
      // ... FOR FETCHING ALL «UNIQUE» TAGS - DUPLICATE TAKES ARE STRIPPED-OUT
      allTags     : `${this.baseURL}/fetch-tags`,
      
      // ... FOR FETCHING ALL DATA FILTERED BY TITLE MATCHING THE GIVEN SEARCH TERM.
      // REQUIRES QUERY STRING LIKE THIS: `/fetch-by-title?search=ad`
      searchTitle : `${this.baseURL}/fetch-by-title`,
      
      // ... FOR FETCHING ALL DATA FILTERED BY TAGS MATCHING THE GIVEN SEARCH TERM.
      // REQUIRES QUERY STRING LIKE THIS: `/fetch-by-search-term?search=ad`
      searchTerm  : `${this.baseURL}/fetch-by-search-term`,
    };
  }
  
  /**
   * FETCHES A SINGLE REST-ENDPOINT USING THE PRE-DEFINED STRING-KEYS `name`.
   * POSSIBLE KEYS ARE `allData`, `allTags`, `searchTitle` AND `searchTerm`,
   * @see EndPointsProvider.constructor
   * @param name
   * @returns {null|string}
   */
  getEndPointByName(name) {
    if(name in this.endPoints){
      return this.endPoints[name];
    }
    return null;
  }
  
  /**
   * CONSTRUCTS AN ENDPOINT GIVEN A PATH AND AN OBJECT WITH KEY-VALUE PAIRS
   * WHICH WOULD THEN FORM THE BASIS OF THE QUERY-STRING PARAMETERS
   * EXAMPLE:
   * buildEndPointWithQueryStringFromObject({
      limit     : 10,
      sort      : 'title',
      page      : 1,
      filter    : 'marketing-automation,ad-network',
      direction : 1,
    }, '/fetch-all')
    WILL RETURN AN ENDPOINT LIKE SO:
   `http://localhost:8000/api/v1/fetch-all?limit=10&sort=title&page=1&filter=marketing-automation,ad-network&direction=1`
   * @param objParams
   * @param path
   * @returns {string}
   */
  buildEndPointWithQueryStringFromObject(objParams={}, path='/fetch-all') {
    if(Object.keys(objParams).length <= 0 || typeof objParams !== 'object'){
      return this.endPoints.allData;
    }
    let index       = 0;
    let queryString = '';
    for(let key in objParams){
      let value   = objParams[key];
      let prefix  = '?';
      
      if(index !== 0){ prefix = '&'; }
      queryString += `${prefix}${key}=${value}`;
      index++;
    }
    return `${this.baseURL}${path}${queryString}`;
  }
}
