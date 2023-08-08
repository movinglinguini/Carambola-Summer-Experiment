export const environment = {
  production: true,
  /** If true, the game will run itself from start to end. */
  testMode: false,
  // ===================================================================
  /**
   * GAMEPLAY CONFIGS
   */
  advisorGeneratorMeta: {
    name: 'experimentalGeneratorExp',
    opts: {
      advisorCount: 1,
      playerCharacterKey: 'player',
      maxAffinity: 5,
      minAffinity: -5,
      initialAffinityTowardPlayer: 0,
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
  //=======================================================================
  /**
   * UI CONFIGS
   */
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
  showActionDescriptions: true,
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
  showHistoryDate: false,
  showScore: true,
  /**
   * If true, show the round counter.
   */
  showRoundCounter: true,
  showEndScreen: false,
  //====================================================================
  // DEBUGGING OPTIONS
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
  showRawNumbers: false,
  /**
   * If true, the game will show the advisor's values.
   */
  showAdvisorValues: false,
  /** Do not edit the following. */
  testRunCount: 1,
  advisorCount: 3,
  showLog: false,
  loggerEndpoint: 'http://localhost:3000/',
  /** @deprecated */
  playerCharacterKey: 'player',
};
