export const SAVE_STRATEGY = 'SAVE_STRATEGY';

export function saveStrategy(strategy) {
    return {
        type:SAVE_STRATEGY,
        strategy
    };
}