export function buildUrl(baseUrl: string, params: Record<string, string>): URL {
    const url = new URL(baseUrl)

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
    })

    return url
}

export function generateId(): string {
    return 'id' + Math.random().toString(16).slice(2)
}