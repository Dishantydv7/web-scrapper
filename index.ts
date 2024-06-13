import axios from 'axios'
import qs from 'qs'

async function solve(applicationNumber: string, day: string, month: string, year: string) {
    let data = qs.stringify({
        '_csrf-frontend': 'iaVB23eQzaTp3tatIMuz9Xx5GJkfPeZyndXHDvsoXtLP_XGiJtScyZ-aheh1hICqLExU4FgKoh_apbJqqmkJlg==',
        'Scorecardmodel[ApplicationNumber]': applicationNumber,
        'Scorecardmodel[Day]': day,
        'Scorecardmodel[Month]': month,
        'Scorecardmodel[Year]': year
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://neet.ntaonline.in/frontend/web/scorecard/index',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'advanced-frontend=7h2u3tkaqii2peb7ft3d3dou6q; _csrf-frontend=07c1b2872401cc2fb91aa269c9144725033402dadbe8590e06bbb834048bfd67a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22FX0yQDQmvDSEUO3_P5LyG7DmGpudQAWD%22%3B%7D',
            'Origin': 'null',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        },
        data: data
    };

   const response = await axios.request(config)
        console.log(response.data);
        

        // .then((response) => {
        //     console.log(JSON.stringify(response.data));
        // })
        // .catch((error) => {
        //     console.log(error);
        // });

}

solve("240411183516" , "08" , "03" , "2007");

