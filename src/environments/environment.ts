// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /** If true, the game will run itself from start to end. */
  testMode: false,
  advisorGeneratorMeta: {
    name: 'experimentalGeneratorExp',
    opts: {
      advisorCount: 3,
      playerCharacterKey: 'player',
      maxAffinity: 5,
      minAffinity: -5,
    },
  },
  actionGeneratorMeta: {
    name: 'experimentalGenerator',
    opts: null
  },
  decisionEventGeneratorMeta: {
    name: 'experimentalGenerator',
    opts: null,
  },
  /**
   * If true, shows the timeline element.
   */
  showTimeline: false,
  /**
   * If true, the game will present tooltips to players when they
   * hover over action cards.
   * */
  showActionTooltips: false,
  /**
   * If true, shows the action description text.
   */
  showActionDescriptions: false,
  /**
   * If true, shows the values that an action effects on its action card.
   */
  showActionValues: true,
  /**
   * If true, show which values the action promotes.
   * This will only work if `showActionValues` is also true.
   */
  showActionPromotes: true,
  /**
   * If true, show which values the action harms.
   * This will only work if `showActionValues` is also true.
   */
  showActionHarms: false,
  /**
   * If true, the game will print dumps of affinities the
   * NPC's have among each other and with the player.
   */
  showAffinityTable: false,
  /**
   * If true, the game will show the values attached to
   * various NPC properties, including affinity and
   * reactions.
   */
  showRawNumbers: true,
  /**
   * If true, the game will show the advisor's values.
   */
  showAdvisorValues: true,
  /**
   * The amount of rounds that will transpire
   * before the ending screen appears.
   */
  countRounds: 7,
  /**
   * The max affinity value the NPCs can have
   * toward each other and the player.
   */
  maxAffinity: 5,
    /**
   * The min affinity value the NPCs can have
   * toward each other and the player.
   */
  minAffinity: -5,
  /** Do not edit the following. */
  testRunCount: 1,
  advisorCount: 3,
  showLog: false,
  loggerEndpoint: 'http://localhost:3000/',
  /** @deprecated */
  playerCharacterKey: 'player',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
