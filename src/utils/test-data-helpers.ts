
export function getTestsPostfix(): string {
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-6);
    const testPostfix: string = `qa${uniqueId}`;
    return testPostfix;
}