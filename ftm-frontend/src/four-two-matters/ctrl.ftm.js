/* eslint-disable */
import EndPointsProvider from "../services/EndPointsProvider";

export default class FourTwoMattersController {

  constructor($scope, $http) {
    this.epProvider = new EndPointsProvider();
    this.httpObj = $http;
    this.scopeObject = $scope;

    // INITIALIZE PROPERTIES ASSIGNED TO THE $scope OBJECT
    this.initializeScopedObjected();

    // FETCH ALL SDK DATA AND ASSIGNS THE RESULT-SET TO THE SCOPE VARIABLE: `allData`
    const allProm = this.httpObj.get(this.epProvider.getEndPointByName('allData'));
    allProm.then(
      (response) => {
        this.scopeObject.allData = response.data;
      },
      (errorData) => {
        this.scopeObject.allData = []
      }
    );

    // FETCH ALL UNIQUE TAGS AND ASSIGNS THE RESULT-SET TO THE SCOPE VARIABLE: `tags`
    const tagsProm = this.httpObj.get(this.epProvider.getEndPointByName('allTags'));
    tagsProm.then(
      (response) => {
        this.scopeObject.tags = response.data;
      },
      (errorData) => {
        this.scopeObject.tags = []
      }
    );
  }

  /**
   * INITIALIZES PROPERTIES + METHODS (OBJECTS) ASSIGNED
   * TO THE `$scope` OBJECT...
   */
  initializeScopedObjected() {
    this.scopeObject.pageTitle = `42 MATTERS`;
    this.scopeObject.subTitle = `Poiz' Solution to «42 Matters» FullStack Developer Assignment using AngularJS 1.6, Pug, Stylus, WebPack, ES6 & PHP 7`;
    this.scopeObject.objModel = {
      tag: 'all',
      text: '',
      sub: ''
    };

    // EXPOSES BOUND EVENT-HANDLERS USING ES 6 FAT-ARROW FUNCTION:
    this.scopeObject.filterDataByTag = () => {
      this.filterDataByTag()
    };
    this.scopeObject.getHighlightedTitle = (title) => {
      return this.getHighlightedTitle(title)
    };
    this.scopeObject.filterDataByTag2 = (tag, event) => {
      this.filterDataByTag2(tag, event)
    };
    this.scopeObject.filterDataByInputTextTag = () => {
      this.filterDataByInputTextTag()
    };

    // DEBUG A FEW ENDPOINTS: PLEASE, REMOVE THIS FROM THE PRODUCTION BUNDLE.
    this.debugEndpointProvider();
  }

  /**
   * EVENT HANDLER FOR `change` (ng-change) EVENT FOR THE SEARCH TEXT FIELD.
   *
   * THIS METHOD ASYNCHRONOUSLY FETCHES THE FILTERED DATA FROM THE
   * BACKEND API USING ANGULAR'S BUILT-IN `$http` SERVICE...
   */
  filterDataByInputTextTag() {
    const activeTag = this.scopeObject.objModel.tag;
    const searchTerm = this.scopeObject.objModel.text;
    const endPoint = this.epProvider.getEndPointByName('searchTitle');

    if (activeTag === 'filtered') {
      const searchProm = this.httpObj.get(`${endPoint}?search=${searchTerm}`);
      searchProm.then(
        (response) => {
          this.scopeObject.allData = response.data;
        },
        (errorData) => {
          this.scopeObject.allData = []
        }
      );
    }
  }

  /**
   * EVENT HANDLER FOR `change` (ng-change) EVENT FOR THE RADIO BUTTONS.
   * FILTERS THE SDK DATA BY «tag» RATHER THAN BY «title».
   *
   * THIS METHOD ALSO ASYNCHRONOUSLY FETCHES THE FILTERED DATA FROM THE
   * BACKEND API USING ANGULAR'S BUILT-IN `$http` SERVICE...
   * @returns {null}
   */
  filterDataByTag() {
    const activeTag = this.scopeObject.objModel.tag;
    let endpoint = this.epProvider.buildEndPointWithQueryStringFromObject({
      filter: activeTag,
    }, '/fetch-all');
    endpoint = activeTag === 'all' ? this.epProvider.getEndPointByName('allData') : endpoint;

    if (activeTag === 'filtered') {
      return null;
    }

    const tagsProm = this.httpObj.get(endpoint);
    tagsProm.then(
      (response) => {
        this.scopeObject.allData = response.data;
      },
      (errorData) => {
        this.scopeObject.allData = []
      }
    );
  }

  /**
   * MANIPULATES THE TITLE OF THE SEARCH RESULT...
   * WRAPS MATCHED CHARACTERS WITHIN A SPAN TAG WITH CLASS: `ftm-emphasis`
   * AND RETURNS THE CONCOCTED STRING... 
   * @returns {string}
   */
  getHighlightedTitle(title) {
    const searchTerm = this.scopeObject.objModel.text;
    const rxSearchTerm = new RegExp(searchTerm, 'gi');
    if (searchTerm.trim() && rxSearchTerm.test(title)) {
      return title.replace(rxSearchTerm, (match) => {
        return `<span class='ftm-emphasis'>${match}</span>`;
      });
    }
    return title
  }

  /**
   * EVENT HANDLER FOR `click` (ng-click) EVENT FOR THE BADGED TAGES ON MAIN DISPLAY.
   * FILTERS THE SDK DATA BY «tag» ENTERED IN THE SEARCH FIELD RATHER THAN BY «title».
   *
   * THIS METHOD ALSO ASYNCHRONOUSLY FETCHES THE FILTERED DATA FROM THE
   * BACKEND API USING ANGULAR'S BUILT-IN `$http` SERVICE...
   * @returns {null}
   */
  filterDataByTag2(sTag, event) {
    event.preventDefault();
    const endpoint = this.epProvider.buildEndPointWithQueryStringFromObject({
      filter: sTag,
    }, '/fetch-all');

    if (!sTag) {
      return null;
    }
    this.scopeObject.objModel.tag = sTag;

    const tagsProm = this.httpObj.get(endpoint);
    tagsProm.then(
      (response) => {
        this.scopeObject.allData = response.data;
      },
      (errorData) => {
        this.scopeObject.allData = []
      }
    );
  }

  /**
   * FOR DEBUGGING PURPOSES ONLY.
   * USE THIS TO TEST A FEW METHODS WITHIN THE `EndPointsProvider` CLASS.
   */
  debugEndpointProvider() {
    console.log(this.epProvider.getEndPointByName('allData'));
    console.log(this.epProvider.buildEndPointWithQueryStringFromObject({
      limit: 10,
      sort: 'title',
      page: 1,
      filter: 'marketing-automation,ad-network',
      direction: 1,
    }, '/fetch-all'));
  }
}