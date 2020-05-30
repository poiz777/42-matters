routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  const ftm = {
    name: 'ftm',
    url: '/',
    views: {
      Root: {
        template: require('./ftm.pug'),
        controller: 'fourTwoMattersController as ftm',
        controllerAs: 'ftm',
      },
    },
  };

  $stateProvider
    .state(ftm);
}
