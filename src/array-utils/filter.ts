export const definedFilter = <T>(f: T | undefined | null): f is T => f !== null && f !== undefined;
