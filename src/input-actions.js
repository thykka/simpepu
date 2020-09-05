export default {
    'b': {
        name: 'buy',
        title: 'Buy PePu tickets',
        allowed: state => state.canBuy(),
        action: state => state.buy()
    },
    'w': {
        name: 'work',
        title: 'Work for a while',
        allowed: state => state.canWork(),
        action: state => state.work()
    },
    's': {
        name: 'sleep',
        title: 'Sleep until rested',
        allowed: state => state.canSleep(),
        action: state => state.sleep()
    }
}