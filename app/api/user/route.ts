export async function GET(request: Request) {
    return new Response('Hello, Next.js!', {
        status: 200,
    })
}

export async function POST(request: Request) {
    console.log()
    return new Response(JSON.stringify(await request.json()), {
        status: 200,
    })
 }

export async function PUT(request: Request) { }

export async function DELETE(request: Request) { }


