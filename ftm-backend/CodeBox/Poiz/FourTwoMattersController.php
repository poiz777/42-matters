<?php
	
	namespace CodeBox\Poiz;
	
	// PULL IN THE DUMMY DATA:
	$DS = DIRECTORY_SEPARATOR;
	require __DIR__ . $DS . ".." . $DS . ".." . $DS . "DummyData" . $DS . "sdks.php";
	
	define('DUMMY_DATA', isset($data) ? $data : []);
	
	/**
	 * Class FourTwoMattersController
	 * @package CodeBox\Poiz
	 */
	class FourTwoMattersController {
		const DEFAULT_PAGE      = 1;
		const DEFAULT_LIMIT     = 1000;
		const DEFAULT_SORT_KEY  = 'title';
		const DIRECTION_ASC     = 1;
		const DIRECTION_DESC    = 2;
		
		/**
		 * FETCHES ALL `SDK DATA`.
		 * OPTIONALLY, YOU COULD PASS A QUERY STRING KEY-VALUE PAIRS TO FURTHER FINE-TUNE THE RESULT-SET
		 * ALLOWED QUERY PARAMETERS ARE:
		 * `limit (int)`      => DETERMINES THE NUMBER OF RECORDS RETURNED PER REQUEST. DEFAULT: `1000`
		 * `page (int)`       => TO BE USED WITH `limit`: PAGINATES THE RESULT-SET. DEFAULT: `1`
		 * `sort (string)`    => SETS WHICH FIELD TO SORT BY. POSSIBLE VALUES -- `title`, `id`, `tags`. DEFAULT: `title`
		 * `direction (int)`  => SETS THE SORT ORDER AS IN ASCENDING (1) OR DESCENDING (2). DEFAULT: `1`
		 * HERE IS AN EXAMPLE: `/api/v1/fetch-all?limit=10&page=1&sort=title&direction=2
		 * THE RETURNED RESULT-SET IS STRIPPED OF ALL DUPLICATES & ENTRIES WITH NULL OR EMPTY VALUES.
		 *
		 * @url GET /api/v1/fetch-all
		 */
		public function fetchAllData() {
			$data       = $this->prepareSDKData();
			$sorted     = $data['sorted'];
			$rayFilters = $data['filters'];
			
			/*
			if(stristr($rayFilters['filter'], 'tags') && stristr($rayFilters['filter'], 'title') && stristr($rayFilters['filter'], 'id')){
				// TODO
			}elseif(stristr($rayFilters['filter'], 'tags') && stristr($rayFilters['filter'], 'title') && stristr($rayFilters['filter'], 'id')){
				// TODO
			}elseif(stristr($rayFilters['filter'], 'tags') && stristr($rayFilters['filter'], 'title') && stristr($rayFilters['filter'], 'id')){
				$sorted   = $this->filterDataByTagsTitleAndId($sorted, $rayFilters['filter']);
			}
			*/
			
			if($rayFilters['filter']){
				$sorted   = $this->filterDataByTags($sorted, $rayFilters['filter']);
			}
			
			return array_slice($sorted, ($rayFilters['limit']*($rayFilters['page']-1)), $rayFilters['limit']);
		}
		
		/**
		 * FETCHES ALL `SDK RECORDS` WITH «tags» THAT TOTALLY OR PARTIALLY MATCHES A GIVEN SEARCH TERM.
		 * THE SEARCH TERM IS PASSED AS A QUERY-STRING PARAMETER WITH THE KEY: `search`
		 * A SAMPLE ENDPOINT WOULD LOOK LIKE THIS: `/api/v1/fetch-by-search-term?search=ad`
		 * THE RETURNED RESULT-SET IS STRIPPED OF ALL DUPLICATES & ENTRIES WITH NULL OR EMPTY VALUES.
		 *
		 * @url GET /api/v1/fetch-by-tag
		 */
		public function fetchDataByPartialTag() {
			$searchTerm   = isset($_REQUEST['search']) ? trim($_REQUEST['search']) : null;
			$payload      = $this->prepareSDKData();
			$sorted       = $payload['sorted'];
			$rayFilters   = $payload['filters'];
			$responseData = [];
			
			if(!$searchTerm) { return []; }
			
			foreach($sorted as $iKey=>$rayData){
				$rayTags = $rayData['tags'];
				foreach($rayTags as $tag){
					if(stristr($tag, $searchTerm)){
						if(!in_array($rayData, $responseData)){
							$responseData[] = $rayData;
						}
						break;
					}
				}
			}
			return array_slice($responseData, ($rayFilters['limit']*($rayFilters['page']-1)), $rayFilters['limit']);
		}
		
		/**
		 * FETCHES ALL `SDK RECORDS` WITH «title» THAT TOTALLY OR PARTIALLY MATCHES A GIVEN SEARCH TERM.
		 * THE SEARCH TERM IS PASSED AS A QUERY-STRING PARAMETER WITH THE KEY: `search`
		 * A SAMPLE ENDPOINT WOULD LOOK LIKE THIS: `/api/v1/fetch-by-title?search=Ad`
		 * THE RETURNED RESULT-SET IS STRIPPED OF ALL DUPLICATES & ENTRIES WITH NULL OR EMPTY VALUES.
		 *
		 * @url GET /api/v1/fetch-by-title
		 */
		public function fetchDataByPartialTitle() {
			$payload      = $this->prepareSDKData();
			$sorted       = $payload['sorted'];
			$rayFilters   = $payload['filters'];
			$responseData = [];
			
			if(!$rayFilters['searchTerm'] || empty($rayFilters['searchTerm'] )) {
				return array_slice($sorted, ($rayFilters['limit']*($rayFilters['page']-1)), $rayFilters['limit']);
			}
			
			foreach($sorted as $iKey=>$rayData){
				if(stristr($rayData['title'], $rayFilters['searchTerm'])){
					if(!in_array($rayData, $responseData)){
						$responseData[] = $rayData;
					}
				}
			}
			return array_slice($responseData, ($rayFilters['limit']*($rayFilters['page']-1)), $rayFilters['limit']);
		}
		
		/**
		 * FETCHES ALL UNIQUE TAGS WITHIN ALL `SDK RECORDS`.
		 * ONLY UNIQUE TAGS ARE RETURN - IE: NO DUPLICATES, NO EMPTY VALUES.
		 * THE TAGS ARE AUTOMATICALLY SORTED ALPHABETICALLY BEFORE BEING RETURNED.
		 * SAMPLE ENDPOINT WOULD LOOK LIKE THIS: `/api/v1/fetch-tags`
		 * 
		 * @url GET /api/v1/fetch-tags
		 */
		public function fetchAllTags(){
			$uniqueValuesData   = $this->filterOutNullAndEmptyValuesPlusDuplicates(DUMMY_DATA);
			$allTags            = array_map(function($data){
				return implode(',', $data['tags']);
			}, $uniqueValuesData);
			$rayAllTags         = explode(',', implode(',', $allTags));
			$rayAllTags         = array_values( array_unique($rayAllTags, SORT_REGULAR) );
			usort($rayAllTags, function($prev, $next) {
				return $prev > $next ? 1 : -1;
			});
			return $rayAllTags;
		}
		
		
		/**
		 * FETCHES THE QUERY PARAMETERS & USES THEM TO
		 * PREPARE + INITIALIZE THE `SDK DATA`.
		 * THIS IMPLIES THAT THE SDK DATA ARE SORTED HERE AS WELL.
		 * @return array
		 */
		private function prepareSDKData(){
			$rayFilters = $this->fetchSanitizedFiltersArray();
			return [
				'filters' => $rayFilters,
				'sorted'  => $this->sortDataByKey($rayFilters['sort'], $rayFilters['direction']),
			];
		}
		
		/**
		 * FETCHES THE PASSED QUERY PARAMETERS FROM THE `$_GET` GLOBAL VARIABLE AND
		 * SANITIZES THEM IN THE PROCESS. DEFAULT VALUES ARE ALSO AUTOMATICALLY SET
		 * HERE. THIS RETURNS AN ARRAY OF SANITIZED FILTERS....
		 * 
		 * @return array
		 */
		private function fetchSanitizedFiltersArray(){
			return [
				'page'        => isset($_GET['page']) && trim($_GET['page'])            ? (int)htmlspecialchars(trim($_GET['page']))      : self::DEFAULT_PAGE,
				'sort'        => isset($_GET['sort']) && trim($_GET['sort'])            ? (string)htmlspecialchars(trim($_GET['sort']))   : self::DEFAULT_SORT_KEY,
				'limit'       => isset($_GET['limit']) && trim($_GET['limit'])          ? (int)htmlspecialchars(trim($_GET['limit']))     : self::DEFAULT_LIMIT,
				'filter'      => isset($_GET['filter']) && trim($_GET['filter'])        ? (string)htmlspecialchars(trim($_GET['filter'])) : null,
				'direction'   => isset($_GET['direction']) && trim($_GET['direction'])  ? (int)htmlspecialchars(trim($_GET['direction'])) : self::DIRECTION_ASC,
				'searchTerm'  => isset($_GET['search']) && trim($_GET['search'])        ? (string)htmlspecialchars(trim($_GET['search'])) : '',
			];
		}
		
		/**
		 * SORTS THE `SDK DATA` BY SPECIFIC KEY AND IN A GIVEN ORDER.
		 * RETURNS THE SORTED DATA
		 * @param string  $key
		 * @param int     $sortDirection
		 *
		 * @return array
		 */
		private function sortDataByKey($key, $sortDirection=self::DIRECTION_ASC){
			$sortKeys = explode(',', $key);
			$sortKeys = array_filter($sortKeys, function($value){ return !!trim($value); });
			$sorted   = $this->filterOutNullAndEmptyValuesPlusDuplicates(DUMMY_DATA);
			
			// SORT THE TAGS ALPHABETICALLY:
			foreach($sorted as &$raySorted){
				sort($raySorted['tags'], SORT_STRING);
			}
			
			if(sizeof($sortKeys) > 0){
				foreach ($sortKeys as $sortKey){
					# SIMPLY SORT BY `title` IF THE GIVEN KEY DOESN'T EXIST IN THE DATA-STORE:
					if(!array_key_exists($sortKey, $sorted[0])){ $sortKey = 'title';}
					
					usort($sorted, function($prev, $next) use ($sortKey, $sortDirection) {
						$ASC    = $prev[$sortKey] > $next[$sortKey] ? 1 : -1;
						$DESC   = $prev[$sortKey] < $next[$sortKey] ? 1 : -1;
						if($sortKey == 'tags'){
							$tagsPv = $prev[$sortKey];
							$tagsNx = $next[$sortKey];
							$this->sortNumericallyIndexedSubArray($tagsPv, $sortDirection);
							$this->sortNumericallyIndexedSubArray($tagsNx, $sortDirection);
							
							$ASC    = $prev[$sortKey][0] > $next[$sortKey][0] ? 1 : -1;
							$DESC   = $prev[$sortKey][0] < $next[$sortKey][0] ? 1 : -1;
						}
						return strtoupper($sortDirection) == self::DIRECTION_ASC ? $ASC : $DESC;
					});
				}
			}
			return $sorted;
		}
		
		/**
		 * SORTS A GIVEN NUMERICALLY INDEXED ARRAY `$payload` IN A GIVEN ORDER.
		 * THE `$payload` IS PASSED BY REFERENCE AND IS THUS MUTATED IN PLACE...
		 * @param array $payload
		 * @param int $sortDirection
		 */
		private function sortNumericallyIndexedSubArray(&$payload, $sortDirection){
			# SORT THE VALUES WITHIN THE SUB-ARRAY BY THE DIRECTION...
			usort($payload, function($prv, $nxt) use ($sortDirection){
				return strtoupper($sortDirection) == self::DIRECTION_ASC ? ($prv > $nxt ? 1 : -1) : ($prv < $nxt ? 1 : -1);
			});
			
		}
		
		/**
		 * FILTERS THE GIVEN ARRAY `$rayData` BY TAGS.
		 * @param $rayData
		 * @param $commaDelimitedTags
		 *
		 * @return array
		 */
		private function filterDataByTags($rayData, $commaDelimitedTags){
			$rayTags  = explode(',', $commaDelimitedTags);
			$filtered = [];
			foreach ($rayData as $data){
				foreach ($rayTags as $tag) {
					if(in_array($tag, $data['tags'])){
						$filtered[] = $data;
					}
				}
			}
			return $filtered;
		}
		
		/**
		 * STRIPS OUT ALL ENTRIES WITH ANY NULL OR EMPTY VALUES.
		 * THIS METHOD ALSO REMOVES DUPLICATED ENTRIES FOR THE GIVEN ARRAY.
		 * @param array $filterAbleArray
		 *
		 * @return array
		 */
		private function filterOutNullAndEmptyValuesPlusDuplicates(array $filterAbleArray){
			$cleanData  = array_filter($filterAbleArray, function($data){
				return (trim($data['title']) && trim($data['id']) && $data['tags']);
			});
			// NOW RETURN UNIQUE ARRAY ELEMENTS THUS REMOVING DUPLICATES:
			return array_unique($cleanData, SORT_REGULAR);
		}
		
		
	}