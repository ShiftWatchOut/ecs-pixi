const MaxX = 740;
const MaxY = 520;

const GLOBALS = {
    width: MaxX,
    height: MaxY,
    DEBUG: false,
    interactWith: {
        w: 'w',
        s: 's',
        arrowdown: 'arrowdown',
        arrowup: 'arrowup'
    },
    boardVelocity: 4,
    maxBallVelocity: 10,
    initBallPos: {
        x: 360,
        y: 240
    },
    ety1Pos: 10, // 有可能把项目竖着重构，不确定是 x 还是 y
    ety2Pos: 710,
    aiMoveGap: 60
};

export default GLOBALS;
