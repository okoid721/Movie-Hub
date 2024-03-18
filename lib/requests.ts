export async function getApiResponse(sub_url: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${sub_url}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    };

    const res = await fetch(url, options);
    const data = res.ok ? await res.json() : Promise.reject(res);
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzQyZTllNzFmNTkxY2RiNDM2NTZmOTEyMWUwZTEwMSIsInN1YiI6IjY1Zjg1YzgyZDhmNDRlMDE2MzUwYTA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iffut1Bf05HXJII07e1B74oZM6sHBgpQuBA79T2_iHA'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));
