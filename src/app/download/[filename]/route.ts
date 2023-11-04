type GetParams = {
  params: {
    filename: string;
  }
}

export async function GET(req: Request, { params }: GetParams) {
  
  const {filename} = params;
  
  const  FILE_URL = `https://raw.githubusercontent.com/naeemnh/flipae-api/main/seed/${filename}.json`;
  const res = await fetch(FILE_URL);

  return new Response(res.body, {
    headers: {
      ...res.headers, // copy the previous headers
      "content-disposition": `attachment; filename="${filename}.json"`,
    },
  });
}