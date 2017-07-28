
export interface Data {
    requestId: number,
    message: string
}

// Simulates an API call
let uuid = 0;
export function getDataAsync(searchTerm: string) {
    let requestId = uuid++
    console.log(`#${requestId} Calling the api with: '${searchTerm}'`)
    return new Promise<Data[]>((resolve, reject) => {
        let data = [
            { requestId, message: `Foo ${searchTerm}` },
            { requestId, message: `Bar ${searchTerm}` },
            { requestId, message: `Baz ${searchTerm}` }
        ];
        let time = 200 + (Math.random() * 500);
        setTimeout(() => resolve(data), time);
    });
}

